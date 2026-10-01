import { useLocation } from "react-router-dom"

const mensagensPorRota: Record<string, string> = {
    cardapio: "Nenhum item do cardápio foi adicionado.",
    comandas: "Nenhuma comanda foi adicionada.",
    despesas: "Nenhuma despesa foi adicionada.",
    estoque: "Nenhum item foi adicionado ao estoque.",
    funcionarios: "Nenhum funcionário foi adicionado.",
    gerentes: "Nenhum gerente foi adicionado.",
    pedidos: "Nenhum pedido foi adicionado.",
    proprietarios: "Nenhum proprietário foi adicionado.",
    restaurantes: "Nenhum restaurante foi adicionado.",
}

export const EstadoVazio = () => {
    const { pathname } = useLocation()
    const rota = pathname.split("/").filter(Boolean)[0] ?? ""

    return (
        <p className="col-span-full py-8 text-center text-gray-500">
            {mensagensPorRota[rota] ?? "Nenhum item foi adicionado."}
        </p>
    )
}