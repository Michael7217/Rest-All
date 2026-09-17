import { Verifica, type IPedido } from "../../utils"
import { Api } from "../api/Api"

const listarpedidos = async () => {
    try {
        const response = await Api().get<IPedido[]>("/pedidos")
        return response.data
    } catch (error) {
        return Verifica(error)
    }
}

const deletarpedido = async (id: number) => {
    try {
        const response = await Api().delete<IPedido>(`/pedidos/${id}`)
        return response
    } catch (error) {
        return Verifica(error)
    }
}

const atualizarpedido = async (
    id: number,
    pedido: Partial<IPedido>,
) => {
    try {
        const response = await Api().patch<IPedido>(`/pedidos/${id}`, pedido)
        return response
    } catch (error) {
        return Verifica(error)
    }
}

const atualizarpedidoput = async (
    id: number,
    pedido: IPedido,
) => {
    try {
        const response = await Api().put<IPedido>(`/pedidos/${id}`, pedido)
        return response
    } catch (error) {
        return Verifica(error)
    }
}

const buscarpedidoid = async (id: number) => {
    try {
        const response = await Api().get<IPedido>(`/pedidos/${id}`)
        return response.data
    } catch (error) {
        return Verifica(error)
    }
}

const criarpedido = async (pedido: IPedido) => {
    try {
        const response = await Api().post<IPedido>("/pedidos", pedido)
        return response
    } catch (error) {
        return Verifica(error)
    }
}

export const pedido = {
    listar: listarpedidos,
    deletar: deletarpedido,
    atualizar: atualizarpedido,
    atualizarput: atualizarpedidoput,
    buscarid: buscarpedidoid,
    criar: criarpedido,
}