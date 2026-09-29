import { useEffect, useState } from "react"
import { useAuth, useToogle } from "../../hooks"
import { Modal } from "../../components"
import { metodosusuarios } from "../../services/metodos/Metodosusuarios"
import type { Idadosretornados } from "../../utils/interfaces/Idadosretornados"
import type { ICampoFormulario, Iregistro } from "../../utils"
import { PenIcon, Trash } from "lucide-react"

const campos: ICampoFormulario[] = [
    { nome: "nome", rotulo: "Nome", placeholder: "nome" },
    { nome: "cpf", rotulo: "CPF", placeholder: "ex: 999999999-99", },
    { nome: "email", rotulo: "Email", placeholder: "example@example.com", regex: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/ },
    { nome: "senha", rotulo: "senha", placeholder: "6 Digitos", regex: /^.{6,}$/ },
    { nome: "cargo", rotulo: "Cargo", placeholder: "ex: Garçom/Cozinheiro/Estoquista" },
    { nome: "telefone", rotulo: "Telefone", placeholder: "ex: 99 999999999"},
    { nome: "restauranteId", rotulo: "ID do Restaurante", tipo: "number", placeholder: "ex: 1", parse: (valor) => Number(valor) },
]

const camposEdicao: ICampoFormulario[] = [
    { nome: "nome", rotulo: "Nome", placeholder: "nome" },
    { nome: "cpf", rotulo: "CPF", placeholder: "ex: 999999999-99" },
    { nome: "email", rotulo: "Email", placeholder: "example@example.com", regex: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/ },
    { nome: "cargo", rotulo: "Cargo", placeholder: "ex: Gerente" },
    { nome: "telefone", rotulo: "Telefone", placeholder: "ex: 99 999999999" },
    { nome: "restauranteId", rotulo: "ID do Restaurante", tipo: "number", placeholder: "ex: 1", parse: (valor) => Number(valor) },
]

export const Gerentes = () => {
    const {isActive,handletoogle} = useToogle()
    const { usuario } = useAuth()
    const podeGerenciar = usuario?.perfil === "DONO"
    const [Gerentes, setGerentes] = useState<Idadosretornados[]>()
    const [gerenteEmEdicao, setGerenteEmEdicao] = useState<Idadosretornados | null>(null)

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

    const fecharModal = () => {
        setGerenteEmEdicao(null)
        handletoogle()
    }

    const editarGerente = (dados: Iregistro) => {
        if (gerenteEmEdicao?.id === undefined) return Promise.resolve("Gerente sem ID")
        return metodosusuarios.EditarGerente(gerenteEmEdicao.id, dados)
    }

    return (
        <>
            <Modal
                key={`${isActive}-${gerenteEmEdicao?.id ?? "novo"}`}
                isActive={isActive}
                toogle={fecharModal}
                criar={metodosusuarios.RegistrarGerentes}
                atualizar={editarGerente}
                valoresIniciais={gerenteEmEdicao ?? undefined}
                modoEdicao={gerenteEmEdicao !== null}
                campos={gerenteEmEdicao ? camposEdicao : campos}
                aoCriar={recarregar}
            />
            <div className="relative flex w-full items-center mb-3.5">
                {!isActive && (
                    <button
                        onClick={() => {
                            setGerenteEmEdicao(null)
                            handletoogle()
                        }}
                        className="absolute right-0 shrink-0 cursor-pointer bg-white w-25 h-10 rounded-2xl border-2 border-red-500 text-red-500 font-bold"
                    >Adicionar</button>
                )}
                <h1 className="w-full truncate pr-4 text-center text-xl text-red-500 font-bold sm:text-2xl">
                    Gerentes
                </h1>
            </div>
            <section className="grid grid-cols-1 w-full gap-4 md:h-auto md:grid-cols-2 ">
                {Gerentes?.map((gerente) => (
                    <article key={gerente.nome} className="record-card flex flex-col gap-2 rounded-2xl border-2 p-4 bg-red-500 text-white">
                        <div className="flex justify-between gap-2">
                            <div className="min-w-0 flex-1 wrap-break-word">
                                <h2 className="font-bold text-xl">{gerente.nome}</h2>
                                <p><strong>Id: </strong>{`${gerente.id}`}</p>
                                <p><strong>Cargo: </strong>{`${gerente.perfil}`}</p>
                                <p><strong>CPF: </strong>{`${gerente.cpf}`}</p>
                                <p><strong>Email: </strong> {gerente.email}</p>
                                <p><strong>Telefone: </strong> {gerente.telefone}</p>
                                <p><strong>Ativo: </strong>{gerente.ativo ? "Sim" : "Não"}</p>
                            </div>
                            {podeGerenciar && gerente.id !== undefined && (
                                <div className="flex shrink-0 flex-col justify-around gap-3">
                                    <button
                                        type="button"
                                        aria-label="Editar gerente"
                                        title="Editar gerente"
                                        onClick={() => {
                                            setGerenteEmEdicao(gerente)
                                            handletoogle()
                                        }}
                                        className="cursor-pointer"
                                    >
                                        <PenIcon />
                                    </button>
                                    <button
                                        type="button"
                                        aria-label="Excluir gerente"
                                        title="Excluir gerente"
                                        onClick={() => excluir(gerente.id!)}
                                        className="cursor-pointer"
                                    >
                                        <Trash />
                                    </button>
                                </div>
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