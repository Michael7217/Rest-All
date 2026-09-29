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

export const Funcionarios = () => {
    const {isActive,handletoogle} = useToogle()
    const { usuario } = useAuth()
    const podeExcluir = usuario?.perfil === "GERENTE" || usuario?.perfil === "DONO"
    const [Funcionarios, setFuncionarios] = useState<Idadosretornados[]>()

    useEffect(() => {
        const carregarfuncionarios = async () => {
            const response = await metodosusuarios.ListarFuncionarios()
            if (typeof response !== "string") setFuncionarios(response)
        }
        carregarfuncionarios()
    }, [])

    const recarregar = async () => {
        const response = await metodosusuarios.ListarFuncionarios()
        if (typeof response !== "string") setFuncionarios(response)
    }
    const excluir = async (id: number) => {
        const response = await metodosusuarios.DeletarFuncionario(id)
        if (typeof response !== "string") await recarregar()
    }

    return (
        <>
            <Modal isActive={isActive} toogle={handletoogle} criar={metodosusuarios.RegistrarFuncionarios} campos={campos} aoCriar={recarregar} />
            <div className="relative flex w-full items-center mb-3.5">
                {!isActive && (
                    <button
                        onClick={handletoogle}
                        className="absolute right-0 shrink-0 cursor-pointer bg-white w-25 h-10 rounded-2xl border-2 border-red-500 text-red-500 font-bold"
                    >Adicionar</button>
                )}
                <h1 className="w-full truncate pr-4 text-center text-xl text-red-500 font-bold sm:text-2xl">
                    Funcionários
                </h1>
            </div>
            <section className="grid grid-cols-1 w-full gap-4 md:h-auto md:grid-cols-2 ">
                {Funcionarios?.map((funcionario) => (
                    <article key={funcionario.nome} className="record-card flex flex-col gap-2 rounded-2xl border-2 p-4 bg-red-500 text-white">
                        <div className="flex justify-between gap-2">
                            <div className="min-w-0 flex-1 wrap-break-words">
                                <h2 className="font-bold text-xl">{funcionario.nome}</h2>
                                <p><strong>Id: </strong>{`${funcionario.id}`}</p>
                                <p><strong>Cargo: </strong>{`${funcionario.cargo}`}</p>
                                <p><strong>Email: </strong> {funcionario.email}</p>
                                <p><strong>Telefone: </strong> {funcionario.telefone}</p>
                                <p><strong>Ativo: </strong>{funcionario.ativo ? "Sim" : "Não"}</p>
                            </div>
                            {podeExcluir && funcionario.id !== undefined && (
                                <button
                                    type="button"
                                    aria-label="Excluir funcionário"
                                    onClick={() => excluir(funcionario.id!)}
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