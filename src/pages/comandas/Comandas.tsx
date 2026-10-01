import { useEffect, useState } from "react"
import { Modal, Modaldetalhes } from "../../components"
import type { IPedido, ICampoFormulario, IComanda } from "../../utils"
import { useAuth, useToast, useToogle } from "../../hooks"
import { metodoscomandas, metodospedidos } from "../../services"
import { Eye, ListChecks, Trash } from "lucide-react"

const campos: ICampoFormulario[] = [
    { nome: "numero", rotulo: "Número", tipo: "number", placeholder: "ex: 1", parse: (valor) => Number(valor) },
    { nome: "mesa", rotulo: "Mesa", tipo: "number", placeholder: "ex: 1", parse: (valor) => Number(valor) },
    {
        nome: "status",
        rotulo: "Status",
        placeholder: "Selecione o status",
        tipo: "select",
        opcoes: [
            { valor: "ABERTA", rotulo: "Aberta" },
            { valor: "FECHADA", rotulo: "Fechada" },
        ],
        parse: (valor) => valor.trim().toUpperCase(),
    },
]

const camposStatus: ICampoFormulario[] = [
    {
        nome: "status",
        rotulo: "Status da comanda",
        tipo: "select",
        placeholder: "Selecione um status",
        opcoes: [
            { valor: "ABERTA", rotulo: "Aberta" },
            { valor: "FECHADA", rotulo: "Fechada" },
        ],
    },
]
export const Comandas = () => {
    const [Comandas, setComandas] = useState<IComanda[]>([])
    const {isActive, handletoogle} = useToogle()
    const { usuario } = useAuth()
    const { showToast } = useToast()
    const podeExcluir = usuario?.perfil === "GERENTE" || usuario?.perfil === "DONO"
    const [Comandadetalhes, setComandadetalhes] = useState<IComanda | null>(null)
    const [Pedidoscomanda, setPedidoscomandas] = useState<IPedido[] | null>(null)
    const [comandaEmEdicao, setComandaEmEdicao] = useState<IComanda | null>(null)
    const [editandoStatus, setEditandoStatus] = useState(false)
    
    useEffect(() => {
        const carregarComandas = async () => {
            const response = await metodoscomandas.listar()
            if (typeof response === "string") {
                showToast(response, "error")
                return
            }
            setComandas(response)
        }
        carregarComandas()
    }, [showToast])
    
    const recarregar = async () => {
            const response = await metodoscomandas.listar()
            if (typeof response === "string") {
                showToast(response, "error")
                return
            }
            setComandas(response)
        }
    const excluir = async (id: number) => {
        const response = await metodoscomandas.deletar(id)
        if (typeof response === "string") {
            showToast(response, "error")
            return
        }
        await recarregar()
    }

    const fecharModal = () => {
        setComandaEmEdicao(null)
        setEditandoStatus(false)
        handletoogle()
    }

    const editarComanda = (dados: IComanda) => {
        if (comandaEmEdicao?.id === undefined) return Promise.resolve("Comanda sem ID")
        if (editandoStatus) {
            if (!dados.status) return Promise.resolve("Selecione um status")
            return metodoscomandas.atualizarput(comandaEmEdicao.id, {
                ...comandaEmEdicao,
                ...dados,
                id: comandaEmEdicao.id,
                status: String(dados.status).toUpperCase(),
            })
        }
        return metodoscomandas.atualizarput(comandaEmEdicao.id, {
            ...comandaEmEdicao,
            ...dados,
            id: comandaEmEdicao.id,
        })
    }

    const Abrircomanda = async (comanda: IComanda) => {
        if (comanda.id === undefined) return

        const [respostaComanda, respostaPedidos] = await Promise.all([
            metodoscomandas.buscarid(comanda.id),
            metodospedidos.listarpedidospcomanda(comanda.id),
        ])
        if(typeof respostaComanda === "string"){
            showToast(respostaComanda, "error")
            return
        }
        if(typeof respostaPedidos === "string"){
            showToast(respostaPedidos, "error")
            return
        }
        setComandadetalhes(respostaComanda)
        setPedidoscomandas(respostaPedidos)
    }



    return (
        <>
        <Modal
            key={`${isActive}-${comandaEmEdicao?.id ?? "novo"}-${editandoStatus}`}
            isActive={isActive}
            toogle={fecharModal}
            criar={metodoscomandas.criar}
            atualizar={editarComanda}
            valoresIniciais={editandoStatus && comandaEmEdicao
                ? { ...comandaEmEdicao, status: comandaEmEdicao.status?.toUpperCase() }
                : comandaEmEdicao ?? undefined}
            modoEdicao={comandaEmEdicao !== null}
            campos={editandoStatus ? camposStatus : campos}
            aoCriar={recarregar}
        />
        <Modaldetalhes
            aberto={Comandadetalhes !== null}
            titulo={Comandadetalhes ? `Comanda ${Comandadetalhes.numero}` : "Detalhes da comanda"}
            aoFechar={() => {
                setComandadetalhes(null)
                setPedidoscomandas(null)
            }}
            detalhes={Comandadetalhes ? [
                { rotulo: "Mesa", valor: Comandadetalhes.mesa },
                { rotulo: "Status", valor: Comandadetalhes.status },
                { rotulo: "Funcionário", valor: Comandadetalhes.funcionarioId },
                { rotulo: "Data de abertura", valor: Comandadetalhes.dataAbertura },
                {
                    rotulo: "Data de fechamento",
                    valor: Comandadetalhes.dataFechamento ?? "Ainda aberta",
                },
                {
                    rotulo: "Total",
                    valor: `R$ ${Comandadetalhes.valorTotal?.toFixed(2)}`,
                },
                {
                    rotulo: "Pedidos",
                    colunaDireita: true,
                    valor: Pedidoscomanda?.length ? (
                        <ul className="space-y-2">
                            {Pedidoscomanda.map((pedido: IPedido) => (
                                <li key={pedido.id}>
                                    Item {pedido.itemId} · Quantidade: {pedido.quantidade}
                                    {pedido.observacao && ` · ${pedido.observacao}`}
                                    {pedido.status && ` · ${pedido.status}`}
                                    {pedido.valorTotal !== undefined &&
                                        ` · R$ ${pedido.valorTotal.toFixed(2)}`}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        "Nenhum pedido nesta comanda."
                    ),
                },
            ] : []}
        />
        <div className="relative flex w-full items-center mb-3.5">
            {!isActive && (
                <button
                    onClick={handletoogle}
                    className="absolute right-0 shrink-0 cursor-pointer bg-white w-25 h-10 rounded-2xl border-2 border-red-500 text-red-500 font-bold"
                >Adicionar</button>
            )}
            <h1 className="w-full truncate pr-4 text-center text-xl text-red-500 font-bold sm:text-2xl">
                Comandas
            </h1>
        </div>
        <div className="flex flex-col items-center">
            
            <section className="grid grid-cols-1 w-full gap-4 md:h-auto md:grid-cols-2 ">
                {Comandas.map((comanda) => (
                    <article key={comanda.id} className="record-card flex flex-row rounded-2xl border-2 border-red-500 bg-red-500 p-4 text-white transition-colors hover:bg-white hover:text-red-500">
                        <div className="min-w-0 flex-1 space-y-1 wrap-break-words">
                        <h2 className="text-lg font-bold">Comanda {comanda.numero}</h2>
                        <strong className="text-xl">R$ {comanda.valorTotal?.toFixed(2) ?? "0,00"}</strong>
                        <p className="text-sm"><strong>Mesa:</strong> {comanda.mesa}</p>
                        <p className="text-sm"><strong>Status:</strong> {comanda.status?.toLowerCase() === "aberta" ? "Aberta" : "Fechada"}</p>
                        <p className="text-sm"><strong>Funcionário:</strong> {comanda.funcionarioId ?? "Não informado"}</p>
                        <p className="text-sm"><strong>Aberta em:</strong> {comanda.dataAbertura || "Não informado"}</p>
                        <p className="text-sm"><strong>Fechada em:</strong> {comanda.dataFechamento || "Em aberto"}</p>
                        </div>
                        <div className="flex shrink-0 flex-col items-center justify-around gap-4">
                            <button onClick={() => Abrircomanda(comanda)} aria-label="Ver detalhes"><Eye className="cursor-pointer"/></button>
                            {podeExcluir && comanda.id !== undefined && (
                                <button
                                    type="button"
                                    aria-label="Alterar status da comanda"
                                    title="Alterar status da comanda"
                                    className="cursor-pointer"
                                    onClick={() => {
                                        setComandaEmEdicao(comanda)
                                        setEditandoStatus(true)
                                        handletoogle()
                                    }}
                                >
                                    <ListChecks />
                                </button>
                            )}
                        {podeExcluir && comanda.id !== undefined && 
                            <button onClick={()=> excluir(comanda.id!)} className="cursor-pointer" aria-label="Excluir comanda"><Trash/></button>
                        }
                        </div>
                    </article>
                ))}
                </section>
            </div>
        </>
    )
}