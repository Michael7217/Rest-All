import { useEffect, useState } from "react"
import { Modal } from "../../components"
import { useToogle } from "../../hooks"
import { metodosusuarios } from "../../services/metodos/Metodosusuarios"
import type { ICampoFormulario } from "../../utils"
import type { Idadosretornados } from "../../utils/interfaces/Idadosretornados"
import { Trash } from "lucide-react"

const campos: ICampoFormulario[] = [
    { nome: "nome", rotulo: "Nome", placeholder: "nome" },
    { nome: "cpf", rotulo: "CPF", placeholder: "ex: 999999999-99" },
    { nome: "email", rotulo: "Email", placeholder: "example@example.com", regex: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/ },
    { nome: "senha", rotulo: "Senha", placeholder: "6 Digitos", regex: /^.{6,}$/ },
    { nome: "cargo", rotulo: "Cargo", placeholder: "ex: Proprietário" },
    { nome: "telefone", rotulo: "Telefone", placeholder: "ex: 99 999999999" },
    { nome: "restauranteId", rotulo: "ID do Restaurante", tipo: "number", placeholder: "ex: 1", parse: (valor) => Number(valor) },
]

export const Proprietarios = () => {
    const { isActive, handletoogle } = useToogle()
    const [proprietarios, setProprietarios] = useState<Idadosretornados[]>([])

    useEffect(() => {
        const carregarProprietarios = async () => {
            const response = await metodosusuarios.ListarProprietarios()
            if (typeof response !== "string") setProprietarios(response)
        }
        carregarProprietarios()
    }, [])

    const recarregar = async () => {
        const response = await metodosusuarios.ListarProprietarios()
        if (typeof response !== "string") setProprietarios(response)
    }

    const excluir = async (id: number) => {
        const response = await metodosusuarios.DeletarProprietario(id)
        if (typeof response !== "string") await recarregar()
    }

    return (
        <>
            <Modal
                isActive={isActive}
                toogle={handletoogle}
                criar={metodosusuarios.RegistrarProprietario}
                campos={campos}
                aoCriar={recarregar}
            />
            <div className="relative mb-3.5 flex w-full items-center">
                {!isActive && (
                    <button
                        type="button"
                        onClick={handletoogle}
                        className="absolute right-0 h-10 w-25 shrink-0 cursor-pointer rounded-2xl border-2 border-red-500 bg-white font-bold text-red-500"
                    >Adicionar</button>
                )}
                <h1 className="w-full truncate pr-4 text-center text-xl font-bold text-red-500 sm:text-2xl">
                    Proprietários
                </h1>
            </div>
            <section className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
                {proprietarios.map((proprietario) => (
                    <article key={proprietario.id ?? proprietario.email} className="record-card flex flex-col gap-2 rounded-2xl border-2 bg-red-500 p-4 text-white">
                        <div className="flex justify-between gap-2">
                            <div className="min-w-0 flex-1 wrap-break-word">
                                <h2 className="text-xl font-bold">{proprietario.nome}</h2>
                                <p><strong>Id: </strong>{proprietario.id}</p>
                                <p><strong>CPF: </strong>{proprietario.cpf}</p>
                                <p><strong>Email: </strong>{proprietario.email}</p>
                                <p><strong>Telefone: </strong>{proprietario.telefone}</p>
                                <p><strong>Restaurante: </strong>{proprietario.restauranteId}</p>
                                <p><strong>Ativo: </strong>{proprietario.ativo ? "Sim" : "Não"}</p>
                            </div>
                            {proprietario.id !== undefined && (
                                <button
                                    type="button"
                                    aria-label="Excluir proprietário"
                                    title="Excluir proprietário"
                                    onClick={() => excluir(proprietario.id!)}
                                    className="shrink-0 cursor-pointer self-start"
                                >
                                    <Trash />
                                </button>
                            )}
                        </div>
                    </article>
                ))}
            </section>
        </>
    )
}