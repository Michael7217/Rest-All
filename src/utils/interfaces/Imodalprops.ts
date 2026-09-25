import type { AxiosResponse } from "axios";
import type { Itoogle } from "./Itoogle";
import type { ICampoFormulario } from "./Icampoformulario";

export interface IModalProps<T> extends Itoogle {
    criar: (dados: T) => Promise<AxiosResponse<T> | string>
    campos: ICampoFormulario[]
    aoCriar?: () => void
}