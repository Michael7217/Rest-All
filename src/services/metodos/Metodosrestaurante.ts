import { Verifica } from "../../utils"
import type { Irestaurante } from "../../utils"
import { Api } from "../api/Api"

const Listarrestaurantes = async () => { //apenas admin
    try{
        const response = await Api().get<Irestaurante[]>("/restaurantes")
        return response.data
    }catch(error){
        return Verifica(error)
    }
}

const Editarrestaurantes = async (dados: Irestaurante) => { //apenas admin
    try{
        const response = await Api().put<Irestaurante>(`/restaurantes/${dados.id}`, dados)
        return response.data
    }catch(error){
        return Verifica(error)
    }
}
const Editarrestaurantesall = async (dados: Irestaurante) => { //apenas dono
    try{
        const response = await Api().put<Irestaurante>(`/restaurantes/meu-restaurante`, dados)
        return response.data
    }catch(error){
        return Verifica(error)
    }
}



export const metodosrestaurante = {
    Listarrestaurantes: Listarrestaurantes,
    Editarrestaurantes: Editarrestaurantes,
    Editarrestaurantesall: Editarrestaurantesall
}