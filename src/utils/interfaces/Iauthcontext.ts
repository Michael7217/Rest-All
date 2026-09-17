import type { IFuncionario } from "./IFuncionario"

export interface Iauthcontext {
    usuario: IFuncionario | null,
    islogged: boolean,
    login: (email: string, senha: string) => Promise<boolean>
    logout: () => void
}