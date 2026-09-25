import { useState, type FormEvent } from "react"
import Logo from "../../assets/Logo.png"

import { useAuth } from "../../hooks"
import { useNavigate } from "react-router-dom"
import { Loader2 } from "lucide-react"

export const Login = () => {
    const {login} = useAuth()
    const navigate = useNavigate()
    const [isLoadinglogin, setisLoadingLogin] = useState(false)
    const [Erro, setErro] = useState<boolean>(false)

    const handlesubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formdata = new FormData(event.currentTarget)

        const email = String(formdata.get("email"))
        const password = String(formdata.get("password"))
        try{
            setisLoadingLogin(true)
            const ok = await login(email, password)
            if (ok) navigate("/", {replace: true})
            else setErro(true)
        }finally{
            setisLoadingLogin(false)
        }
        }

    return (
        <>
        <div className="flex flex-col items-center justify-center w-screen h-screen">
            
            <div className="w-1/2 h-130 md:h-120 flex flex-col rounded-2xl items-center bg-red-500 shadow-2xl shadow-red-400">
                <img className="w-30 h-30" src={Logo} alt="logo" />
                <h1 className="text-3xl pb-4 font-extrabold text-white">Login</h1>
                <form className="flex flex-col w-full h-full justify-start bottom-0" name="login" onSubmit={handlesubmit}>
                    <input className="w-auto border-2 p-2 mx-5 placeholder:text-gray-700 border-white bg-white rounded-2xl h-15 m-2 mb-4" name="email" type="text" placeholder={"login"}/>
                    <input className="w-auto border-2 p-2 mx-5 placeholder:text-gray-700 border-white bg-white rounded-2xl h-15 m-2 mt-4 mb-0" name="password" type="password" placeholder={"password"}/>
                    <div className="min-h-6 ml-8">
                    {Erro && (
                        <span className="text-white text-sm font-extralight">
                        Email ou senha incorretos!
                        </span>
                    )}
                    </div>
                    <div className="flex flex-col justify-center items-center md:flex-row md:justify-between w-full md:px-5" >
                        <button
                        type="submit"
                        className="flex items-center justify-center text-xl font-extrabold text-red-500 w-1/2 h-16 cursor-pointer  border-2 border-white bg-white shadow-inner shadow-red-200 rounded-2xl"
                        >
                        {isLoadinglogin ? <Loader2 className="animate-spin "/> : "Login" }
                        </button> 
                        <button
                        type="submit"
                        className="flex items-center justify-center text-xl font-extrabold text-red-500 w-1/2 h-16 cursor-pointer m-4 border-2 border-white bg-white shadow-inner shadow-red-200 rounded-2xl "
                        >
                        {"Registrar" }
                        </button> 
                    </div>
                </form>
            </div>
        </div>
        </>
    )
}