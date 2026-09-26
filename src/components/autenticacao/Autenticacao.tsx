import { Loader2 } from "lucide-react"
import Logo from "../../assets/Logo.png"
import type { FormEvent } from "react"
import { useLocation } from "react-router-dom"

interface Iautenticacaoprops {
    isLoading: boolean,
    Erro: boolean
    metodo: (event: FormEvent<HTMLFormElement>) => Promise<void>
}
export const Autenticacao = ({isLoading, Erro, metodo}: Iautenticacaoprops) => {
    const {pathname} = useLocation()
    const isCadastro = pathname === "/proprietarios"
    const inputClass = "w-auto border-2 p-2 mx-5 placeholder:text-gray-700 border-white bg-white rounded-2xl h-15 m-2"

    return (
        <div className={isCadastro
            ? "flex w-full justify-center"
            : "fixed inset-1 flex h-dvh w-screen items-center justify-center overflow-hidden"}>
            <div className="flex w-full max-w-xl flex-col items-center rounded-2xl bg-red-500 py-5 shadow-2xl shadow-red-400">
                <img className="w-30 h-30" src={Logo} alt="logo" />
                <h1 className="pb-4 text-3xl font-extrabold text-white">{isCadastro ? "Registrar" : "Login"}</h1>
                <form className={`w-full ${isCadastro ? "grid grid-cols-2" : "flex flex-col"}`} name={isCadastro ? "registro" : "login"} onSubmit={metodo}>
                    {isCadastro && <>
                        <input className={inputClass} name="nome" type="text" placeholder="Nome completo" required />
                        <input className={inputClass} name="restauranteId" type="number" placeholder="ID do restaurante" required />
                        <input className={inputClass} name="cpf" type="text" placeholder="CPF" required />
                        <input className={inputClass} name="telefone" type="tel" placeholder="Telefone" required />
                    </>}
                    <input className={inputClass} name="email" type="email" placeholder="Email" required />
                    <input className={inputClass} name="senha" type="password" placeholder="Senha" required />
                    <div className="min-h-6 ml-8">
                    {Erro && (
                        <span className="text-white text-sm font-extralight">
                        {isCadastro ? "Não foi possível concluir o cadastro." : "Email ou senha incorretos!"}
                        </span>
                    )}
                    </div>
                    <div className={`flex w-full flex-col items-center justify-center gap-3 px-5 ${isCadastro ? "col-span-2" : ""}`}>
                        <button
                        type="submit"
                        disabled={isLoading}
                        className="flex h-16 w-full max-w-xs cursor-pointer items-center justify-center rounded-2xl border-2 border-white bg-white text-xl font-extrabold text-red-500 shadow-inner shadow-red-200 disabled:cursor-wait"
                        >
                        {isLoading ? <Loader2 className="animate-spin" /> : isCadastro ? "Registrar" : "Login"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}