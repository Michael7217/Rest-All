import { useState } from "react"
import { useLocation } from "react-router-dom"
import { Loader2 } from "lucide-react"
import type { IModalProps } from "../../utils"


export const Modal = <T,>({ isActive, toogle, criar, campos, aoCriar }: IModalProps<T>) => {
    const { pathname } = useLocation()
    const titulo = pathname.split("/")[1]
    const emGrade = titulo === "funcionarios" || titulo === "pedidos"
    const [IsLoading, setIsLoading] = useState(false)
    const inicial = () =>
        Object.fromEntries(campos.map((campo): [string, string] => [campo.nome, ""])) as Record<string, string>
    const [Form, setForm] = useState<Record<string, string>>(inicial)
    
    const handlechange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setForm((prev) => ({
                ...prev,
                [name]: value,
    }))
    }

    const Handlesubmit = async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault()
            const campoinvalido = campos.find((campo) => (
                campo.regex && !campo.regex.test(Form[campo.nome] ?? "")
            ))
            if (campoinvalido !== undefined){
                alert(`O campo ${campoinvalido.rotulo} é inválido`)
                return
            }
            setIsLoading(true)

            const dados = Object.fromEntries(
                campos.map((campo): [string, unknown] => [
                    campo.nome,
                    campo.parse ? campo.parse(Form[campo.nome]) : Form[campo.nome],
                ]),
            ) as T
            
            
            const response = await criar!(dados)
            if (typeof response === "string"){
                alert(response)
            }else{
                alert("Adicionado com sucesso!")
                aoCriar?.()
            }
            setIsLoading(false)
            setForm(inicial())
            toogle()
        
}

    return (
        <div className={`${isActive ? "fixed" : "hidden"} flex flex-col bg-red-500 rounded-2xl z-50 mx-auto w-[80%] md:w-[55%] max-w-full left-0 right-0 overflow-hidden`}>
            <form onSubmit={Handlesubmit} key={String(isActive)} className={`items-start bg-red-500  p-4 gap-1 rounded-2xl [&_h1]:text-center
            [&_input]:bg-white [&_input]:placeholder-gray-500 [&_input]:rounded-2xl [&_input]:w-full [&_input]:p-2 [&_label]:text-white`}>
                <h1 className="text-white font-bold self-center text-xl">{`Adicionar no ${titulo}`}</h1>
                <div className={`flex flex-col w-full gap-y-1 ${emGrade ? "md:grid md:grid-cols-2 md:gap-x-4" : ""}`}>
                    {campos.map((campo) => (
                        <div key={campo.nome} className="flex flex-col gap-1">
                            <label>{campo.rotulo}</label>
                            <input
                                type={campo.tipo === "number" ? "number" : "text"}
                                placeholder={campo.placeholder}
                                name={campo.nome}
                                onChange={handlechange}
                            />
                        </div>
                    ))}
                </div>
                <div className="flex w-full justify-around">
                    <button onClick={toogle} type="button" className="w-40 h-10 m-2 border-2 bg-white text-xl font-bold text-red-500 cursor-pointer rounded-2xl self-center mb-0">Cancelar</button>
                    <button className="flex justify-center items-center w-40 h-10 m-2 border-2 bg-white text-xl font-bold text-red-500 cursor-pointer rounded-2xl self-center mb-0" type="submit" disabled={IsLoading}>{IsLoading ? <Loader2 className="animate-spin"/> : "Adicionar"}</button>
                </div>
                
            </form>
        </div>
    )
}