import { useContext } from "react"
import { Authcontext } from "../../context"


export const useAuth = () => {
    const context = useContext(Authcontext)
    return context
}