import { useContext } from "react"
import { Authcontext } from "../context/Context";

export const useAuth = () => {
    const context = useContext(Authcontext)
    return context
}