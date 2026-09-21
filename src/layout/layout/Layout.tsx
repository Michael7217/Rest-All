import { Outlet } from "react-router-dom"
import { Header, Sidebar } from "../../components"
import { useSidebar } from "../../hooks"

export const Layout = () => {
    const {isActive, handletoogle} = useSidebar()
    return(
        <>
        <Header isactivesidebar={isActive} toogle={handletoogle} />
        <Sidebar isactivesidebar={isActive} toogle={handletoogle}/>
        <main className={`${isActive ? "ml-[40%] md:ml-80" : "ml-0"} pt-25 px-8 transition-all duration-200`}>
            <Outlet/>
        </main>
        </>
    )
}