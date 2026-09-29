import { useEffect, useState } from "react"
import type { ICampoFormulario, Icardapio } from "../../utils"
import { metodoscardapio } from "../../services"
import { Modal } from "../../components"
import { useAuth, useToogle } from "../../hooks"
import { PenIcon, Trash } from "lucide-react"

const campos: ICampoFormulario[] = [
    { nome: "nome", rotulo: "Nome", placeholder: "ex: vatapá" },
    { nome: "descricao", rotulo: "Descrição", placeholder: "prato da culinária paraense" },
    { nome: "categoria", rotulo: "Categoria", placeholder: "prato completo" },
    { nome: "preco", rotulo: "Preço", tipo: "number", placeholder: "ex: 20.0", parse: (valor) => Number(valor) },
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
    { nome: "imagem", rotulo: "Imagem", placeholder: "ex: example.com/image" },
]


export const Cardapio = () => {
    const [Cardapio, setCardapio] = useState<Icardapio[]>([])
    const {isActive, handletoogle} = useToogle()
    const {usuario, islogged} = useAuth()
    const podeExcluir = usuario?.perfil === "GERENTE" || usuario?.perfil === "DONO"
    const [pratoEmEdicao, setPratoEmEdicao] = useState<Icardapio | null>(null)

    useEffect(() => {
        const carregarcardapio = async () => {
            const response = await metodoscardapio.listar()
            if (typeof response !== "string"){
                setCardapio(response)
            }
        }
        carregarcardapio()
    }, [])

    const recarregar = async () => {
        const response = await metodoscardapio.listar()
        if (typeof response !== "string"){
            setCardapio(response)
        }
    }
    const excluir = async (id: number) => {
        const response = await metodoscardapio.deletar(id)
        if (typeof response !== "string") await recarregar()
    }

    const fecharModal = () => {
        setPratoEmEdicao(null)
        handletoogle()
    }

    const editarPrato = (dados: Icardapio) => {
        if (pratoEmEdicao?.id === undefined) return Promise.resolve("Prato sem ID")
        return metodoscardapio.atualizarput(pratoEmEdicao.id, { ...dados, id: pratoEmEdicao.id })
    }

    return(
        <>
        <Modal
            key={`${isActive}-${pratoEmEdicao?.id ?? "novo"}`}
            isActive={isActive}
            toogle={fecharModal}
            criar={metodoscardapio.criar}
            atualizar={editarPrato}
            valoresIniciais={pratoEmEdicao ?? undefined}
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
                Cardápio
            </h1>
        </div>
        <div className="flex flex-col items-center">
            
            <section className="grid grid-cols-1 w-full gap-4 md:h-auto md:grid-cols-2 ">
                {Cardapio.map((prato) => (
                    <article key={`${prato.id}-${prato.nome}`} className="record-card flex flex-col gap-2 rounded-2xl border-2 p-4 bg-red-500 text-white">
                        {prato.imagem && (
                            <img
                                src={prato.imagem}
                                alt={prato.nome}
                                className="block h-40 w-full object-cover object-center rounded-2xl mb-2" 
                            />
                        )}
                        <div className="flex justify-between gap-2">
                            <div className="min-w-0 flex-1 wrap-break-word">
                                {islogged && <p>Id: {prato.id}</p>}
                                <h2 className="font-bold text-xl">Nome: {prato.nome}</h2>
                                <p><strong>Descrição:</strong> {prato.descricao}</p>
                                <strong className="text-xl">R$ {prato.preco.toFixed(2)}</strong>
                                <p><strong>Categoria:</strong> {prato.categoria}</p>
                                <p><strong>Disponibilidade:</strong> {prato.disponivel ? "Disponível" : "Indisponível"}</p>
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
                </section>
            </div>
        </>
    )
}