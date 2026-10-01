export interface ICampoFormulario {
    nome: string
    rotulo: string
    placeholder: string
    tipo?: "text" | "number" | "date" | "select" | "file"
    obrigatorio?: boolean
    opcoes?: { valor: string; rotulo: string }[]
    regex?: RegExp
    parse?: (valor: string) => unknown
    somenteLeitura?: boolean
}