import { Outlet } from "react-router-dom"
import { Header, Sidebar } from "../../components"
import { useToogle } from "../../hooks"

export const Layout = () => {
    const {isActive, handletoogle} = useToogle()
    return(
        <>
        <Header isActive={isActive} toogle={handletoogle} />
        <Sidebar isActive={isActive} toogle={handletoogle}/>
        {isActive && (
            <div className="fixed inset-0 z-30 bg-black/40 lg:hidden" onClick={handletoogle} aria-hidden="true" />
        )}
        <main className={`${isActive ? "lg:ml-80 lg:w-[calc(100%-20rem)]" : "ml-0 w-full"} min-h-dvh overflow-x-hidden pt-23 lg:pt-26 px-4 transition-all duration-200 sm:px-8`}>
            <Outlet/>
        </main>
        </>
    )
}