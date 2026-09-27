import { useEffect, useState } from "react"
import { Modal } from "../../components"
import type { ICampoFormulario, IComanda } from "../../utils"
import { useAuth, useToogle } from "../../hooks"
import { metodoscomandas } from "../../services"
import { Trash } from "lucide-react"

const campos: ICampoFormulario[] = [
    { nome: "numero", rotulo: "Número", placeholder: "ex: 1" },
    { nome: "mesa", rotulo: "Mesa", placeholder: "ex: 1" },
    { nome: "status", rotulo: "status", placeholder: "ex: Aberta", parse: (valor) => valor.trim().toLowerCase() === "aberta" }
]
export const Comandas = () => {
    const [Comandas, setComandas] = useState<IComanda[]>([])
    const {isActive, handletoogle} = useToogle()
    const { usuario } = useAuth()
    const podeExcluir = usuario?.perfil === "GERENTE" || usuario?.perfil === "DONO"
    useEffect(() => {
        const carregarComandas = async () => {
            const response = await metodoscomandas.listar()
            if (typeof response !== "string"){
                setComandas(response)
            }
        }
        carregarComandas()
    }, [])
    
    const recarregar = async () => {
            const response = await metodoscomandas.listar()
            if (typeof response !== "string"){
                setComandas(response)
            }
        }
    const excluir = async (id: number) => {
        const response = await metodoscomandas.deletar(id)
        if (typeof response !== "string") await recarregar()
    }

    return (
        <>
        <Modal isActive={isActive} toogle={handletoogle} criar={metodoscomandas.criar} campos={campos} aoCriar={recarregar}/>
        <div className="relative flex w-full items-center mb-3.5">
            {!isActive && (
                <button
                    onClick={handletoogle}
                    className="absolute right-0 cursor-pointer bg-white w-25 h-10 rounded-2xl border-2 border-red-500 text-red-500 font-bold"
                >Adicionar</button>
            )}
            <h1 className="w-full text-center text-2xl text-red-500 font-bold pr-4">
                Comandas
            </h1>
        </div>
        <div className="flex flex-col items-center">
            
            <section className="grid grid-cols-1 w-full gap-4 md:h-auto md:grid-cols-2 ">
                {Comandas.map((comanda) => (
                    <article key={comanda.id} className="flex space-y-2 rounded-2xl border-2 p-4 bg-red-500 text-white">
                        <div className="flex-2">
                        <h2 className="font-bold text-xl">Comanda: {comanda.numero}</h2>
                        <p>Mesa: {comanda.mesa}</p>
                        <strong className="text-xl">Total: R$ {comanda.valorTotal.toFixed(2)}</strong>
                        <p>ID Funcionário: {comanda.funcionarioId}</p>
                        <p>Status: {comanda.status ? "Aberta" : "Fechada"}</p>
                        <p>Data de abertura: {comanda.dataAbertura}</p>
                        <p>Data de fechamento{comanda.dataFechamento}</p>
                        {/* <div className="flex w-full justify-center">
                        <button className="cursor-pointer bg-white w-25 h-10 rounded-2xl text-red-500 font-black">Adicionar</button>
                        </div> */}
                        </div>
                        {podeExcluir && comanda.id !== undefined && <div>
                            <button onClick={()=> excluir(comanda.id!)} className="cursor-pointer"><Trash/></button>
                        </div>}
                    </article>
                ))}
                </section>
            </div>
        </>
    )
}