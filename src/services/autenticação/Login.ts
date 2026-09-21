import { Api } from "../api/Api"
import { Verifica } from "../../utils"
import type { Idadosuser } from "../../utils/interfaces/Idadosuser"

const Login = async (email: string, senha: string) => {
    try{
        const response = await Api().post<Idadosuser>("/autenticacao/login", 
            {
                email,
                senha
            }
        )
        return response.data
    }catch(error){
        return Verifica(error)
    }


}

export const metodoslogin = {
    Login: Login
}