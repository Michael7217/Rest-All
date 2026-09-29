import { useEffect, useState } from "react"
import type { ICampoFormulario, Idespesa } from "../../utils"
import { Modal } from "../../components"
import { useAuth, useToogle } from "../../hooks"
import { PenIcon, Trash } from "lucide-react"
import { metodosdespesas } from "../../services/metodos/Metodosdespesas"

const campos: ICampoFormulario[] = [
    { nome: "valor", rotulo: "Valor", tipo: "number", placeholder: "ex: 1.00", parse: (valor) => Number(valor) },
    { nome: "descricao", rotulo: "Descrição", placeholder: "Compra de insumos"},
    { nome: "dataDespesa", rotulo: "Data da Despesa", placeholder: "ex: 00/00/0000" },
    { nome: "categoria", rotulo: "Categoria", placeholder: "ex: FIXA/VARIÁVEL" }
]


export const Despesas = () => {
    const [Despesas, setDespesas] = useState<Idespesa[]>([])
    const {isActive, handletoogle} = useToogle()
    const { usuario } = useAuth()
    const podeExcluir = usuario?.perfil === "GERENTE" || usuario?.perfil === "DONO"
    const [despesaEmEdicao, setDespesaEmEdicao] = useState<Idespesa | null>(null)

    useEffect(() => {
        const carregarcardapio = async () => {
            const response = await metodosdespesas.listar()
            if (typeof response !== "string"){
                setDespesas(response)
            }
        }
        carregarcardapio()
    }, [])

    const recarregar = async () => {
        const response = await metodosdespesas.listar()
        if (typeof response !== "string"){
            setDespesas(response)
        }
    }
    const excluir = async (id: number) => {
        const response = await metodosdespesas.deletar(id)
        if (typeof response !== "string") await recarregar()
    }

    const fecharModal = () => {
        setDespesaEmEdicao(null)
        handletoogle()
    }

    const editarDespesa = (dados: Idespesa) => {
        if (despesaEmEdicao?.id === undefined) return Promise.resolve("Despesa sem ID")
        return metodosdespesas.atualizar(despesaEmEdicao.id, { ...dados, id: despesaEmEdicao.id })
    }

    return(
        <>
        <Modal
            key={`${isActive}-${despesaEmEdicao?.id ?? "novo"}`}
            isActive={isActive}
            toogle={fecharModal}
            criar={metodosdespesas.criar}
            atualizar={editarDespesa}
            valoresIniciais={despesaEmEdicao ?? undefined}
            modoEdicao={despesaEmEdicao !== null}
            campos={campos}
            aoCriar={recarregar}
        />
        <div className="relative flex w-full items-center mb-3.5">
            {!isActive && (
                <button
                    onClick={() => {
                        setDespesaEmEdicao(null)
                        handletoogle()
                    }}
                    className="absolute right-0 shrink-0 cursor-pointer bg-white w-25 h-10 rounded-2xl border-2 border-red-500 text-red-500 font-bold"
                >Adicionar</button>
            )}
            <h1 className="w-full truncate pr-4 text-center text-xl text-red-500 font-bold sm:text-2xl">
                Despesas
            </h1>
        </div>
        <div className="flex flex-col items-center">
            
            <section className="grid grid-cols-1 w-full gap-4 md:h-auto md:grid-cols-2 ">
                {Despesas.map((despesa) => (
                    <article key={`${despesa.id}`} className="record-card flex items-start justify-between gap-3 rounded-2xl border-2 p-4 bg-red-500 text-white">
                        <div className="min-w-0 flex-1 wrap-break-word">
                            <strong className="text-xl">Valor: R$ {despesa.valor.toFixed(2)}</strong>
                            <h2 className="font-bold text-xl">{despesa.descricao}</h2>
                            <p>{despesa.categoria}</p>
                            <p><strong>Categoria:</strong> {despesa.dataDespesa}</p>
                        </div>
                        {podeExcluir && despesa.id !== undefined && (
                            <div className="flex shrink-0 flex-col justify-around gap-3">
                                <button
                                    type="button"
                                    aria-label="Editar despesa"
                                    title="Editar despesa"
                                    onClick={() => {
                                        setDespesaEmEdicao(despesa)
                                        handletoogle()
                                    }}
                                    className="cursor-pointer"
                                >
                                    <PenIcon />
                                </button>
                                <button
                                    type="button"
                                    aria-label="Excluir despesa"
                                    title="Excluir despesa"
                                    onClick={() => excluir(despesa.id!)}
                                    className="cursor-pointer"
                                >
                                    <Trash />
                                </button>
                            </div>
                        )}
                    </article>
                ))}
                </section>
            </div>
        </>
    )
}