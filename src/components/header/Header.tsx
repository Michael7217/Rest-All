import { Menu } from "lucide-react"
import type { Itoogle } from "../../utils"
import { useAuth } from "../../hooks"
import { useNavigate } from "react-router-dom"

export const Header = ({toogle, isActive}: Partial<Itoogle>) => {

    const {logout, islogged} = useAuth()
    const navigate = useNavigate()

    const handleAuthButton = () => {
        if (!islogged) {
            navigate("/login")
            return
        }

        logout()
        navigate("/", {replace: true})
    }

    return(
    <>
    <header className={`${isActive ? "ml-3 lg:ml-84" : "ml-3"} fixed z-20 top-0 right-0 left-0 flex items-center justify-between gap-2 bg-red-500 p-3 m-3 sm:p-4 sm:m-4 rounded-2xl transition-all duration-200 h-15 lg:h-18`}>
        <div className="shrink-0">
            <button
                type="button"
                onClick={toogle}
                aria-label={isActive ? "Fechar menu" : "Abrir menu"}
                aria-expanded={isActive}
                className="cursor-pointer"
            >
                <Menu size={40} color="white" />
            </button>
        </div>
        <div className="flex min-w-0 flex-1 justify-center px-1 sm:px-4">
            <h1 className="truncate text-center text-xl text-white font-sans sm:text-xl md:text-2xl lg:text-4xl">Rest All</h1>
        </div>
        <div className="shrink-0">
            <button className="cursor-pointer bg-white w-15 h-10 rounded-2xl text-red-500 font-bold" onClick={handleAuthButton}>{islogged ? "Sair" : "Entrar"}</button>
        </div>
    </header>       
    </>
    )
}