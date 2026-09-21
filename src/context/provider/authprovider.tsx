import { useCallback, useState } from "react";
import type { Iproviderprops } from "../../utils";
import { metodoslogin } from "../../services";
import { Authcontext } from "../context/Context";
import type { Idadosuser } from "../../utils/interfaces/Idadosuser";

export const Authprovider = ({children}: Iproviderprops) => {
    const [Usuario, setUsuario] = useState<Idadosuser | null>(() => {
        try {
            const usuario = localStorage.getItem("usuario");
            return usuario ? (JSON.parse(usuario) as Idadosuser) : null;
        } catch {
            localStorage.removeItem("usuario");
            return null;
        }
});

    const LoginUser = useCallback(async (email: string, senha: string): Promise<boolean> => {
        const response = await metodoslogin.Login(email, senha)
        if (typeof response === "string") {
            return false
        }
        setUsuario(response)
        localStorage.setItem("usuario", JSON.stringify(response))
        return true
    }, [])
    
    const LogoutUser = useCallback(() => {
        setUsuario(null)
        localStorage.removeItem("usuario")  
    },[])

    return(
        <Authcontext.Provider value={{usuario: Usuario, islogged: !!Usuario, login: LoginUser, logout: LogoutUser}}>
            {children}
        </Authcontext.Provider>
    )

}