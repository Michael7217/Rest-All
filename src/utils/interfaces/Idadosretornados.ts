import type { Roles } from "../types/Roles"

export interface Idadosretornados {
    id?: number
    nome: string
    email: string
    perfil: Roles
    restauranteId: number
    cpf: string
    cargo: string
    telefone: string
    ativo?: true

}