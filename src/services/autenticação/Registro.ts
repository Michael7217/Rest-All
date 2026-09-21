import { Api } from "../api/Api"
import { Verifica, type Iregistro } from "../../utils"
import type { Idadosuser } from "../../utils/interfaces/Idadosuser"

const Registro = async (dados: Iregistro) => {
    try{
        const response = await Api().post<Idadosuser>("/autenticacao/registro", dados)
        return response.data
    }catch(error){
        return Verifica(error)
    }


}
export const metodosregistro = {
    Registro: Registro
}