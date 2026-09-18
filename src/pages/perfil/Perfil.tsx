import Logo from "../../assets/Logo.png"
import { useAuth } from "../../hooks"

export const Perfil = () => {
    const {usuario} = useAuth()
    return(
        <>
        <div className="flex flex-col bg-red-500 rounded-2xl m-8 w-auto">
        <div className="flex justify-center my-5">
            <img className="rounded-full w-1/5 h-1/5 border-2 border-white" src={Logo} alt="" />
        </div>
        <div className="mb-8 overflow-visible text-white [&_h1]:ml-8 [&_h1]:py-2 [&_h3]:mx-10 [&_h3]:pb-2 [&_h3]:border-b-2">
            <h1 className="text-start font-bold">Nome do Usuario</h1>
                <h3>{usuario!.nome}</h3>
            <h1 className="text-start font-bold ">Cargo</h1>
                <h3>{usuario!.cargo}</h3>
            <h1 className="text-start font-bold ">Email</h1>
                <h3>{usuario!.email}</h3>
            <h1 className="text-start  font-bold">Telefone</h1>
                <h3>{usuario!.telefone}</h3>
            <h1 className="text-start  font-bold ">CPF</h1>
                <h3>{usuario!.cpf}</h3>
            <h1 className="text-start font-bold ">Ativo</h1>
                <h3>{usuario!.ativo ? "Sim" : "Não"}</h3>
        </div>
        </div>
        </>
    )
}