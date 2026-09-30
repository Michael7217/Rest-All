import { Link } from "react-router-dom"
import Logo from "../../assets/Logo.png"
import type {Itoogle} from "../../utils"
import { useAuth } from "../../hooks"
import { X } from "lucide-react"



export const Sidebar = ({isActive, toogle}: Itoogle) => {
    const {usuario} = useAuth()
    const inputclass = "cursor-pointer border-b-2 border-white w-[80%] pb-2 rounded-xs"

    return(
        <aside className={`${isActive ? "fixed" : "hidden"} z-100 h-screen w-[85%] max-w-xs rounded-r-4xl top-0 bg-red-500 md:max-w-none md:w-xs`}>
            <button
                type="button"
                aria-label="Fechar menu"
                onClick={toogle}
                className="absolute right-4 top-4 z-10 grid size-10 place-items-center text-white cursor-pointer"
            >
                <X size={24} />
            </button>
            <nav className="flex flex-col items-center h-full justify-start gap-10 pb-5">
            <div className="w-28 h-28 md:w-40 md:h-40">
                <img src={Logo} alt="logo"
                    className="w-28 h-28 md:w-40 md:h-40" />
            </div>
            <div className="flex flex-col gap-5 items-start w-full pl-4 md:pl-10
            font-light text-lg md:text-2xl text-white overflow-y-auto scrollbar-hidden">
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
                    <Link to="/meu-restaurante"
                        className={inputclass}
                        onClick={toogle}>Meu restaurante</Link>
                </>
                )}
            {(usuario?.perfil === "DONO") && (
                <Link to="/gerentes"
                className={inputclass}
                onClick={toogle}>Gerentes</Link>
                )}
            {(usuario?.perfil === "ADMINISTRADOR") && (
                <>
                    <Link to="/proprietarios"
                    className={inputclass}
                    onClick={toogle}>Proprietários</Link>
                    <Link to="/restaurantes"
                    className={inputclass}
                    onClick={toogle}>Restaurantes</Link>
                </>
                )}
            {usuario && <Link to="/perfil"
                className={inputclass}
                onClick={toogle}>Perfil</Link>}
            </div>
            </nav>
        </aside>
    )
}