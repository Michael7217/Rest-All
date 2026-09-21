import type { Idadosuser } from "./Idadosuser"

export interface Iauthcontext {
    
    usuario: Idadosuser | null
    islogged: boolean
    login: (email: string, senha: string) => Promise<boolean>
    logout: () => void
}