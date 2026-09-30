import { useEffect, useState } from "react"
import { Modal } from "../../components"
import { type ICampoFormulario, type Irestaurante } from "../../utils"
import { metodosrestaurante } from "../../services"
import { useToast, useToogle } from "../../hooks"
import { PenIcon } from "lucide-react"

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

export const Restaurantes = () => {
    const [Restaurantes, setRestaurantes] = useState<Irestaurante[] | null>(null)
    const [restauranteEmEdicao, setRestauranteEmEdicao] = useState<Irestaurante | null>(null)
    const { showToast } = useToast()
    const { isActive, handletoogle } = useToogle()

    const recarregar = async () => {
        const response = await metodosrestaurante.Listarrestaurantes()
        if (typeof response === "string") {
            showToast(response, "error")
            return
        }
        setRestaurantes(response)
    }

    useEffect(() => {
        const carregarRestaurantes = async () => {
            const response = await metodosrestaurante.Listarrestaurantes()
            if (typeof response === "string") {
                showToast(response, "error")
                return
            }
            setRestaurantes(response)
        }
        void carregarRestaurantes()
    }, [showToast])

    const fecharModal = () => {
        setRestauranteEmEdicao(null)
        handletoogle()
    }

    const editarRestaurante = (dados: Irestaurante) => {
        if (restauranteEmEdicao?.id === undefined) {
            return Promise.resolve("Restaurante sem ID")
        }
        return metodosrestaurante.Editarrestaurantes({
            ...dados,
            id: restauranteEmEdicao.id,
        })
    }

    return (
        <>
            <Modal
                key={`${isActive}-${restauranteEmEdicao?.id ?? "nenhum"}`}
                isActive={isActive}
                toogle={fecharModal}
                // criar={metodosrestaurante.Criarrestaurante}
                atualizar={editarRestaurante}
                valoresIniciais={restauranteEmEdicao ?? undefined}
                modoEdicao
                campos={campos}
                aoCriar={recarregar}
            />
            <div className="w-full">
                <div className="relative flex w-full items-center mb-3.5">
                    {!isActive && (
                        <button
                            onClick={() => {
                                setRestauranteEmEdicao(null)
                                handletoogle()
                            }}
                            className="absolute right-0 shrink-0 cursor-pointer bg-white w-25 h-10 rounded-2xl border-2 border-red-500 text-red-500 font-bold"
                        >Adicionar</button>
                    )}
                    <h1 className="w-full text-center text-xl font-bold text-red-500 sm:text-2xl">
                        Restaurantes
                    </h1>
                </div>
                <section className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
                    {Restaurantes?.map((restaurante) => (
                        <article key={restaurante.id} className="record-card flex justify-between gap-2 rounded-2xl border-2 bg-red-500 p-4 text-white">
                            <div className="min-w-0 flex-1 wrap-break-words">
                                <strong>Nome: {restaurante.nome}</strong>
                                <p>ID: {restaurante.id}</p>
                                <strong>Status: {restaurante.status}</strong>
                                <p>Endereço: {restaurante.endereco || "Sem endereço associado"}</p>
                                <p className="font-bold">Telefone: {restaurante.telefone || "Sem telefone associado"}</p>
                                <p>CNPJ: {restaurante.cnpj || "Não informado"}</p>
                                <p>Email: {restaurante.email}</p>
                            </div>
                            {restaurante.id !== undefined && (
                                <button
                                    type="button"
                                    aria-label={`Editar restaurante ${restaurante.nome}`}
                                    title="Editar restaurante"
                                    onClick={() => {
                                        setRestauranteEmEdicao(restaurante)
                                        handletoogle()
                                    }}
                                    className="shrink-0 cursor-pointer self-center"
                                >
                                    <PenIcon />
                                </button>
                            )}
                        </article>
                    ))}
                </section>
            </div>
        </>
    )
}