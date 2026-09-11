import { Menu } from "lucide-react"

interface Itoogle {
    toogle?: () => void
    isactivesidebar?: boolean

}

export const Header = ({toogle, isactivesidebar}: Itoogle) => {
    return(
        <main className={`${isactivesidebar ? "ml-80" : "ml-0"} transition-all duration-200`}>
        <header className={`flex justify-center bg-red-500 p-4 rounded-2xl m-4`}
        >
            <div className="w-auto" >
                <Menu size={40} color="white" onClick={toogle} className=" cursor-pointer"/>
            </div>
            <h1 className="flex-2 text-center text-white font-sans text-4xl">Rest All</h1>
        </header>
        </main>
    )
}