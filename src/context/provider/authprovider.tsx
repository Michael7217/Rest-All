import { useState, type ReactNode } from "react";
import type { IFuncionario } from "../../utils";
import { funcionario } from "../../services";
import { Authcontext } from "../context/Context";

export const Authprovider = ({children}: {children: ReactNode}) => {
    const [usuario, setUsuario] = useState<IFuncionario | null>(() => {
        const salvo = localStorage.getItem("usuario")
        return salvo ? JSON.parse(salvo) : null
    })

    const login = async (email: string, senha: string) => {
        const response = await funcionario.listar()
        if(typeof response === "string") return false;

        const achou: IFuncionario | undefined = response.find((f) => f.email === email && f.senha === senha)
        if(!achou) return false
        setUsuario(achou)
        localStorage.setItem("usuario", JSON.stringify(achou))
        return true
        }
    
    const logout = () => {
        setUsuario(null)
        localStorage.removeItem("usuario")  
    }

    return(
        <Authcontext.Provider value={{usuario, islogged: !!usuario, login, logout}}>
            {children}
        </Authcontext.Provider>
    )

}