import { useState } from "react"
import { useLocation } from "react-router-dom"
import { Loader2 } from "lucide-react"
import type { IModalProps } from "../../utils"
import { useToast } from "../../hooks"


export const Modal = <T, R = unknown,>({
    isActive,
    toogle,
    criar,
    atualizar,
    campos,
    valoresIniciais,
    modoEdicao = false,
    aoCriar,
    textoBotao,
    textoSucesso,
}: IModalProps<T, R>) => {
    const { showToast } = useToast()
    const { pathname } = useLocation()
    const titulo = pathname.split("/")[1]
    const emGrade = titulo === "funcionarios" || titulo === "pedidos"
    const [IsLoading, setIsLoading] = useState(false)
    const inicial = () => {
        const valores = valoresIniciais as Record<string, unknown> | undefined
        return Object.fromEntries(
            campos.map((campo): [string, string] => {
                const valor = valores?.[campo.nome]
                return [campo.nome, valor == null ? "" : String(valor)]
            }),
        ) as Record<string, string>
    }
    const [Form, setForm] = useState<Record<string, string>>(inicial)
    
    const handlechange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
                showToast(`O campo ${campoinvalido.rotulo} é inválido`, "error")
                return
            }
            setIsLoading(true)

            const dados = Object.fromEntries(
                campos.filter((campo) => !campo.somenteLeitura).map((campo): [string, unknown] => [
                    campo.nome,
                    campo.parse ? campo.parse(Form[campo.nome]) : Form[campo.nome],
                ]),
            ) as T
            
            
            const salvar = modoEdicao ? atualizar : criar
            if (!salvar) {
                showToast("Ação não configurada para este formulário.", "error")
                setIsLoading(false)
                return
            }
            const response = await salvar(dados)
            if (typeof response === "string"){
                showToast(response, "error")
            }else{
                showToast(textoSucesso ?? (modoEdicao ? "Alterações salvas com sucesso!" : "Adicionado com sucesso!"), "success")
                aoCriar?.(response)
                setForm(inicial())
                toogle()
            }
            setIsLoading(false)
        
}

    return (
        <div className={`${isActive ? "fixed" : "hidden"} inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/40 p-4`}>
            <div className="my-auto w-[80%] max-w-full rounded-2xl bg-red-500 md:w-[55%]">
            <form onSubmit={Handlesubmit} className={`max-h-[calc(100dvh-2rem)] overflow-y-auto items-start bg-red-500 p-4 gap-1 rounded-2xl [&_h1]:text-center
            [&_input]:bg-white [&_input]:placeholder-gray-500 [&_input]:rounded-2xl [&_input]:w-full [&_input]:p-2 [&_label]:text-white`}>
                <h1 className="text-white font-bold self-center text-xl">{modoEdicao ? `Editar ${titulo}` : titulo === "comandas" || titulo === "pedidos" ? `Adicionar ${titulo}` : `Adicionar no ${titulo}`}</h1>
                <div className={`flex flex-col w-full gap-y-1 ${emGrade ? "md:grid md:grid-cols-2 md:gap-x-4" : ""}`}>
                    {campos.map((campo) => (
                        <div key={campo.nome} className="flex flex-col gap-1">
                            <label>{campo.rotulo}</label>
                            {campo.tipo === "select" ? (
                                <select
                                    name={campo.nome}
                                    value={Form[campo.nome] ?? ""}
                                    onChange={handlechange}
                                    required
                                    className="w-full rounded-2xl bg-white p-2"
                                >
                                    <option value="" disabled>{campo.placeholder}</option>
                                    {campo.opcoes?.map((opcao) => (
                                        <option key={opcao.valor} value={opcao.valor}>
                                            {opcao.rotulo}
                                        </option>
                                    ))}
                                </select>
                            ) : (
                                <input
                                    type={campo.tipo ?? "text"}
                                    placeholder={campo.placeholder}
                                    name={campo.nome}
                                    value={Form[campo.nome] ?? ""}
                                    onChange={handlechange}
                                    readOnly={campo.somenteLeitura}
                                    required={!campo.somenteLeitura}
                                    className={campo.somenteLeitura ? "bg-gray-200 text-gray-600" : undefined}
                                />
                            )}
                        </div>
                    ))}
                </div>
                <div className="flex w-full flex-col gap-2 sm:flex-row mt-1 sm:justify-around">
                    <button onClick={toogle} type="button" className="w-full sm:w-40 h-10 sm:m-2 border-2 bg-white text-xl font-bold text-red-500 cursor-pointer rounded-2xl self-center mb-0">Cancelar</button>
                    <button className="flex h-10 w-full items-center justify-center whitespace-nowrap rounded-2xl border-2 bg-white px-5 text-xl font-bold text-red-500 cursor-pointer sm:m-2 sm:w-auto" type="submit" disabled={IsLoading}>{IsLoading ? <Loader2 className="animate-spin"/> : textoBotao ?? (modoEdicao ? "Salvar alterações" : "Adicionar")}</button>
                </div>
                
            </form>
            </div>
        </div>
    )
}