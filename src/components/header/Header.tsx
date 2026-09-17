import { Menu } from "lucide-react"
import type { Itoogle } from "../../utils"

export const Header = ({toogle, isactivesidebar}: Itoogle) => {
    return(
    <>
    <header className={`${isactivesidebar ? "ml-84" : "ml-4"} flex justify-center bg-red-500 p-4 rounded-2xl m-4 transition-all duration-200`}>
        <div className="w-auto" >
            <Menu size={40} color="white" onClick={toogle} className=" cursor-pointer"/>
        </div>
        <h1 className="flex-2 text-center text-white font-sans text-4xl">Rest All</h1>
    </header>       
    </>
    )
}