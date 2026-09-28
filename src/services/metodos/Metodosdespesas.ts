import { Verifica, type Idespesa } from "../../utils"
import { Api } from "../api/Api"

const listardespesas= async () => {
    try {
        const response = await Api().get<Idespesa[]>("/api/despesas")
        return response.data
    } catch (error) {
        return Verifica(error)
    }
}

const deletardespesa = async (id: number) => {
    try {
        const response = await Api().delete<Idespesa>(`/api/despesas/${id}`)
        return response
    } catch (error) {
        return Verifica(error)
    }
}

const atualizardespesa = async (
    id: number,
    despesa: Idespesa,
) => {
    try {
        const response = await Api().put<Idespesa>(`/api/despesas/${id}`, despesa)
        return response
    } catch (error) {
        return Verifica(error)
    }
}

const buscardespesa = async (id: number) => {
    try {
        const response = await Api().get<Idespesa>(`/api/despesas/${id}`)
        return response.data
    } catch (error) {
        return Verifica(error)
    }
}

const criardespesa = async (despesa: Idespesa) => {
    try {
        const response = await Api().post<Idespesa>("/api/despesas", despesa)
        return response
    } catch (error) {
        return Verifica(error)
    }
}

export const metodosdespesas = {
    listar: listardespesas,
    deletar: deletardespesa,
    atualizar: atualizardespesa,
    buscarid: buscardespesa,
    criar: criardespesa,
}