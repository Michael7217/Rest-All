import { useLocation } from "react-router-dom"
import type { Itoogle } from "../../utils"

export const Model = ({isActive, toogle}: Itoogle) => {
    const {pathname} = useLocation()
    const title = pathname.split("/")[1]
    const Handlesubmit = () => {
        
    }

    return (
        <div className={`${isActive ? "fixed" : "hidden"} flex flex-col bg-red-500 rounded-2xl mx-2 w-auto max-w-full overflow-hidden left-[15%] md:left-[34%]`}>
            <form onSubmit={Handlesubmit} className="flex flex-col items-start border-2 bg-red-500  p-4 gap-1 rounded-2xl 
            [&_input]:bg-white [&_input]:placeholder-gray-500 [&_input]:rounded-2xl [&_input]:w-full [&_input]:p-2 text-white">
                <h1 className="text-white font-bold self-center text-xl">{`Adicionar no ${title.toLowerCase()}`}</h1>
                <label>Nome</label>
                <input type="text" placeholder="nome" />
                <label>Descrição</label>
                <input type="text" placeholder="descrição" />
                <label>Categoria</label>
                <input type="text" placeholder="categoria"/>
                <label>Preço</label>
                <input type="number" placeholder="preço"/>
                <label>Disponibilidade</label>
                <input type="text" placeholder="disponivel"/>
                <label>Imagem</label>
                <input type="text" placeholder="imagem"/>
                <div className="flex w-full justify-around">
                    <button onClick={toogle} type="button" className="w-40 h-10 m-2 border-2 bg-white text-xl font-bold text-red-500 cursor-pointer rounded-2xl self-center mb-0">Cancelar</button>
                    <button className="w-40 h-10 m-2 border-2 bg-white text-xl font-bold text-red-500 cursor-pointer rounded-2xl self-center mb-0" type="submit">Adicionar</button>
                </div>
                
            </form>
        </div>
    )
}

export interface Icardapio {
    nome: string,
    descricao: string,
    categoria: string,
    preco: number,
    disponivel: boolean,
    imagem?: string
}