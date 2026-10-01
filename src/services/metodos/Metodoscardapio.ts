import { Verifica, type Icardapio, type Icardapioformulario } from "../../utils"
import { Api } from "../api/Api"

const listarcardapio = async () => {
    try {
        const response = await Api().get<Icardapio[]>("/api/cardapio")
        return response.data
    } catch (error) {
        return Verifica(error)
    }
}
const listarcardapiopublico = async (restauranteId: number) => {
    try {
        const response = await Api().get<Icardapio[]>(`/api/cardapio/restaurante/${restauranteId}`)
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
        const response = await Api().get<Icardapio>(`/api/cardapio/${id}`)
        return response.data
    } catch (error) {
        return Verifica(error)
    }
}

const criarcardapio = async (cardapio: Icardapioformulario) => {
    try {
        const formData = new FormData()
        formData.append("imagem", cardapio.imagem)

        const response = await Api().post<Icardapio>("/api/cardapio", formData, {
            params: {
                nome: cardapio.nome,
                descricao: cardapio.descricao,
                categoria: cardapio.categoria,
                preco: cardapio.preco,
                disponivel: cardapio.disponivel,
            },
        })
        return response
    } catch (error) {
        return Verifica(error)
    }
}

export const metodoscardapio = {
    listar: listarcardapio,
    listarcardapiopublico: listarcardapiopublico,
    deletar: deletarcardapio,
    atualizarput: atualizarcardapiopid,
    buscarid: buscarcardapioid,
    criar: criarcardapio,
}