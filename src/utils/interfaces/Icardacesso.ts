import type { LucideIcon } from "lucide-react"
import type { Roles } from "../types/Roles"

export interface Icardacesso {
    titulo: string
    descricao: string
    rota: string
    icone: LucideIcon
    perfis?: Roles[]

}