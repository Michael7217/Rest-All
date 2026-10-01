import { Verifica } from "../../utils"
import type { Irestaurante } from "../../utils"
import { Api } from "../api/Api"

const Meurestaurante = async () => { //apenas admin
    try{
        const response = await Api().get<Irestaurante>("/restaurantes/meu-restaurante")
        return response.data
    }catch(error){
        return Verifica(error)
    }
}
const Listarrestaurantespublico = async () => { //publico
    try{
        const response = await Api().get<Partial<Irestaurante>[]>("/restaurantes/publico")
        return response.data
    }catch(error){
        return Verifica(error)
    }
}
const Listarrestaurantes = async () => { //publico
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
const Editarrestaurante = async (dados: Irestaurante) => { //apenas dono
    try{
        const response = await Api().put<Irestaurante>(`/restaurantes/meu-restaurante`, dados)
        return response.data
    }catch(error){
        return Verifica(error)
    }
}



export const metodosrestaurante = {
    Meurestaurante: Meurestaurante,
    Listarrestaurantespublico: Listarrestaurantespublico,
    Listarrestaurantes: Listarrestaurantes,
    Editarrestaurantes: Editarrestaurantes,
    Editarrestaurante: Editarrestaurante
}