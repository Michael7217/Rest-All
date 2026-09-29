import { useEffect, useState } from "react"
import type { ICampoFormulario, IPedido, Tstatuspedidos } from "../../utils"
import { metodospedidos } from "../../services"
import { Modal } from "../../components"
import { useAuth, useToogle } from "../../hooks"
import { ListChecks, PenIcon, Trash } from "lucide-react"

const campos: ICampoFormulario[] = [
    { nome: "comandaId", rotulo: "ID da Comanda", tipo: "number", placeholder: "ex: 1", parse: (valor) => Number(valor) },
    { nome: "itemId", rotulo: "ID do Item", tipo: "number", placeholder: "ex: 1", parse: (valor) => Number(valor) },
    { nome: "quantidade", rotulo: "Quantidade", tipo: "number", placeholder: "ex: 1", parse: (valor) => Number(valor) },
    { nome: "observacao", rotulo: "Observação", placeholder: "ex: carne bem passada" }
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
    const { isActive, handletoogle } = useToogle()
    const { usuario } = useAuth()
    const podeExcluir = usuario?.perfil === "GERENTE" || usuario?.perfil === "DONO"
    const [pedidoEmEdicao, setPedidoEmEdicao] = useState<IPedido | null>(null)
    const [editandoStatus, setEditandoStatus] = useState(false)

    useEffect(() => {
        const listarpedidos = async () => {
            const response = await metodospedidos.listar()
            if (typeof response === "string") {
                return
            } else {
                setPedidos(response)
            }
        }
        listarpedidos()
    }, [])

    const recarregar = async () => {
        const response = await metodospedidos.listar()
        if (typeof response !== "string") setPedidos(response)
    }

    const excluir = async (id: number) => {
        const response = await metodospedidos.deletar(id)
        if (typeof response !== "string") await recarregar()
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
                campos={editandoStatus ? camposStatus : campos}
                aoCriar={recarregar}
            />
            <div className="relative flex w-full items-center mb-3.5">
                {!isActive && (
                    <button
                        onClick={() => {
                            setPedidoEmEdicao(null)
                            setEditandoStatus(false)
                            handletoogle()
                        }}
                        className="absolute right-0 shrink-0 cursor-pointer bg-white w-25 h-10 rounded-2xl border-2 border-red-500 text-red-500 font-bold"
                    >Adicionar</button>
                )}
                <h1 className="w-full truncate pr-4 text-center text-xl text-red-500 font-bold sm:text-2xl">Pedidos</h1>
            </div>
            <div className="w-full">
                <section className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
                    {Pedidos.map((pedido) => (
                        <article key={pedido.id} className="record-card flex justify-between gap-2 rounded-2xl border-2 p-4 bg-red-500 text-white">
                            <div className="min-w-0 flex-1 wrap-break-words">
                                <p>Item: {pedido.itemId}</p>
                                <strong className="text-xl"> Quantidade: {pedido.quantidade}</strong>
                                <p>Observação: {pedido.observacao}</p>
                                <p className="font-bold text-xl">Comanda: {pedido.comandaId}</p>
                                <p>Valor Total: R$ {pedido.valorTotal}</p>
                                <p>Status: {pedido.status ?? "Não informado"}</p>
                                <p>Valor Unitário: {pedido.precoUnitario}</p>
                                <p>ID Item: {pedido.itemId}</p>
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