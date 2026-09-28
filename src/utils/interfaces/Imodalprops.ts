import type { Itoogle } from "./Itoogle";
import type { ICampoFormulario } from "./Icampoformulario";

export interface IModalProps<T> extends Itoogle {
    criar: (dados: T) => Promise<unknown>
    campos: ICampoFormulario[]
    aoCriar?: () => void
}