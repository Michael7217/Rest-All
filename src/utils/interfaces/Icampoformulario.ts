export interface ICampoFormulario {
    nome: string
    rotulo: string
    placeholder: string
    tipo?: "text" | "number" | "date" | "select"
    opcoes?: { valor: string; rotulo: string }[]
    regex?: RegExp
    parse?: (valor: string) => unknown
    somenteLeitura?: boolean
}