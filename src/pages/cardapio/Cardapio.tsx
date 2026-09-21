import { useEffect, useState } from "react"
import type { Icardapio } from "../../utils"
import { cardapio } from "../../services"
import { Model } from "../../components"
import { useToogle } from "../../hooks"

export const Cardapio = () => {
    const [Cardapio, setCardapio] = useState<Icardapio[]>([])
    const {isActive, handletoogle} = useToogle()
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
        <Model isActive={isActive} toogle={handletoogle}/>
        <div className="relative flex w-full items-center">
            {!isActive && (
                <button
                    onClick={handletoogle}
                    className="absolute left-0 cursor-pointer bg-white w-25 h-10 rounded-2xl border-2 text-red-500 font-bold"
                >
                    Adicionar
                </button>
            )}

            <h1 className="w-full text-center text-2xl text-red-500 font-bold pr-4">
                Cardápio
            </h1>
        </div>
        <div className="flex flex-col items-center">
            
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