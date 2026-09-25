import { Link } from "react-router-dom"
import Logo from "../../assets/Logo.png"
import type {Itoogle} from "../../utils"
import { useDados } from "../../hooks"


export const Sidebar = ({isActive, toogle}: Itoogle) => {
    const {Dados} = useDados()


    return(
        <aside className={`${isActive ? "fixed" : "hidden"} h-screen top-0 w-2/5 md:w-xs`}>
            <nav className="flex flex-col items-center bg-red-500 h-full rounded-r-4xl justify-start gap-10">
            <div className="w-40 h-40">
                <img src={Logo} alt="logo"
                    className="w-40 h-40" />
            </div>
            <div className="flex flex-col gap-8 items-start w-full pl-10
            font-light text-2xl text-white">
            <Link to="/"
                className="cursor-pointer"
                onClick={toogle}>Home</Link>
            <Link to="/cardapio" 
                className="cursor-pointer"
                onClick={toogle}>Cardápio</Link>
            <Link to="/comandas" 
                className="cursor-pointer"
                onClick={toogle}>Comandas</Link>
            <Link to="/pedidos"
                className="cursor-pointer"
                onClick={toogle}>Pedidos
            </Link>
            {(Dados?.perfil === "GERENTE" || Dados?.perfil === "DONO" || Dados?.perfil === "ADMINISTRADOR") && (
            <Link to="/funcionarios"
                className="cursor-pointer"
                onClick={toogle}>Funcionários</Link>
                )}
            {(Dados?.perfil === "GERENTE" || Dados?.perfil === "DONO" || Dados?.perfil === "ADMINISTRADOR") && (
            <Link to="/despesas"
                className="cursor-pointer"
                onClick={toogle}>Despesas</Link>
                )}
            <Link to="/perfil"
                className="cursor-pointer"
                onClick={toogle}>Perfil</Link>
            </div>
            </nav>
        </aside>
    )
}