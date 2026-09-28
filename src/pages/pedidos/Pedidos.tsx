import { useEffect, useState } from "react"
import type { ICampoFormulario, IPedido } from "../../utils"
import { metodospedidos } from "../../services"
import { Modal } from "../../components"
import { useAuth, useToogle } from "../../hooks"
import { Trash } from "lucide-react"

const campos: ICampoFormulario[] = [
    { nome: "comandaId", rotulo: "ID da Comanda", tipo: "number", placeholder: "ex: 1", parse: (valor) => Number(valor) },
    { nome: "itemId", rotulo: "ID do Item", tipo: "number", placeholder: "ex: 1", parse: (valor) => Number(valor) },
    { nome: "quantidade", rotulo: "Quantidade", tipo: "number", placeholder: "ex: 1", parse: (valor) => Number(valor) },
    { nome: "observacao", rotulo: "Observação", placeholder: "ex: carne bem passada" }
]

export const Pedidos = () => {
    const [Pedidos, setPedidos] = useState<IPedido[]>([])
    const { isActive, handletoogle } = useToogle()
    const { usuario } = useAuth()
    const podeExcluir = usuario?.perfil === "GERENTE" || usuario?.perfil === "DONO"

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

    return (
        <div className="flex flex-col items-center">
            <Modal isActive={isActive} toogle={handletoogle} criar={metodospedidos.criar} campos={campos} aoCriar={recarregar} />
            <div className="relative flex w-full items-center mb-3.5">
                {!isActive && (
                    <button
                        onClick={handletoogle}
                        className="absolute right-0 cursor-pointer bg-white w-25 h-10 rounded-2xl border-2 border-red-500 text-red-500 font-bold"
                    >Adicionar</button>
                )}
                <h1 className="w-full text-center text-2xl text-red-500 font-bold pr-4">Pedidos</h1>
            </div>
            <div>
                <section className="grid grid-cols-1 w-full gap-4 md:h-auto md:grid-cols-2 ">
                    {Pedidos.map((pedido) => (
                        <article key={pedido.id} className="flex w-xl justify-between gap-2 space-y-2 rounded-2xl border-2 p-4 bg-red-500 text-white">
                            <div >
                                <p>Item: {pedido.itemId}</p>
                                <strong className="text-xl"> Quantidade: {pedido.quantidade}</strong>
                                <p>Observação: {pedido.observacao}</p>
                                <p className="font-bold text-xl">Comanda: {pedido.comandaId}</p>
                                <p>Valor Total: R$ {pedido.valorTotal}</p>
                                <p>Status: {pedido.status ? "Aberto" : "Fechado"}</p>
                                <p>Valor Unitário: {pedido.precoUnitario}</p>
                                <p>ID Item: {pedido.itemId}</p>
                            </div>
                            {podeExcluir && pedido.id !== undefined && (
                                <button
                                    type="button"
                                    aria-label="Excluir pedido"
                                    onClick={() => excluir(pedido.id!)}
                                    className="cursor-pointer self-end"
                                >
                                    <Trash />
                                </button>
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