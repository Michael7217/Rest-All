import { useEffect, useState } from "react"
import Logo from "../../assets/Logo.png"
import { metodosbuscadados } from "../../services"
import type { ICampoFormulario } from "../../utils"
import type { Idadosretornados } from "../../utils/interfaces/Idadosretornados"
import { Pen } from "lucide-react"
import { useToogle } from "../../hooks"
import { Modal } from "../../components"
import { metodosusuarios } from "../../services/metodos/Metodosusuarios"

const camposPerfil: ICampoFormulario[] = [
    { nome: "id", rotulo: "ID", placeholder: "ID do usuário", tipo: "number", somenteLeitura: true },
    { nome: "nome", rotulo: "Nome", placeholder: "Nome completo" },
    { nome: "cpf", rotulo: "CPF", placeholder: "CPF" },
    { nome: "email", rotulo: "E-mail", placeholder: "E-mail", regex: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/ },
    { nome: "cargo", rotulo: "Cargo", placeholder: "Cargo" },
    { nome: "telefone", rotulo: "Telefone", placeholder: "Telefone" },
    { nome: "perfil", rotulo: "Perfil", placeholder: "Perfil da conta", somenteLeitura: true },
    { nome: "restauranteId", rotulo: "Restaurante", placeholder: "ID do restaurante", tipo: "number", somenteLeitura: true },
    { nome: "ativo", rotulo: "Situação da conta", placeholder: "Situação", somenteLeitura: true },
]

export const Perfil = () => {
    const [Dados, setDados] = useState<Idadosretornados>()
    const { isActive, handletoogle } = useToogle()

    const recarregar = async () => {
        const response = await metodosbuscadados.buscardados()
        if (typeof response !== "string") setDados(response)
    }

    useEffect(() => {
        let ativo = true
        metodosbuscadados.buscardados().then((response) => {
            if (ativo && typeof response !== "string") setDados(response)
        })

        return () => {
            ativo = false
        }
    }, [])

    const atualizarPerfil = (dados: Partial<Idadosretornados>) => {
        if (Dados?.id === undefined) return Promise.resolve("ID do perfil não encontrado")
        return metodosusuarios.EditarPerfil(Dados.id, { ...Dados, ...dados })
    }

    return(
        <>
            <Modal
                key={`${isActive}-${Dados?.id ?? "perfil"}`}
                isActive={isActive}
                toogle={handletoogle}
                atualizar={atualizarPerfil}
                valoresIniciais={Dados ? { ...Dados, ativo: Dados.ativo ? "Ativo" : "Inativo" } : undefined}
                modoEdicao
                campos={camposPerfil}
                aoCriar={recarregar}
                textoBotao="Salvar perfil"
            />
            <div className="flex flex-col bg-red-500 rounded-2xl mx-2 w-auto max-w-full overflow-hidden">
            <div className="flex justify-center my-5">
                <img className="rounded-full w-1/5 h-1/5 border-2 border-white" src={Logo} alt="" />
                <button
                    type="button"
                    aria-label="Editar perfil"
                    title="Editar perfil"
                    onClick={handletoogle}
                    className="ml-4 grid size-10 place-items-center self-center rounded-full bg-white text-red-500 cursor-pointer"
                >
                    <Pen size={20} />
                </button>
            </div>
            <div className="mb-8 text-white [&_h1]:ml-4 sm:[&_h1]:ml-8 [&_h1]:py-2 [&_h3]:mx-4 sm:[&_h3]:mx-10 [&_h3]:pb-2 [&_h3]:border-b-2">
                {Dados?.nome && (
                    <div>
                        <h1 className="text-start font-bold">Nome do Usuário</h1>
                        <h3>{Dados?.nome}</h3>
                    </div>)}
                {Dados?.cargo && (
                    <div>
                        <h1 className="text-start font-bold ">Cargo</h1>
                        <h3>{Dados?.cargo}</h3>
                    </div>
                )}
                {Dados?.cpf && (
                    <div>
                        <h1 className="text-start font-bold ">CPF</h1>
                        <h3>{Dados?.cpf}</h3>
                    </div>
                )}
                <h1 className="text-start font-bold ">Perfil</h1>
                    <h3>{Dados?.perfil}</h3>
                <h1 className="text-start font-bold ">Email</h1>
                    <h3>{Dados?.email}</h3>

                {Dados?.telefone && (
                    <div>
                        <h1 className="text-start  font-bold">Telefone</h1>
                        <h3>{Dados?.telefone}</h3>
                    </div>
                )}
                {Dados?.restauranteId && (
                    <div>
                        <h1 className="text-start  font-bold ">Restaurante</h1>
                    <h3>{Dados?.restauranteId}</h3>
                    </div>
                )}
                
                <h1 className="text-start font-bold ">Ativo</h1>
                    <h3>{Dados?.ativo ? "Sim" : "Não"}</h3>
            </div>
            </div>
        </>
    )
}