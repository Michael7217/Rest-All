import axios from "axios";

export const Verifica = (Error: unknown) => {
    if(axios.isAxiosError(Error)){
            const dados = Error.response?.data as { mensagem?: string; message?: string; title?: string } | undefined
            return dados?.mensagem ?? dados?.message ?? dados?.title ?? Error.message
        }else{
            return "erro inesperado"
        }
}

// export default class extends Error{
//     readonly detalhes?: Record<string, string>
//     readonly status: number

//     constructor(status: number, message: string, detalhes?: Record<string, string>){
//         super(message)
//         this.status = status
//         this.detalhes = detalhes
//     }

// }