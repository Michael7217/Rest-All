import { Menu } from "lucide-react"
import type { Itoogle } from "../../utils"
import { useAuth } from "../../hooks"

export const Header = ({toogle, isactivesidebar}: Itoogle) => {

    const {logout} = useAuth()
    return(
    <>
    <header className={`${isactivesidebar ? "ml-[43%] md:ml-84" : "ml-4"} flex fixed top-0 right-0 left-0 justify-center bg-red-500 p-4 rounded-2xl m-4 transition-all duration-200 `}>
        <div className="w-auto" >
            <Menu size={40} color="white" onClick={toogle} className=" cursor-pointer"/>
        </div>
        <div className="flex flex-2">
            <h1 className="flex-2 text-center text-nowrap text-white font-sans text-4xl overflow-hidden">Rest All</h1>
        </div>
        <div>
            <button className="cursor-pointer bg-white w-15 h-10 rounded-2xl text-red-500 font-black" onClick={logout}>Sair</button>
        </div>
    </header>       
    </>
    )
}