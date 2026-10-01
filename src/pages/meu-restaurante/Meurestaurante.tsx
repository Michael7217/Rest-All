import { useEffect, useState } from "react"
import { Modal } from "../../components"
import { useToast, useToogle } from "../../hooks"
import { metodosrestaurante } from "../../services"
import type { ICampoFormulario, Irestaurante } from "../../utils"

const campos: ICampoFormulario[] = [
    { nome: "nome", rotulo: "Nome", placeholder: "Nome do restaurante" },
    { nome: "cnpj", rotulo: "CNPJ", placeholder: "CNPJ" },
    { nome: "email", rotulo: "Email", placeholder: "email@exemplo.com" },
    { nome: "telefone", rotulo: "Telefone", placeholder: "Telefone" },
    { nome: "endereco", rotulo: "Endereço", placeholder: "Endereço" },
    {
        nome: "status",
        rotulo: "Status",
        placeholder: "Selecione um status",
        tipo: "select",
        opcoes: [
            { valor: "ATIVO", rotulo: "Ativo" },
            { valor: "DESATIVO", rotulo: "Desativo" },
        ],
    },
]

export const Meurestaurante = () => {
    const [meuRestaurante, setMeuRestaurante] = useState<Irestaurante | null>(null)
    const [restauranteEmEdicao, setRestauranteEmEdicao] = useState<Irestaurante | null>(null)
    const [carregando, setCarregando] = useState(true)
    const { showToast } = useToast()
    const { isActive, handletoogle } = useToogle()

    useEffect(() => {
        const carregarRestaurantes = async () => {
            const response = await metodosrestaurante.Meurestaurante()

            if (typeof response === "string") {
                showToast(response, "error")
                setMeuRestaurante(null)
                setCarregando(false)
                return
            }

            setMeuRestaurante(response)
            setCarregando(false)
        }

        void carregarRestaurantes()
    }, [showToast])

    const fecharModal = () => {
        setRestauranteEmEdicao(null)
        handletoogle()
    }

    const editarRestaurante = (dados: Irestaurante) => {
        if (!meuRestaurante?.id) {
            return Promise.resolve("Restaurante sem ID")
        }

        return metodosrestaurante.Editarrestaurante({
            ...dados,
            id: meuRestaurante.id,
        })
    }

    return (
        <>
            <Modal
                key={`${isActive}-${meuRestaurante?.id ?? "nenhum"}`}
                isActive={isActive}
                toogle={fecharModal}
                atualizar={editarRestaurante}
                valoresIniciais={restauranteEmEdicao ?? meuRestaurante ?? undefined}
                modoEdicao
                campos={campos}
                aoCriar={(restauranteAtualizado) => {
                    setMeuRestaurante(restauranteAtualizado as Irestaurante)
                }}
            />

            <section className="mx-auto w-full max-w-3xl rounded-2xl bg-red-500 p-5 text-white sm:p-8">
                <div className="mb-5 flex items-center justify-between gap-3">
                    <h1 className="text-2xl font-bold">Meu restaurante</h1>
                    {meuRestaurante && (
                        <button
                            type="button"
                            onClick={() => {
                                setRestauranteEmEdicao(meuRestaurante)
                                handletoogle()
                            }}
                            className="cursor-pointer rounded-xl bg-white px-3 py-2 text-sm font-bold text-red-500 transition hover:bg-red-100"
                        >
                            Editar
                        </button>
                    )}
                </div>

                {carregando ? (
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
        </>
    )
}