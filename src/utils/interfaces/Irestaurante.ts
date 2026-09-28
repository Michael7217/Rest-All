import type { Tstatusrestaurantes } from "../types/Tstatusrestaurante"

export interface Irestaurante {
    id?: number
    nome: string
    cnpj?: string
    telefone: string
    email: string
    endereco: string
    status: Tstatusrestaurantes
}