export interface IPedido {
    id?: number
    comandaId: number
    itemId: number
    quantidade: number
    observacao: string
    status: string
    precoUnitario: number
    valorTotal: number
    dataPedido: string
}