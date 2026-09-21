import { Outlet } from "react-router-dom"
import { Header, Sidebar } from "../../components"
import { useToogle } from "../../hooks"

export const Layout = () => {
    const {isActive, handletoogle} = useToogle()
    return(
        <>
        <Header isActive={isActive} toogle={handletoogle} />
        <Sidebar isActive={isActive} toogle={handletoogle}/>
        <main className={`${isActive ? "ml-[40%] md:ml-80" : "ml-0"} pt-25 px-8 transition-all duration-200`}>
            <Outlet/>
        </main>
        </>
    )
}