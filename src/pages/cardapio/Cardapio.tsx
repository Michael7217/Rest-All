import { useEffect, useState } from "react"
import type { Icardapio } from "../../utils"
import { cardapio } from "../../services"

export const Cardapio = () => {
    const [Cardapio, setCardapio] = useState<Icardapio[]>([])
    
    
    useEffect(() => {
        const handlecardapio = async () => {
            const response = await cardapio.listar()
            if (typeof response === "string"){
                return response
            }else{
                setCardapio(response)
            }
        }
        handlecardapio()
    }, [])

    return(
        <>
        <div className="flex flex-col items-center">
            <h1 className="text-2xl text-red-500 font-bold mb-2 relative right-2">Cardápio</h1> 
            <section className="grid grid-cols-1 w-full gap-4 md:h-auto md:grid-cols-2 ">
                {Cardapio.map((prato) => (
                    <article key={prato.id} className="space-y-2 rounded-2xl border-2 p-4 bg-red-500 text-white">
                        {prato.imagem && (
                            <img
                                src={prato.imagem}
                                alt={prato.nome}
                                className="h-40 w-full object-cover rounded-2xl" 
                            />
                        )}

                        <h2 className="font-bold text-xl">{prato.nome}</h2>
                        <p>{prato.descricao}</p>
                        <strong className="text-xl">R$ {prato.preco.toFixed(2)}</strong>
                        <p><strong>Categoria:</strong> {prato.categoria}</p>
                        <p>{prato.disponivel ? "Disponível" : "Indisponível"}</p>
                        {/* <div className="flex w-full justify-center">
                        <button className="cursor-pointer bg-white w-25 h-10 rounded-2xl text-red-500 font-black">Adicionar</button>
                        </div> */}
                    </article>
                ))}
                </section>
            </div>
        </>
    )
}