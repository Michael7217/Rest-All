import { useEffect, useState } from "react"
import type { ICampoFormulario, Icardapio } from "../../utils"
import { metodoscardapio } from "../../services"
import { Modal } from "../../components"
import { useAuth, useToogle } from "../../hooks"
import { Trash } from "lucide-react"

const campos: ICampoFormulario[] = [
    { nome: "nome", rotulo: "Nome", placeholder: "ex: vatapá" },
    { nome: "descricao", rotulo: "Descrição", placeholder: "prato da culinária paraense" },
    { nome: "categoria", rotulo: "Categoria", placeholder: "prato completo" },
    { nome: "preco", rotulo: "Preço", tipo: "number", placeholder: "ex: 20.0", parse: (valor) => Number(valor) },
    { nome: "disponivel", rotulo: "Disponibilidade", placeholder: "ex: Sim/Não", parse: (valor) => valor.trim().toLowerCase() === "sim" },
    { nome: "imagem", rotulo: "Imagem", placeholder: "ex: example.com/image" },
]


export const Cardapio = () => {
    const [Cardapio, setCardapio] = useState<Icardapio[]>([])
    const {isActive, handletoogle} = useToogle()
    const {usuario, islogged} = useAuth()
    const podeExcluir = usuario?.perfil === "GERENTE" || usuario?.perfil === "DONO"

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
    const excluir = async (id: number) =>{
        const duplicados = Cardapio.filter((prato) => prato.id === id)
        for (let i = 0; i < duplicados.length; i++) {
            const response = await metodoscardapio.deletar(id)
            if (typeof response === "string") {
                return
            }
            
        }
        recarregar()
        }

    return(
        <>
        <Modal isActive={isActive} toogle={handletoogle} criar={metodoscardapio.criar} campos={campos} aoCriar={recarregar}/>
        <div className="relative flex w-full items-center mb-3.5">
            {!isActive && islogged && (
                <button
                    onClick={handletoogle}
                    className="absolute right-0 cursor-pointer bg-white w-25 h-10 rounded-2xl border-2 border-red-500 text-red-500 font-bold"
                >Adicionar</button>
            )}
            <h1 className="w-full text-center text-2xl text-red-500 font-bold pr-4">
                Cardápio
            </h1>
        </div>
        <div className="flex flex-col items-center">
            
            <section className="grid grid-cols-1 w-full gap-4 md:h-auto md:grid-cols-2 ">
                {Cardapio.map((prato) => (
                    <article key={`${prato.id}-${prato.nome}`} className="flex flex-col gap-2 rounded-2xl border-2 p-4 bg-red-500 text-white">
                        {prato.imagem && (
                            <img
                                src={prato.imagem}
                                alt={prato.nome}
                                className="block h-40 w-full object-cover object-center rounded-2xl mb-2" 
                            />
                        )}
                        <div className="flex justify-between gap-2">
                            <div className="min-w-0 flex-1">
                                {islogged && <p>Id: {prato.id}</p>}
                                <h2 className="font-bold text-xl">Nome: {prato.nome}</h2>
                                <p><strong>Descrição:</strong> {prato.descricao}</p>
                                <strong className="text-xl">R$ {prato.preco.toFixed(2)}</strong>
                                <p><strong>Categoria:</strong> {prato.categoria}</p>
                                <p><strong>Disponibilidade:</strong> {prato.disponivel ? "Disponível" : "Indisponível"}</p>
                            </div>
                            {podeExcluir && prato.id !== undefined && (
                                <button onClick={() => {excluir(prato.id!)}} className="cursor-pointer"><Trash/></button>
                            )}
                            
                        </div>
                    </article>
                ))}
                </section>
            </div>
        </>
    )
}