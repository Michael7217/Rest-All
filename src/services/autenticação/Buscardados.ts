import { Verifica } from "../../utils"
import { type Idadosretornados } from "../../utils/interfaces/Idadosretornados"
import { Api } from "../api/Api"

const Buscardados = async () => {
    try{
        const response = await Api().get<Idadosretornados>("/autenticacao/me")
        return response.data
    }catch(error){
        return Verifica(error)
    }
}

export const metodosbuscadados = {
    buscardados: Buscardados
}