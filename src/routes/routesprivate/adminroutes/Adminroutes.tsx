import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../../../hooks"
import type { Roles } from "../../../utils"

interface Iadminroutesprops {
    roles: Roles[]
}

export const AdminRoutes = ({roles}: Iadminroutesprops) => {
    
    const {usuario ,islogged} = useAuth()

    if (!islogged){
        return <Navigate to="/login" replace/>
    }
    if (!roles.some((role) => role === usuario!.perfil)){
        return <Navigate to="/" replace/>
    }
    return <Outlet/>
}