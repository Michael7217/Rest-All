import { useEffect, useState } from "react"
import { Modal } from "../../components"
import { useToast, useToogle } from "../../hooks"
import { metodosusuarios } from "../../services/metodos/Metodosusuarios"
import type { ICampoFormulario } from "../../utils"
import type { Idadosretornados } from "../../utils/interfaces/Idadosretornados"
import { Trash } from "lucide-react"

const campos: ICampoFormulario[] = [
    { nome: "nomeRestaurante", rotulo: "Nome do Restaurante", placeholder: "ex: Nome do Restaurante" },
    { nome: "cnpj", rotulo: "CNPJ", placeholder: "ex: 999999999-99" },
    { nome: "nome", rotulo: "Nome", placeholder: "nome" },
    { nome: "cpf", rotulo: "CPF", placeholder: "ex: 999999999-99" },
    { nome: "email", rotulo: "Email", placeholder: "example@example.com", regex: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/ },
    { nome: "senha", rotulo: "Senha", placeholder: "6 Digitos", regex: /^.{6,}$/ },
    { nome: "telefone", rotulo: "Telefone", placeholder: "ex: 99 999999999" },
]

export const Proprietarios = () => {
    const { isActive, handletoogle } = useToogle()
    const { showToast } = useToast()
    const [proprietarios, setProprietarios] = useState<Idadosretornados[]>([])

    useEffect(() => {
        const carregarProprietarios = async () => {
            const response = await metodosusuarios.ListarProprietarios()
            if (typeof response === "string") {
                showToast(response, "error")
                return
            }
            setProprietarios(response)
        }
        carregarProprietarios()
    }, [showToast])

    const recarregar = async () => {
        const response = await metodosusuarios.ListarProprietarios()
        if (typeof response === "string") {
            showToast(response, "error")
            return
        }
        setProprietarios(response)
    }

    const excluir = async (id: number) => {
        const response = await metodosusuarios.DeletarProprietario(id)
        if (typeof response === "string") {
            showToast(response, "error")
            return
        }
        await recarregar()
    }

    return (
        <>
            <Modal
                key={String(isActive)}
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
                    <article key={proprietario.id ?? proprietario.email} className="record-card flex flex-col gap-2 rounded-2xl border-2 border-red-500 bg-red-500 p-4 text-white transition-colors hover:bg-white hover:text-red-500">
                        <div className="flex justify-between gap-2">
                            <div className="min-w-0 flex-1 wrap-break-word">
                                <h2 className="text-lg font-bold">{proprietario.nome}</h2>
                                <p className="text-sm"><strong>CPF:</strong> {proprietario.cpf}</p>
                                <p className="text-sm"><strong>E-mail:</strong> {proprietario.email}</p>
                                <p className="text-sm"><strong>Telefone:</strong> {proprietario.telefone}</p>
                                <p className="text-sm"><strong>Restaurante:</strong> {proprietario.restauranteId}</p>
                                <p className="text-sm"><strong>Situação:</strong> {proprietario.ativo ? "Ativo" : "Inativo"}</p>
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