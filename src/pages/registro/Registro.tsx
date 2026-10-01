import { useNavigate } from "react-router-dom"
import { Autenticacao } from "../../components/autenticacao/Autenticacao"

import { useState, type FormEvent } from "react"
import type { Iproprietario } from "../../utils"
import { metodosusuarios } from "../../services/metodos/Metodosusuarios"

export const Registro = () => {
    const navigate = useNavigate()
    const [isLoadingregistro, setisLoadingregistro] = useState(false)
    const [Erro, setErro] = useState<boolean>(false)

    const handlesubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formdata = new FormData(event.currentTarget)

        const dados: Iproprietario = {
            nome: String(formdata.get("nome")),
            nomeRestaurante: String(formdata.get("nomeRestaurante")),
            cnpj: String(formdata.get("cnpj")),
            cpf: String(formdata.get("cpf")),
            telefone: String(formdata.get("telefone")),
            email: String(formdata.get("email")),
            senha: String(formdata.get("senha")),
        }
        try{
            setisLoadingregistro(true)
            setErro(false)
            const response = await metodosusuarios.RegistrarProprietario(dados)
            if (typeof response !== "string") navigate("/login", {replace: true})
            else setErro(true)
        }finally{
            setisLoadingregistro(false)
        }
        }
    return (
        <>
        <Autenticacao isLoading={isLoadingregistro} Erro={Erro} metodo={handlesubmit}/>

        </>
    )
}