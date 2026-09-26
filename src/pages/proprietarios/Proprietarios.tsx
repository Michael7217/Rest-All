import { useState, type FormEvent } from "react"
import { Autenticacao } from "../../components/autenticacao/Autenticacao"
import { metodosusuarios } from "../../services/metodos/Metodosusuarios"
import type { Iregistro } from "../../utils"

export const Proprietarios = () => {
    const [isLoadingregistro, setisLoadingregistro] = useState(false)
    const [Erro, setErro] = useState<boolean>(false)

    const handlesubmit = async (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault()
            const formdata = new FormData(event.currentTarget)
    
            const dados: Iregistro = {
                nome: String(formdata.get("nome")),
                email: String(formdata.get("email")),
                senha: String(formdata.get("senha")),
                restauranteId: Number(formdata.get("restauranteId")),
                cpf: String(formdata.get("cpf")),
                cargo: String(formdata.get("cargo")),
                telefone: String(formdata.get("telefone")),
            }
            try{
                setisLoadingregistro(true)
                const response = await metodosusuarios.RegistrarProprietario(dados)
                if (typeof response !== "string") return alert("proprietario criado com sucesso")
                else{
                    setErro(true)
                    alert("Erro ao adicionar")
                }
            }finally{
                setisLoadingregistro(false)
            }
            }
    return (
        <>
            <Autenticacao isLoading={isLoadingregistro} Erro={Erro} metodo={handlesubmit} />
        </>
    )
}