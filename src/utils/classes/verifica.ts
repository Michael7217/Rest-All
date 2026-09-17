import axios from "axios";

export const Verifica = (Error: unknown) => {
    if(axios.isAxiosError(Error)){
            return Error.message
        }else{
            return "erro inesperado"
        }
}