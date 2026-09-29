import { useEffect, useState } from "react"
import { type Irestaurante } from "../../utils"
import { metodosrestaurante } from "../../services"
import { useToast } from "../../hooks"

export const Restaurantes = () => {
    const [Restaurantes, setRestaurantes] = useState<Irestaurante[] | null>(null)
    const { showToast } = useToast()


    useEffect(() => {
        const Carregarrestaurantes = async () => {
            const response = await metodosrestaurante.Listarrestaurantes()
            if (typeof response === "string") {
                showToast(response, "error")
                return
            }else{
                setRestaurantes(response)
            }
            
        }
        Carregarrestaurantes()
    }, [showToast])
    return (
        <>
        <div className="w-full">
                <section className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
                    {Restaurantes?.map((restaurante) => (
                        <article key={restaurante.id} className="record-card flex justify-between gap-2 rounded-2xl border-2 p-4 bg-red-500 text-white">
                            <div className="min-w-0 flex-1 wrap-break-words">
                                <p>Nome: {restaurante.nome}</p>
                                <strong className="text-xl"> Status: {restaurante.status}</strong>
                                <p>Endereço: {restaurante.endereco}</p>
                                <p className="font-bold text-xl">Telefone: {restaurante.telefone}</p>
                                <p>CNPJ: {restaurante.cnpj}</p> 
                            </div>
                        </article>
                    ))}
                </section>
            </div>
        </>
    )
}