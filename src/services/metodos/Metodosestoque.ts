import { Verifica, type Iestoque } from "../../utils"
import { Api } from "../api/Api"

const listarestoque = async () => {
    try {
        const response = await Api().get<Iestoque[]>("/api/estoque")
        return response.data
    } catch (error) {
        return Verifica(error)
    }
}

const deletarestoque = async (id: number) => {
    try {
        const response = await Api().delete<Iestoque>(`/api/estoque/${id}`)
        return response
    } catch (error) {
        return Verifica(error)
    }
}


const atualizarestoquepid = async (id: number, estoque: Iestoque) => {
    try {
        const response = await Api().put<Iestoque>(`/api/estoque/${id}`, estoque)
        return response
    } catch (error) {
        return Verifica(error)
    }
}

const buscarestoqueid = async (id: number) => {
    try {
        const response = await Api().get<Iestoque>(`/api/estoque/${id}`)
        return response.data
    } catch (error) {
        return Verifica(error)
    }
}

const criarestoque = async (estoque: Iestoque) => {
    try {
        const response = await Api().post<Iestoque>("/api/estoque", estoque)
        return response
    } catch (error) {
        return Verifica(error)
    }
}

export const metodosestoque = {
    listar: listarestoque,
    deletar: deletarestoque,
    atualizarput: atualizarestoquepid,
    buscarid: buscarestoqueid,
    criar: criarestoque,
}