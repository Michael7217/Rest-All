export interface ICampoFormulario {
    nome: string
    rotulo: string
    placeholder: string
    tipo?: "text" | "number"
    regex?: RegExp
    parse?: (valor: string) => unknown
}