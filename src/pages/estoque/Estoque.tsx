import { useEffect, useState } from "react"
import type { ICampoFormulario, Iestoque } from "../../utils"
import { Modal } from "../../components"
import { useAuth, useToogle } from "../../hooks"
import { Trash } from "lucide-react"
import { metodosestoque } from "../../services/metodos/Metodosestoque"

const campos: ICampoFormulario[] = [
    { nome: "nomeproduto", rotulo: "Nome do Produto", placeholder: "ex: Sal"},
    { nome: "dataValidade", rotulo: "Data de Validade", placeholder: "ex: 00/00/0000" },
    { nome: "unidadeMedida", rotulo: "Unidade de Medida", placeholder: "ex: Kg" },
    { nome: "quantidade", rotulo: "Quantidade", tipo: "number", placeholder: "ex: 1", parse: (valor) => Number(valor) },
    { nome: "precounitario", rotulo: "Preço Unitário", tipo: "number", placeholder: "ex: 1.00", parse: (valor) => Number(valor) }
]


export const Estoque = () => {
    const [Estoque, setEstoque] = useState<Iestoque[]>([])
    const {isActive, handletoogle} = useToogle()
    const { usuario } = useAuth()
    const podeExcluir = usuario?.perfil === "GERENTE" || usuario?.perfil === "DONO"

    useEffect(() => {
        const carregarcardapio = async () => {
            const response = await metodosestoque.listar()
            if (typeof response !== "string"){
                setEstoque(response)
            }
        }
        carregarcardapio()
    }, [])

    const recarregar = async () => {
        const response = await metodosestoque.listar()
        if (typeof response !== "string"){
            setEstoque(response)
        }
    }
    const excluir = async (id: number) => {
        const response = await metodosestoque.deletar(id)
        if (typeof response !== "string") await recarregar()
    }

    return(
        <>
        <Modal isActive={isActive} toogle={handletoogle} criar={metodosestoque.criar} campos={campos} aoCriar={recarregar}/>
        <div className="relative flex w-full items-center mb-3.5">
            {!isActive && (
                <button
                    onClick={handletoogle}
                    className="absolute right-0 shrink-0 cursor-pointer bg-white w-25 h-10 rounded-2xl border-2 border-red-500 text-red-500 font-bold"
                >Adicionar</button>
            )}
            <h1 className="w-full truncate pr-4 text-center text-xl text-red-500 font-bold sm:text-2xl">
                Estoque
            </h1>
        </div>
        <div className="flex flex-col items-center">
            
            <section className="grid grid-cols-1 w-full gap-4 md:h-auto md:grid-cols-2 ">
                {Estoque.map((produto) => (
                    <article key={`${produto.id}-${produto.nomeProduto}`} className="record-card flex items-start justify-between gap-3 rounded-2xl border-2 p-4 bg-red-500 text-white">
                        <div className="min-w-0 flex-1 wrap-break-word">
                            <p>Id: {produto.id}</p>
                            <h2 className="font-bold text-xl">{produto.nomeProduto}</h2>
                            <p>{produto.quantidade}</p>
                            <strong className="text-xl">R$ {produto.precoUnitario.toFixed(2)}</strong>
                            <p><strong>Categoria:</strong> {produto.dataValidade}</p>
                            <p>{produto.unidadeMedida}</p>
                        </div>
                        {podeExcluir && produto.id !== undefined && <div className="shrink-0">
                            <button onClick={() => {excluir(produto.id!)}} className="cursor-pointer"><Trash/></button>
                        </div>}
                    </article>
                ))}
                </section>
            </div>
        </>
    )
}