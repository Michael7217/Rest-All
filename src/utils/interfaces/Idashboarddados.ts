interface IComandasPorMesa {
    mesa: number
    quantidade: number
}

interface IItemMaisVendido {
    itemId: number
    nomeItem: string
    quantidade: number
    receitaGerada: number
}

export interface Idashboarddados {
    totalVendido: number
    totalDespesas: number
    lucroLiquido: number
    quantidadeComandas: number
    comandasPorMesa: IComandasPorMesa[]
    itensMaisVendidos: IItemMaisVendido[]
}