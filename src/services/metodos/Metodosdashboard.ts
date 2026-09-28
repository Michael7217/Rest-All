import { Verifica, type Idashboard, type Idashboarddados } from "../../utils"
import { Api } from "../api/Api"



const dashboard = async (dados: Idashboard) => {
    try{
        const response = await Api().get<Idashboarddados>("/api/dashboard", {
            params: {
                periodo: dados.periodo,
                dataInicio: dados.dataInicio,
                dataFim: dados.dataFim
            }
        })
        return response.data
    }catch(error){
        return Verifica(error)
    }
}

export const metodosdashboard = {
    Verdashboard: dashboard
}