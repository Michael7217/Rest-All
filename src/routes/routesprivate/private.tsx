import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../../hooks"

export const Privateroutes = () => {
    const {islogged} = useAuth()
    return (islogged ? <Outlet/> : <Navigate to="/login" replace/>)
}