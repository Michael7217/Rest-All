import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../../../hooks"

export const AdminRoutes = () => {
    const perfisPermitidos = ["GERENTE", "DONO", "ADMINISTRADOR"]
    const {usuario, islogged} = useAuth()

    if (!islogged){
        return <Navigate to="/login" replace/>
    }
    if (!perfisPermitidos.includes(usuario?.perfil ?? "")){
        return <Navigate to="/" replace/>
    }
    return <Outlet/>
}