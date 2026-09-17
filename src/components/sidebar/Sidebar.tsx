import { Link } from "react-router-dom"
import Logo from "../../assets/Logo.png"
import type {Itoogle} from "../../utils"

export const Sidebar = ({isactivesidebar, toogle}: Itoogle) => {
    return(
        <aside className={`${isactivesidebar ? "fixed" : "hidden"} h-screen top-0`}>
            <nav className="flex flex-col items-center w-xs bg-red-500 h-full rounded-r-4xl justify-start gap-10">
            <div className="w-40 h-40">
                <img src={Logo} alt="logo"
                    className="w-40 h-40" />
            </div>
            <div className="flex flex-col gap-10 items-start w-full pl-10
            font-light text-2xl text-white">
            <Link to="/"
                className="cursor-pointer"
                onClick={toogle}>Home</Link>
            <Link to="/cardapio" 
                className="cursor-pointer"
                onClick={toogle}>Cardapio</Link>
            <Link to="/comandas" 
                className="cursor-pointer"
                onClick={toogle}>Comandas</Link>
            <Link to="/pedidos"
                className="cursor-pointer"
                onClick={toogle}>Pedidos</Link>
            <Link to="/funcionarios"
                className="cursor-pointer"
                onClick={toogle}>Funcionários</Link>
            </div>
            </nav>
        </aside>
    )
}