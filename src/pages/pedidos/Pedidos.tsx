import { useEffect, useState } from "react"
import type { ICampoFormulario, Icardapio, IComanda, IPedido, Tstatuspedidos } from "../../utils"
import { metodoscardapio, metodoscomandas, metodospedidos } from "../../services"
import { EstadoVazio, Modal } from "../../components"
import { useAuth, useToast, useToogle } from "../../hooks"
import { ListChecks, PenIcon, Trash } from "lucide-react"

const camposEdicao: ICampoFormulario[] = [
    { nome: "comandaId", rotulo: "ID da Comanda", tipo: "number", placeholder: "ex: 1", parse: (valor) => Number(valor) },
    { nome: "itemId", rotulo: "ID do Item", tipo: "number", placeholder: "ex: 1", parse: (valor) => Number(valor) },
    { nome: "quantidade", rotulo: "Quantidade", tipo: "number", placeholder: "ex: 1", parse: (valor) => Number(valor) },
    { nome: "observacao", rotulo: "Observação", placeholder: "ex: carne bem passada", obrigatorio: false }
]

const camposStatus: ICampoFormulario[] = [
    {
        nome: "status",
        rotulo: "Status do pedido",
        tipo: "select",
        placeholder: "Selecione um status",
        opcoes: [
            { valor: "PREPARANDO", rotulo: "Preparando" },
            { valor: "PRONTO", rotulo: "Pronto" },
            { valor: "ENTREGUE", rotulo: "Entregue" },
            { valor: "CANCELADO", rotulo: "Cancelado" },
        ],
    },
]

export const Pedidos = () => {
    const [Pedidos, setPedidos] = useState<IPedido[]>([])
    const [Comandas, setComandas] = useState<IComanda[]>([])
    const [ItensCardapio, setItensCardapio] = useState<Icardapio[]>([])
    const [carregandoOpcoes, setCarregandoOpcoes] = useState(true)
    const { isActive, handletoogle } = useToogle()
    const { usuario } = useAuth()
    const { showToast } = useToast()
    const podeExcluir = usuario?.perfil === "GERENTE" || usuario?.perfil === "DONO"
    const [pedidoEmEdicao, setPedidoEmEdicao] = useState<IPedido | null>(null)
    const [editandoStatus, setEditandoStatus] = useState(false)
    const ComandasAbertas = Comandas.filter((comanda) =>
        comanda.status.trim().toUpperCase() === "ABERTA" && comanda.id !== undefined,
    )

    useEffect(() => {
        const listarpedidos = async () => {
            const response = await metodospedidos.listar()
            if (typeof response === "string") {
                showToast(response, "error")
                return
            }
            setPedidos(response)
        }
        listarpedidos()
    }, [showToast])

    useEffect(() => {
        const carregarOpcoesPedido = async () => {
            const [comandas, itens] = await Promise.all([
                metodoscomandas.listar(),
                metodoscardapio.listar(),
            ])

            if (typeof comandas === "string") {
                showToast(comandas, "error")
            } else {
                setComandas(comandas)
            }

            if (typeof itens === "string") {
                showToast(itens, "error")
            } else {
                setItensCardapio(itens.filter((item) => item.id !== undefined))
            }

            setCarregandoOpcoes(false)
        }

        void carregarOpcoesPedido()
    }, [showToast])

    const camposAdicao: ICampoFormulario[] = [
        {
            nome: "comandaId",
            rotulo: "Comanda",
            tipo: "select",
            placeholder: ComandasAbertas.length ? "Selecione uma comanda aberta" : "Nenhuma comanda aberta disponível",
            opcoes: ComandasAbertas.map((comanda) => ({
                valor: String(comanda.id),
                rotulo: `Comanda ${comanda.numero} - Mesa ${comanda.mesa}`,
            })),
            parse: (valor) => Number(valor),
        },
        {
            nome: "itemId",
            rotulo: "Item",
            tipo: "select",
            placeholder: ItensCardapio.length ? "Selecione um item" : "Nenhum item disponível",
            opcoes: ItensCardapio.map((item) => ({
                valor: String(item.id),
                rotulo: `${item.id} - ${item.nome}`,
            })),
            parse: (valor) => Number(valor),
        },
        { nome: "quantidade", rotulo: "Quantidade", tipo: "number", placeholder: "ex: 1", parse: (valor) => Number(valor) },
        { nome: "observacao", rotulo: "Observação", placeholder: "ex: carne bem passada", obrigatorio: false },
    ]

    const recarregar = async () => {
        const response = await metodospedidos.listar()
        if (typeof response === "string") {
            showToast(response, "error")
            return
        }
        setPedidos(response)
    }

    const excluir = async (id: number) => {
        const response = await metodospedidos.deletar(id)
        if (typeof response === "string") {
            showToast(response, "error")
            return
        }
        await recarregar()
    }

    const fecharModal = () => {
        setPedidoEmEdicao(null)
        setEditandoStatus(false)
        handletoogle()
    }

    const editarPedido = (dados: IPedido) => {
        if (pedidoEmEdicao?.id === undefined) return Promise.resolve("Pedido sem ID")
        if (editandoStatus) {
            if (!dados.status) return Promise.resolve("Selecione um status")
            return metodospedidos.editarstatus(pedidoEmEdicao.id, dados.status as Tstatuspedidos)
        }
        return metodospedidos.atualizar(pedidoEmEdicao.id, dados)
    }

    return (
        <div className="flex flex-col items-center">
            <Modal
                key={`${isActive}-${pedidoEmEdicao?.id ?? "novo"}-${editandoStatus}`}
                isActive={isActive}
                toogle={fecharModal}
                criar={metodospedidos.criar}
                atualizar={editarPedido}
                valoresIniciais={editandoStatus && pedidoEmEdicao
                    ? { ...pedidoEmEdicao, status: pedidoEmEdicao.status?.toUpperCase() }
                    : pedidoEmEdicao ?? undefined}
                modoEdicao={pedidoEmEdicao !== null}
                campos={editandoStatus ? camposStatus : pedidoEmEdicao ? camposEdicao : camposAdicao}
                aoCriar={recarregar}
            />
            <div className="relative flex w-full items-center mb-3.5">
                {!isActive && (
                    <button
                        disabled={carregandoOpcoes}
                        onClick={() => {
                            setPedidoEmEdicao(null)
                            setEditandoStatus(false)
                            handletoogle()
                        }}
                        className="absolute right-0 shrink-0 cursor-pointer bg-white w-25 h-10 rounded-2xl border-2 border-red-500 text-red-500 font-bold disabled:cursor-wait disabled:opacity-60"
                    >Adicionar</button>
                )}
                <h1 className="w-full truncate pr-4 text-center text-xl text-red-500 font-bold sm:text-2xl">Pedidos</h1>
            </div>
            <div className="w-full">
                <section className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
                    {Pedidos.length === 0 ? (
                        <EstadoVazio />
                    ) : Pedidos.map((pedido) => (
                        <article key={pedido.id} className="record-card flex justify-between gap-2 rounded-2xl border-2 border-red-500 bg-red-500 p-4 text-white transition-colors hover:bg-white hover:text-red-500">
                            <div className="min-w-0 flex-1 space-y-1 wrap-break-words">
                                <h2 className="text-lg font-bold">Pedido #{pedido.id}</h2>
                                <p className="text-sm"><strong>Item:</strong> {pedido.itemId}</p>
                                <p className="text-sm"><strong>Quantidade:</strong> {pedido.quantidade}</p>
                                <p className="text-sm"><strong>Comanda:</strong> {Comandas.find((comanda) => comanda.id === pedido.comandaId)?.numero ?? pedido.comandaId}</p>
                                <p className="text-sm"><strong>Valor unitário:</strong> {pedido.precoUnitario == null ? "Não informado" : `R$ ${pedido.precoUnitario.toFixed(2)}`}</p>
                                <strong className="text-xl">R$ {pedido.valorTotal?.toFixed(2) ?? "0,00"}</strong>
                                <p className="text-sm"><strong>Status:</strong> {pedido.status ?? "Não informado"}</p>
                                <p className="text-sm"><strong>Observação:</strong> {pedido.observacao}</p> 
                            </div>
                            {podeExcluir && pedido.id !== undefined && (
                                <div className="flex flex-col justify-around">
                                <button type="button"
                                aria-label="Editar pedido"
                                title="Editar pedido"
                                className="cursor-pointer"
                                onClick={() => {
                                    setPedidoEmEdicao(pedido)
                                    setEditandoStatus(false)
                                    handletoogle()
                                }
                                }>
                                    <PenIcon/>
                                </button>
                                <button
                                    type="button"
                                    aria-label="Alterar status do pedido"
                                    title="Alterar status do pedido"
                                    className="cursor-pointer"
                                    onClick={() => {
                                        setPedidoEmEdicao(pedido)
                                        setEditandoStatus(true)
                                        handletoogle()
                                    }}
                                >
                                    <ListChecks />
                                </button>
                                <button
                                    type="button"
                                    aria-label="Excluir pedido"
                                    onClick={() => excluir(pedido.id!)}
                                    className="shrink-0 cursor-pointer self-end"
                                >
                                    <Trash />
                                </button>
                                </div>
                            )}
                            {/* <div className="flex w-full justify-center">
                                        <button className="cursor-pointer bg-white w-25 h-10 rounded-2xl text-red-500 font-black">Adicionar</button>
                                        </div> */}
                        </article>
                    ))}
                </section>
            </div>
        </div>
    )
}