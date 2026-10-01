import { Verifica, type IComanda } from "../../utils"
import { Api } from "../api/Api"

const listarcomandas = async () => {
    try {
        const response = await Api().get<IComanda[]>("/api/comandas")
        return response.data
    } catch (error) {
        return Verifica(error)
    }
}

const deletarcomanda = async (id: number) => {
    try {
        const response = await Api().delete<IComanda>(`/api/comandas/${id}`)
        return response
    } catch (error) {
        return Verifica(error)
    }
}

const atualizarcomandaput = async (
    id: number,
    comanda: IComanda,
) => {
    try {
        const response = await Api().put<IComanda>(`/api/comandas/${id}`, comanda)
        return response
    } catch (error) {
        return Verifica(error)
    }
}

const buscarcomandaid = async (id: number) => {
    try {
        const response = await Api().get<IComanda>(`/api/comandas/${id}`)
        return response.data
    } catch (error) {
        return Verifica(error)
    }
}

const criarcomanda = async (comanda: IComanda) => {
    try {
        const response = await Api().post<IComanda>("/api/comandas", comanda)
        return response
    } catch (error) {
        return Verifica(error)
    }
}

export const metodoscomandas = {
    listar: listarcomandas,
    deletar: deletarcomanda,
    atualizarput: atualizarcomandaput,
    buscarid: buscarcomandaid,
    criar: criarcomanda,
}