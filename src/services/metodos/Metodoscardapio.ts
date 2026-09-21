import { Verifica, type Icardapio } from "../../utils"
import { Api } from "../api/Api"

const listarcardapio = async () => {
    try {
        const response = await Api().get<Icardapio[]>("/cardapio")
        return response.data
    } catch (error) {
        return Verifica(error)
    }
}

const deletarcardapio = async (id: number) => {
    try {
        const response = await Api().delete<Icardapio>(`/cardapio/${id}`)
        return response
    } catch (error) {
        return Verifica(error)
    }
}

const atualizarcardapio = async (
    id: number,
    cardapio: Partial<Icardapio>,
) => {
    try {
        const response = await Api().patch<Icardapio>(`/cardapio/${id}`, cardapio)
        return response
    } catch (error) {
        return Verifica(error)
    }
}

const atualizarcardapiopid = async (id: number, cardapio: Icardapio) => {
    try {
        const response = await Api().put<Icardapio>(`/cardapio/${id}`, cardapio)
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
        const response = await Api().post<Icardapio>("/cardapio", cardapio)
        return response
    } catch (error) {
        return Verifica(error)
    }
}

export const cardapio = {
    listar: listarcardapio,
    deletar: deletarcardapio,
    atualizar: atualizarcardapio,
    atualizarput: atualizarcardapiopid,
    buscarid: buscarcardapioid,
    criar: criarcardapio,
}