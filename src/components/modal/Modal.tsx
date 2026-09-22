import { useLocation } from "react-router-dom"
import type { Icardapio, Itoogle } from "../../utils"
import { cardapio } from "../../services"
import { useState } from "react"
import { Loader2 } from "lucide-react"

export const Model = ({isActive, toogle}: Itoogle) => {
    const {pathname} = useLocation()
    const title = pathname.split("/")[1]
    const [IsLoading, setIsLoading] = useState(false)
    const [Form, setForm] = useState<Icardapio>({
        nome: "",
        descricao: "",
        categoria: "",
        preco: 0,
        disponivel: true,
        imagem: ""
    })
    const handlechange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setForm((prev) => ({
                ...prev,
                [name]: name === "preco" ? Number(value) : name === "disponivel"
                ? value === "sim" : value,
    }))}
    const Handlesubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        try{
            e.preventDefault()
            setIsLoading(true)

            const response = await cardapio.criar(Form)
            if (typeof response === "string"){
                alert(response)
            }else{
                alert("Prato adicionado com sucesso!")
            }
        }finally{
            setIsLoading(false)
            toogle()
            e.currentTarget.reset()
        }
}

    return (
        <div className={`${isActive ? "fixed" : "hidden"} flex flex-col bg-red-500 rounded-2xl mx-2 w-auto max-w-full overflow-hidden left-[15%] md:left-[34%]`}>
            <form onSubmit={Handlesubmit} className="flex flex-col items-start border-2 bg-red-500  p-4 gap-1 rounded-2xl 
            [&_input]:bg-white [&_input]:placeholder-gray-500 [&_input]:rounded-2xl [&_input]:w-full [&_input]:p-2 [&_label]:text-white">
                <h1 className="text-white font-bold self-center text-xl">{`Adicionar no ${title.toLowerCase()}`}</h1>
                <label>Nome</label>
                <input type="text" placeholder="nome" name="nome" onChange={handlechange}/>
                <label>Descrição</label>
                <input type="text" placeholder="descrição" name="descricao" onChange={handlechange}/>
                <label>Categoria</label>
                <input type="text" placeholder="categoria" name="categoria" onChange={handlechange}/>
                <label>Preço</label>
                <input type="number" placeholder="preço" name="preco" onChange={handlechange}/>
                <label>Disponibilidade</label>
                <input type="text" placeholder="disponivel" name="disponivel" onChange={handlechange}/>
                <label>Imagem</label>
                <input type="text" placeholder="imagem" name="imagem" onChange={handlechange}/>
                <div className="flex w-full justify-around">
                    <button onClick={toogle} type="button" className="w-40 h-10 m-2 border-2 bg-white text-xl font-bold text-red-500 cursor-pointer rounded-2xl self-center mb-0">Cancelar</button>
                    <button className="flex justify-center items-center w-40 h-10 m-2 border-2 bg-white text-xl font-bold text-red-500 cursor-pointer rounded-2xl self-center mb-0" type="submit" disabled={IsLoading}>{IsLoading ? <Loader2 className="animate-spin"/> : "Adicionar"}</button>
                </div>
                
            </form>
        </div>
    )
}

