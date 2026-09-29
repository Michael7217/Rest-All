import { useEffect, useState } from "react"
import { Modal, Modaldetalhes } from "../../components"
import type { IPedido, ICampoFormulario, IComanda } from "../../utils"
import { useAuth, useToast, useToogle } from "../../hooks"
import { metodoscomandas, metodospedidos } from "../../services"
import { Eye, Trash } from "lucide-react"

const campos: ICampoFormulario[] = [
    { nome: "numero", rotulo: "Número", placeholder: "ex: 1" },
    { nome: "mesa", rotulo: "Mesa", placeholder: "ex: 1" },
    { nome: "status", rotulo: "status", placeholder: "ex: Aberta", parse: (valor) => valor.trim().toLowerCase() === "aberta" }
]
export const Comandas = () => {
    const [Comandas, setComandas] = useState<IComanda[]>([])
    const {isActive, handletoogle} = useToogle()
    const { usuario } = useAuth()
    const { showToast } = useToast()
    const podeExcluir = usuario?.perfil === "GERENTE" || usuario?.perfil === "DONO"
    const [Comandadetalhes, setComandadetalhes] = useState<IComanda | null>(null)
    const [Pedidoscomanda, setPedidoscomandas] = useState<IPedido[] | null>(null)
    
    useEffect(() => {
        const carregarComandas = async () => {
            const response = await metodoscomandas.listar()
            if (typeof response !== "string"){
                setComandas(response)
            }
        }
        carregarComandas()
    }, [])
    
    const recarregar = async () => {
            const response = await metodoscomandas.listar()
            if (typeof response !== "string"){
                setComandas(response)
            }
        }
    const excluir = async (id: number) => {
        const response = await metodoscomandas.deletar(id)
        if (typeof response !== "string") await recarregar()
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
        <Modal isActive={isActive} toogle={handletoogle} criar={metodoscomandas.criar} campos={campos} aoCriar={recarregar}/>
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
                    valor: `R$ ${Comandadetalhes.valorTotal.toFixed(2)}`,
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
                    <article key={comanda.id} className="record-card flex flex-row rounded-2xl border-2 p-4 bg-red-500 text-white">
                        <div className="min-w-0 flex-1 wrap-break-words">
                        <h2 className="font-bold text-xl">Comanda: {comanda.numero}</h2>
                        <p>Mesa: {comanda.mesa}</p>
                        <strong className="text-xl">Total: R$ {comanda.valorTotal.toFixed(2)}</strong>
                        <p>ID Funcionário: {comanda.funcionarioId}</p>
                        <p>Status: {comanda.status ? "Aberta" : "Fechada"}</p>
                        <p>Data de abertura: {comanda.dataAbertura}</p>
                        <p>Data de fechamento: {comanda.dataFechamento}</p>
                        </div>
                        <div className="flex shrink-0 flex-col items-center justify-around gap-4">
                            <button onClick={() => Abrircomanda(comanda)} aria-label="Ver detalhes"><Eye className="cursor-pointer"/></button>
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