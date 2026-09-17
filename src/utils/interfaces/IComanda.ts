export interface IComanda {
    id?: number
    numero: number
    mesa: number
    funcionarioId: number
    status: string
    dataAbertura: string
    dataFechamento: string | null
    valorTotal: number
}