import { useEffect, useState } from "react"
import type { ICampoFormulario, Idespesa } from "../../utils"
import { EstadoVazio, Modal } from "../../components"
import { useAuth, useToast, useToogle } from "../../hooks"
import { PenIcon, Trash } from "lucide-react"
import { metodosdespesas } from "../../services/metodos/Metodosdespesas"

const campos: ICampoFormulario[] = [
    { nome: "valor", rotulo: "Valor", tipo: "number", placeholder: "ex: 1.00", parse: (valor) => Number(valor) },
    { nome: "descricao", rotulo: "Descrição", placeholder: "Compra de insumos"},
    { nome: "dataDespesa",
        rotulo: "Data da Despesa", 
        tipo: "date",
        placeholder: "Selecione a data" },
    { nome: "categoria",
        rotulo: "Categoria",
        tipo: "select",
        opcoes: [
            {valor: "FIXA", rotulo: "Fixa"},
            {valor: "VARIAVEL", rotulo: "Variável"}
        ],
        placeholder: "Selecione a categoria" }
]


export const Despesas = () => {
    const [Despesas, setDespesas] = useState<Idespesa[]>([])
    const {isActive, handletoogle} = useToogle()
    const { usuario } = useAuth()
    const { showToast } = useToast()
    const podeExcluir = usuario?.perfil === "GERENTE" || usuario?.perfil === "DONO"
    const [despesaEmEdicao, setDespesaEmEdicao] = useState<Idespesa | null>(null)

    useEffect(() => {
        const carregarcardapio = async () => {
            const response = await metodosdespesas.listar()
            if (typeof response === "string") {
                showToast(response, "error")
                return
            }
            setDespesas(response)
        }
        carregarcardapio()
    }, [showToast])

    const recarregar = async () => {
        const response = await metodosdespesas.listar()
        if (typeof response === "string") {
            showToast(response, "error")
            return
        }
        setDespesas(response)
    }
    const excluir = async (id: number) => {
        const response = await metodosdespesas.deletar(id)
        if (typeof response === "string") {
            showToast(response, "error")
            return
        }
        await recarregar()
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
                {Despesas.length === 0 ? (
                    <EstadoVazio />
                ) :
                Despesas.map((despesa) => (
                    <article key={`${despesa.id}`} className="record-card flex items-start justify-between gap-3 rounded-2xl border-2 border-red-500 bg-red-500 p-4 text-white transition-colors hover:bg-white hover:text-red-500">
                        <div className="min-w-0 flex-1 space-y-1 wrap-break-word">
                            <h2 className="text-lg font-bold">{despesa.descricao}</h2>
                            <strong className="text-xl">R$ {despesa.valor.toFixed(2)}</strong>
                            <p className="text-sm"><strong>Categoria:</strong> {despesa.categoria}</p>
                            <p className="text-sm"><strong>Data:</strong> {despesa.dataDespesa}</p>
                        </div>
                        {podeExcluir && despesa.id !== undefined && (
                            <div className="flex shrink-0 flex-col justify-around h-full">
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