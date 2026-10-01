import { useEffect, useState } from "react"
import { type Icardapio } from "../../utils"
import { metodoscardapio } from "../../services"
import { useNavigate, useParams } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import { EstadoVazio } from "../../components"


export const Cardapiopublico = () => {
    const [Cardapiopublico, setCardapiopublico] = useState<Icardapio[]>([])
    const {Idrestaurante} = useParams<{Idrestaurante: string}>()
    const navigate = useNavigate()
    useEffect(() => {
        
        const Carregarcardapiopublico = async () => {
            const id = Number(Idrestaurante)
            const response = await metodoscardapio.listarcardapiopublico(id)
            if (typeof response === "string"){
                return
            }
            setCardapiopublico(response)
        }
        Carregarcardapiopublico()
    }, [Idrestaurante])
    return (
        <>
        <div className="relative flex w-full items-center mb-3.5">
            <button className="cursor-pointer p-1 rounded-2xl bg-red-500" onClick={() => {
                    navigate(-1)
            }}>
                <ArrowLeft color="white"/>
            </button>
            <h1 className="w-full truncate pr-4 text-center text-xl text-red-500 font-bold sm:text-2xl">
                Cardápio
            </h1>
        </div>
            <section className="grid grid-cols-1 w-full gap-4 md:h-auto md:grid-cols-2 ">
                {Cardapiopublico.length === 0 ? (
                    <EstadoVazio />
                ) :
                Cardapiopublico.map((prato) => ( 
                    <article key={`${prato.id}-${prato.nome}`} className="record-card flex flex-col gap-2 rounded-2xl border-2 border-red-500 bg-red-500 p-4 text-white transition-colors hover:bg-white hover:text-red-500">
                        {prato.imagem && (
                            <img
                                src={prato.imagem}
                                alt={prato.nome}
                                className="block h-40 w-full object-cover object-center rounded-2xl mb-2" 
                            />
                        )}
                        <div className="flex justify-between gap-2">
                            <div className="min-w-0 flex-1 wrap-break-word">
                                <h2 className="text-lg font-bold">{prato.nome}</h2>
                                <p className="text-sm opacity-90">{prato.descricao}</p>
                                <strong className="text-xl">R$ {prato.preco.toFixed(2)}</strong>
                                <p className="text-sm"><strong>Categoria:</strong> {prato.categoria}</p>
                                <p className="text-sm"><strong>Disponibilidade:</strong> {prato.disponivel ? "Disponível" : "Indisponível"}</p>
                            </div>
                        </div>
                    </article>
                ))}
                </section>
        </>
    )
}