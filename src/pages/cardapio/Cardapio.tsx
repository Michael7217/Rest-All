import { useEffect, useState } from "react"
import type { ICampoFormulario, Icardapio, Icardapioformulario, Irestaurante } from "../../utils"
import { metodoscardapio, metodosrestaurante } from "../../services"
import { EstadoVazio, Modal } from "../../components"
import { useAuth, useToast, useToogle } from "../../hooks"
import { ArrowRight, PenIcon, Trash } from "lucide-react"
import { useNavigate } from "react-router-dom"

const campos: ICampoFormulario[] = [
    { nome: "nome", rotulo: "Nome", placeholder: "ex: vatapá" },
    { nome: "descricao", rotulo: "Descrição", placeholder: "prato da culinária paraense" },
    { nome: "categoria", rotulo: "Categoria", placeholder: "prato completo" },
    { nome: "preco", rotulo: "Preço", tipo: "number", placeholder: "ex: 20,00", parse: (valor) => Number(valor) },
    {
        nome: "disponivel",
        rotulo: "Disponibilidade",
        placeholder: "Selecione a disponibilidade",
        tipo: "select",
        opcoes: [
            { valor: "true", rotulo: "Disponível" },
            { valor: "false", rotulo: "Indisponível" },
        ],
        parse: (valor) => valor === "true",
    },
    { nome: "imagem", tipo: "file", rotulo: "Imagem do prato", placeholder: "Selecione uma imagem" },
]


export const Cardapio = () => {
    const [Cardapio, setCardapio] = useState<Icardapio[]>([])
    const [Restaurantespublico, setRestaurantespublico] = useState<Partial<Irestaurante>[]>([])
    const {isActive, handletoogle} = useToogle()
    const {usuario, islogged} = useAuth()
    const { showToast } = useToast()
    const podeExcluir = usuario?.perfil === "GERENTE" || usuario?.perfil === "DONO"
    const [pratoEmEdicao, setPratoEmEdicao] = useState<Icardapio | null>(null)
    const navigate = useNavigate()

    useEffect(() => {
        const carregarcardapio = async () => {
            const response = await metodoscardapio.listar()
            if (typeof response === "string") {
                showToast(response, "error")
                return
            }
            setCardapio(response)
        }

        const carregarRestaurantes = async () => {
            const response = await metodosrestaurante.Listarrestaurantespublico()
            if (typeof response === "string") {
                showToast(response, "error")
                return
            }
            setRestaurantespublico(response)
        }

        if (!islogged) {
            void carregarRestaurantes()
            return
        }

        void carregarcardapio()
    }, [islogged, showToast])

    

    const recarregar = async () => {
        const response = await metodoscardapio.listar()
        if (typeof response === "string") {
            showToast(response, "error")
            return
        }
        setCardapio(response)
    }
    const excluir = async (id: number) => {
        const response = await metodoscardapio.deletar(id)
        if (typeof response === "string") {
            showToast(response, "error")
            return
        }
        await recarregar()
    }

    const fecharModal = () => {
        setPratoEmEdicao(null)
        handletoogle()
    }

    const editarPrato = (dados: Icardapioformulario) => {
        if (pratoEmEdicao?.id === undefined) return Promise.resolve("Prato sem ID")
        return metodoscardapio.atualizarput(pratoEmEdicao.id, {
            ...dados,
            imagem: pratoEmEdicao.imagem,
            id: pratoEmEdicao.id,
        })
    }

    const valoresIniciais = pratoEmEdicao
        ? {
            id: pratoEmEdicao.id,
            nome: pratoEmEdicao.nome,
            descricao: pratoEmEdicao.descricao,
            categoria: pratoEmEdicao.categoria,
            preco: pratoEmEdicao.preco,
            disponivel: pratoEmEdicao.disponivel,
        }
        : undefined

    return (
        <>
        <Modal
            key={`${isActive}-${pratoEmEdicao?.id ?? "novo"}`}
            isActive={isActive}
            toogle={fecharModal}
            criar={metodoscardapio.criar}
            atualizar={editarPrato}
            valoresIniciais={valoresIniciais}
            modoEdicao={pratoEmEdicao !== null}
            campos={campos}
            aoCriar={recarregar}
        />
        <div className="relative flex w-full items-center mb-3.5">
            {!isActive && islogged && (
                <button
                    onClick={() => {
                        setPratoEmEdicao(null)
                        handletoogle()
                    }}
                    className="absolute right-0 shrink-0 cursor-pointer bg-white w-25 h-10 rounded-2xl border-2 border-red-500 text-red-500 font-bold"
                >Adicionar</button>
            )}
            <h1 className="w-full truncate pr-4 text-center text-xl text-red-500 font-bold sm:text-2xl">
                {islogged ? "Cardápio" : "Restaurantes"}
            </h1>
        </div>
        <div className="flex flex-col items-center">
            {!islogged ? (<section className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
                    {Restaurantespublico.length === 0 ? (
                        <EstadoVazio />
                    ) :
                    Restaurantespublico.map((restaurante) => (
                        <article key={restaurante.id} className="record-card flex justify-between gap-2 rounded-2xl border-2 border-red-500 bg-red-500 p-4 text-white transition-colors hover:bg-white hover:text-red-500">
                            <div className="min-w-0 flex-1 wrap-break-words flex flex-col">
                                <h2 className="text-lg font-bold">{restaurante.nome}</h2>
                                <p className="text-sm"><strong>Endereço:</strong> {restaurante.endereco || "Não informado"}</p>
                                <p className="text-sm"><strong>Telefone:</strong> {restaurante.telefone || "Não informado"}</p>
                            </div>
                            {restaurante.id !== undefined && (
                                <button
                                    type="button"
                                    aria-label={`Ver cardápio de ${restaurante.nome}`}
                                    title="Ver cardápio"
                                    onClick={() => {
                                        navigate(`/cardapio/${restaurante.id}`)
                                    }}
                                    className="shrink-0 cursor-pointer self-center"
                                >
                                    <ArrowRight/>
                                </button>
                            )}
                        </article>
                    ))}
                </section>) : 
                (<section className="grid grid-cols-1 w-full gap-4 md:h-auto md:grid-cols-2 ">
                {Cardapio.length === 0 ? (
                    <EstadoVazio />
                ) :
                Cardapio.map((prato) => (
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
                                <p className="text-sm opacity-90">ID: {prato.id}</p>
                                <p className="text-sm opacity-90">{prato.descricao}</p>
                                <strong className="text-xl">R$ {prato.preco.toFixed(2)}</strong>
                                <p className="text-sm"><strong>Categoria:</strong> {prato.categoria}</p>
                                <p className="text-sm"><strong>Disponibilidade:</strong> {prato.disponivel ? "Disponível" : "Indisponível"}</p>
                            </div>
                            {podeExcluir && prato.id !== undefined && (
                                <div className="flex shrink-0 flex-col justify-around gap-3">
                                    <button
                                        type="button"
                                        aria-label="Editar item do cardápio"
                                        title="Editar item do cardápio"
                                        onClick={() => {
                                            setPratoEmEdicao(prato)
                                            handletoogle()
                                        }}
                                        className="cursor-pointer"
                                    >
                                        <PenIcon />
                                    </button>
                                    <button
                                        type="button"
                                        aria-label="Excluir item do cardápio"
                                        title="Excluir item do cardápio"
                                        onClick={() => excluir(prato.id!)}
                                        className="cursor-pointer"
                                    >
                                        <Trash />
                                    </button>
                                </div>
                            )}
                            
                        </div>
                    </article>
                ))}
                </section>)}


            
            
            </div>
        </>
    )
}