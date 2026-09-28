import { useEffect, useState } from "react"
import type { ICampoFormulario, Idespesa } from "../../utils"
import { Modal } from "../../components"
import { useAuth, useToogle } from "../../hooks"
import { Trash } from "lucide-react"
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

    return(
        <>
        <Modal isActive={isActive} toogle={handletoogle} criar={metodosdespesas.criar} campos={campos} aoCriar={recarregar}/>
        <div className="relative flex w-full items-center mb-3.5">
            {!isActive && (
                <button
                    onClick={handletoogle}
                    className="absolute right-0 cursor-pointer bg-white w-25 h-10 rounded-2xl border-2 border-red-500 text-red-500 font-bold"
                >Adicionar</button>
            )}
            <h1 className="w-full text-center text-2xl text-red-500 font-bold pr-4">
                Despesas
            </h1>
        </div>
        <div className="flex flex-col items-center">
            
            <section className="grid grid-cols-1 w-full gap-4 md:h-auto md:grid-cols-2 ">
                {Despesas.map((despesa) => (
                    <article key={`${despesa.id}`} className="flex space-y-2 rounded-2xl border-2 p-4 bg-red-500 text-white">
                        <div className="flex-2">
                            <strong className="text-xl">Valor: R$ {despesa.valor.toFixed(2)}</strong>
                            <h2 className="font-bold text-xl">{despesa.descricao}</h2>
                            <p>{despesa.categoria}</p>
                            <p><strong>Categoria:</strong> {despesa.dataDespesa}</p>
                            {/* <div className="flex w-full justify-center">
                            <button className="cursor-pointer bg-white w-25 h-10 rounded-2xl text-red-500 font-black">Adicionar</button>
                            </div> */}
                        </div>
                        {podeExcluir && despesa.id !== undefined && <div>
                            <button onClick={() => {excluir(despesa.id!)}} className="cursor-pointer"><Trash/></button>
                        </div>}
                    </article>
                ))}
                </section>
            </div>
        </>
    )
}