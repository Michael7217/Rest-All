import type { Itoogle } from "./Itoogle";
import type { ICampoFormulario } from "./Icampoformulario";

export interface IModalProps<T, R = unknown> extends Itoogle {
    criar?: (dados: T) => Promise<R | string>
    atualizar?: (dados: T) => Promise<R | string>
    campos: ICampoFormulario[]
    valoresIniciais?: Partial<T> | Record<string, unknown>
    modoEdicao?: boolean
    aoCriar?: (resposta: R) => void
    textoBotao?: string
    textoSucesso?: string
}