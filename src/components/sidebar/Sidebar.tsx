import { Link } from "react-router-dom"
import Logo from "../../assets/Logo.png"
import type {Itoogle} from "../../utils"
import { useAuth } from "../../hooks"



export const Sidebar = ({isActive, toogle}: Itoogle) => {
    const {usuario} = useAuth()
    const inputclass = "cursor-pointer border-b-2 border-white w-[80%] pb-2 rounded-xs"

    return(
        <aside className={`${isActive ? "fixed" : "hidden"} h-screen bg-red-500 rounded-r-4xl top-0 w-2/5 md:w-xs`}>
            <nav className="flex flex-col items-center h-full justify-start gap-10 pb-5">
            <div className="w-40 h-40">
                <img src={Logo} alt="logo"
                    className="w-40 h-40" />
            </div>
            <div className="flex flex-col gap-5 items-start w-full pl-10
            font-light text-2xl text-white overflow-y-auto scrollbar-hidden">
            <Link to="/"
                className={inputclass}
                onClick={toogle}>Home</Link>
            <Link to="/cardapio" 
                className={inputclass}
                onClick={toogle}>Cardápio</Link>
            {(usuario?.perfil === "GERENTE" || usuario?.perfil === "FUNCIONARIO" || usuario?.perfil === "DONO") && (
                <>
                    <Link to="/comandas" 
                        className={inputclass}
                        onClick={toogle}>Comandas</Link>
                    <Link to="/pedidos"
                        className={inputclass}
                        onClick={toogle}>Pedidos
                    </Link>
                </>
                )}
            
            {(usuario?.perfil === "GERENTE" || usuario?.perfil === "DONO") && (
                <>  
                    <Link to="/dashboard"
                        className={inputclass}
                        onClick={toogle}>Dashboard</Link>
                    <Link to="/funcionarios"
                        className={inputclass}
                        onClick={toogle}>Funcionários</Link>
                    <Link to="/estoque"
                        className={inputclass}
                        onClick={toogle}>Estoque</Link>
                    <Link to="/despesas"
                        className={inputclass}
                        onClick={toogle}>Despesas</Link>
                </>
                )}
            {(usuario?.perfil === "DONO") && (
                <Link to="/gerentes"
                className={inputclass}
                onClick={toogle}>Gerentes</Link>
                )}
            {(usuario?.perfil === "ADMINISTRADOR") && (
                <Link to="/proprietarios"
                className={inputclass}
                onClick={toogle}>Proprietarios</Link>
                )}
            {usuario && <Link to="/perfil"
                className={inputclass}
                onClick={toogle}>Perfil</Link>}
            </div>
            </nav>
        </aside>
    )
}