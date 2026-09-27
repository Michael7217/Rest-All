import { useEffect, useState } from "react"
import { useAuth, useToogle } from "../../hooks"
import { Modal } from "../../components"
import { metodosusuarios } from "../../services/metodos/Metodosusuarios"
import type { Idadosretornados } from "../../utils/interfaces/Idadosretornados"
import type { ICampoFormulario } from "../../utils"
import { Trash } from "lucide-react"

const campos: ICampoFormulario[] = [
    { nome: "nome", rotulo: "Nome", placeholder: "nome" },
    { nome: "cpf", rotulo: "CPF", placeholder: "ex: 999999999-99", },
    { nome: "email", rotulo: "Email", placeholder: "example@example.com", regex: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/ },
    { nome: "senha", rotulo: "senha", placeholder: "6 Digitos", regex: /^.{6,}$/ },
    { nome: "cargo", rotulo: "Cargo", placeholder: "ex: Garçom/Cozinheiro/Estoquista" },
    { nome: "telefone", rotulo: "Telefone", placeholder: "ex: 99 999999999"},
    { nome: "restauranteId", rotulo: "ID do Restaurante", tipo: "number", placeholder: "ex: 1", parse: (valor) => Number(valor) },
]

export const Gerentes = () => {
    const {isActive,handletoogle} = useToogle()
    const { usuario } = useAuth()
    const podeExcluir = usuario?.perfil === "DONO"
    const [Gerentes, setGerentes] = useState<Idadosretornados[]>()

    useEffect(() => {
        const carregargerentes = async () => {
            const response = await metodosusuarios.ListarGerentes()
            if (typeof response !== "string") setGerentes(response)
        }
        carregargerentes()
    }, [])

    const recarregar = async () => {
        const response = await metodosusuarios.ListarGerentes()
        if (typeof response !== "string") setGerentes(response)
    }
    const excluir = async (id: number) => {
        const response = await metodosusuarios.DeletarGerente(id)
        if (typeof response !== "string") await recarregar()
    }

    return (
        <>
            <Modal isActive={isActive} toogle={handletoogle} criar={metodosusuarios.RegistrarGerentes} campos={campos} aoCriar={recarregar} />
            <div className="relative flex w-full items-center mb-3.5">
                {!isActive && (
                    <button
                        onClick={handletoogle}
                        className="absolute right-0 cursor-pointer bg-white w-25 h-10 rounded-2xl border-2 border-red-500 text-red-500 font-bold"
                    >Adicionar</button>
                )}
                <h1 className="w-full text-center text-2xl text-red-500 font-bold pr-4">
                    Gerentes
                </h1>
            </div>
            <section className="grid grid-cols-1 w-full gap-4 md:h-auto md:grid-cols-2 ">
                {Gerentes?.map((gerente) => (
                    <article key={gerente.nome} className="flex flex-col gap-2 rounded-2xl border-2 p-4 bg-red-500 text-white">
                        <div className="flex justify-between gap-2">
                            <div className="min-w-0 flex-1">
                                <h2 className="font-bold text-xl">{gerente.nome}</h2>
                                <p><strong>Id: </strong>{`${gerente.id}`}</p>
                                <p><strong>Cargo: </strong>{`${gerente.perfil}`}</p>
                                <p><strong>CPF: </strong>{`${gerente.cpf}`}</p>
                                <p><strong>Email: </strong> {gerente.email}</p>
                                <p><strong>Telefone: </strong> {gerente.telefone}</p>
                                <p><strong>Ativo: </strong>{gerente.ativo ? "Sim" : "Não"}</p>
                            </div>
                            {podeExcluir && gerente.id !== undefined && (
                                <button
                                    type="button"
                                    aria-label="Excluir gerente"
                                    onClick={() => excluir(gerente.id!)}
                                    className="cursor-pointer"
                                >
                                    <Trash />
                                </button>
                            )}
                        </div>
                        {/* <div className="flex w-full justify-center">
                        <button className="cursor-pointer bg-white w-25 h-10 rounded-2xl text-red-500 font-black">Adicionar</button>
                        </div> */}
                    </article>
                ))}
                </section>
        </>
    )
}