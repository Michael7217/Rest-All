import { useEffect, useState } from "react"
import { metodosrestaurante } from "../../services"
import type { Irestaurante } from "../../utils"
import { useAuth, useToast } from "../../hooks"

export const Meurestaurante = () => {
    const [restaurantes, setRestaurantes] = useState<Irestaurante[] | null>(null)
    const { usuario } = useAuth()
    const { showToast } = useToast()

    useEffect(() => {
        const carregarRestaurantes = async () => {
            const response = await metodosrestaurante.Listarrestaurantes()
            if (typeof response === "string") {
                showToast(response, "error")
                setRestaurantes([])
                return
            }
            setRestaurantes(response)
        }

        carregarRestaurantes()
    }, [showToast])

    const meuRestaurante = restaurantes?.find(
        (restaurante) => restaurante.id === usuario?.restauranteId
    )

    return (
        <section className="mx-auto w-full max-w-3xl rounded-2xl bg-red-500 p-5 text-white sm:p-8">
            <h1 className="mb-5 text-2xl font-bold">Meu restaurante</h1>
            {restaurantes === null ? (
                <p>Carregando restaurante...</p>
            ) : meuRestaurante ? (
                <dl className="grid gap-4 sm:grid-cols-2">
                    <div>
                        <dt className="font-bold">Nome</dt>
                        <dd className="wrap-break-words">{meuRestaurante.nome}</dd>
                    </div>
                    <div>
                        <dt className="font-bold">Endereço</dt>
                        <dd className="wrap-break-words">{meuRestaurante.endereco}</dd>
                    </div>
                    <div>
                        <dt className="font-bold">Telefone</dt>
                        <dd>{meuRestaurante.telefone}</dd>
                    </div>
                    <div>
                        <dt className="font-bold">E-mail</dt>
                        <dd className="wrap-break-words">{meuRestaurante.email}</dd>
                    </div>
                    {meuRestaurante.cnpj && (
                        <div>
                            <dt className="font-bold">CNPJ</dt>
                            <dd>{meuRestaurante.cnpj}</dd>
                        </div>
                    )}
                    <div>
                        <dt className="font-bold">Status</dt>
                        <dd>{meuRestaurante.status}</dd>
                    </div>
                </dl>
            ) : (
                <p>Não foi encontrado um restaurante associado a esta conta.</p>
            )}
        </section>
    )
}