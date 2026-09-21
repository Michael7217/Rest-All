import { useEffect, useState } from "react"
import Logo from "../../assets/Logo.png"
import { metodosbuscadados } from "../../services"
import { type Idadosretornados } from "../../utils/interfaces/Idadosretornados"


export const Perfil = () => {
    const [Dados, setDados] = useState<Idadosretornados>()
    useEffect(() => {
            const Dadosuser = async () => {
                const response = await metodosbuscadados.buscardados()
                if (typeof response === "string") {
                    return
                }else{
                    setDados(response)
                }
            }
            Dadosuser()
        }, [])
    return(
        <>
        <div className="flex flex-col bg-red-500 rounded-2xl mx-2 w-auto max-w-full overflow-hidden">
        <div className="flex justify-center my-5">
            <img className="rounded-full w-1/5 h-1/5 border-2 border-white" src={Logo} alt="" />
        </div>
        <div className="mb-8 text-white [&_h1]:ml-8 [&_h1]:py-2 [&_h3]:mx-10 [&_h3]:pb-2 [&_h3]:border-b-2">
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