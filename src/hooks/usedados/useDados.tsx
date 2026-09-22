import {  useEffect, useState } from "react";
import type { Idadosretornados } from "../../utils/interfaces/Idadosretornados";
import { metodosbuscadados } from "../../services";

export const useDados =  () => {
    const [Dados, setDados] = useState<Idadosretornados>()
    
    useEffect(() => {
        const Carregardados = async () => {
            const response = await metodosbuscadados.buscardados()
            if(typeof response === "string"){
                return response
            }else{
                setDados(response)
            }
        }
        Carregardados()
    },[])
    return {Dados}
}