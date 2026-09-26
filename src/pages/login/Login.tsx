import { useState, type FormEvent } from "react"
import { useAuth } from "../../hooks"
import { useNavigate } from "react-router-dom"
import { Autenticacao } from "../../components/autenticacao/Autenticacao"

export const Login = () => {
    const {login} = useAuth()
    const navigate = useNavigate()
    const [isLoadinglogin, setisLoadingLogin] = useState(false)
    const [Erro, setErro] = useState<boolean>(false)

    const handlesubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formdata = new FormData(event.currentTarget)

        const email = String(formdata.get("email"))
        const senha = String(formdata.get("senha"))
        try{
            setisLoadingLogin(true)
            setErro(false)
            const ok = await login(email, senha)
            if (ok) navigate("/", {replace: true})
            else setErro(true)
        }finally{
            setisLoadingLogin(false)
        }
        }

    return (
        <Autenticacao isLoading={isLoadinglogin} Erro={Erro} metodo={handlesubmit} />
    )
}