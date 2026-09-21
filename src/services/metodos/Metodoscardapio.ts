import { Verifica, type Icardapio } from "../../utils"
import { Api } from "../api/Api"

const listarcardapio = async () => {
    try {
        const response = await Api().get<Icardapio[]>("/api/cardapio")
        return response.data
    } catch (error) {
        return Verifica(error)
    }
}

const deletarcardapio = async (id: number) => {
    try {
        const response = await Api().delete<Icardapio>(`/api/cardapio/${id}`)
        return response
    } catch (error) {
        return Verifica(error)
    }
}


const atualizarcardapiopid = async (id: number, cardapio: Icardapio) => {
    try {
        const response = await Api().put<Icardapio>(`/api/cardapio/${id}`, cardapio)
        return response
    } catch (error) {
        return Verifica(error)
    }
}

const buscarcardapioid = async (id: number) => {
    try {
        const response = await Api().get<Icardapio>(`/cardapio/${id}`)
        return response.data
    } catch (error) {
        return Verifica(error)
    }
}

const criarcardapio = async (cardapio: Icardapio) => {
    try {
        const response = await Api().post<Icardapio>("/api/cardapio", cardapio)
        return response
    } catch (error) {
        return Verifica(error)
    }
}

export const cardapio = {
    listar: listarcardapio,
    deletar: deletarcardapio,
    atualizarput: atualizarcardapiopid,
    buscarid: buscarcardapioid,
    criar: criarcardapio,
}