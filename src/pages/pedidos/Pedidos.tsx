import { useEffect, useState } from "react"
import type { IPedido } from "../../utils"
import { pedido } from "../../services"

export const Pedidos = () => {
    const [Pedidos, setPedidos] = useState<IPedido[]>([])

    useEffect(() => {
        const listarpedidos = async () => {
            const response = await pedido.listar()
            if (typeof response === "string") {
                return
            }else{
                setPedidos(response)
            }
        }
        listarpedidos()
    }, [])

    return (
        <div className="flex flex-col items-center">
            <div className="text-2xl font-bold text-red-500 relative right-2"><h1>Pedidos</h1></div>
            <div>
                <h1 className="text-2xl text-red-500 font-bold mb-2 relative right-2">Cardápio</h1> 
                            <section className="grid grid-cols-1 w-full gap-4 md:h-auto md:grid-cols-2 ">
                                {Pedidos.map((pedido) => (
                                    <article key={pedido.id} className="space-y-2 rounded-2xl border-2 p-4 bg-red-500 text-white">  
                
                                        <h2 className="font-bold text-xl">{pedido.comandaId}</h2>
                                        <p>{pedido.valorTotal}</p>
                                        <p>{pedido.status ? "Aberto" : "Fechado"}</p>
                                        <strong className="text-xl">R$ {pedido.quantidade}</strong>
                                        <p><strong>Categoria:</strong> {pedido.precoUnitario}</p>
                                        {/* <div className="flex w-full justify-center">
                                        <button className="cursor-pointer bg-white w-25 h-10 rounded-2xl text-red-500 font-black">Adicionar</button>
                                        </div> */}
                                    </article>
                                ))}
                                </section>
                            </div>
            </div>
    )
}