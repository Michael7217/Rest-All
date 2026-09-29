import { Verifica, type IPedido, type Tstatuspedidos } from "../../utils"
import { Api } from "../api/Api"

const listarpedidos = async () => {
    try {
        const response = await Api().get<IPedido[]>(`/api/pedidos`)
        return response.data
    } catch (error) {
        return Verifica(error)
    }
}
const listarpedidospid = async (id: number) => {
    try {
        const response = await Api().get<IPedido[]>(`/api/pedidos/${id}`)
        return response.data
    } catch (error) {
        return Verifica(error)
    }
}
const listarpedidospcomanda = async (id: number) => {
    try {
        const response = await Api().get<IPedido[]>(`/api/pedidos/comanda/${id}`)
        return response.data
    } catch (error) {
        return Verifica(error)
    }
}

const deletarpedido = async (id: number) => {
    try {
        const response = await Api().delete<IPedido>(`/api/pedidos/${id}`)
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
        const response = await Api().patch<IPedido>(`/api/pedidos/${id}`, pedido)
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
        const response = await Api().get<IPedido>(`/api/pedidos${id}`)
        return response.data
    } catch (error) {
        return Verifica(error)
    }
}

const criarpedido = async (pedido: IPedido) => {
    
    try {
        const response = await Api().post<IPedido>("/api/pedidos", pedido)
        return response
    } catch (error) {

        return Verifica(error)
    }
}


const editarstatus = async (id: number, status: Tstatuspedidos) => {
    try {
        const response = await Api().patch<IPedido>(`/api/pedidos/status/${id}/status`, {
            status,
        })
        return response
    } catch (error) {
        return Verifica(error)
    }
}

export const metodospedidos = {
    listar: listarpedidos,
    listarpid: listarpedidospid,
    listarpedidospcomanda: listarpedidospcomanda,
    deletar: deletarpedido,
    atualizar: atualizarpedido,
    atualizarput: atualizarpedidoput,
    buscarpedido: buscarpedidoid,
    criar: criarpedido,
    editarstatus: editarstatus
}