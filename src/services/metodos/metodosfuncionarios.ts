import { Verifica, type IFuncionario } from "../../utils"
import { Api } from "../api/Api"


const listarfuncionarios = async () => {
    try {
        const response = await Api().get<IFuncionario[]>("/funcionarios")
        return response.data
    } catch (error) {
        return Verifica(error)
    }
}

const deletarfuncionario = async (id: number) => {
    try {
        const response = await Api().delete<IFuncionario>(`/funcionarios/${id}`)
        return response
    } catch (error) {
        return Verifica(error)
    }
}

const atualizarfuncionario = async (
    id: number,
    funcionario: Partial<IFuncionario>,
) => {
    try {
        const response = await Api().patch<IFuncionario>(`/funcionarios/${id}`, funcionario)
        return response
    } catch (error) {
        return Verifica(error)
    }
}

const atualizarfuncionarioput = async (
    id: number,
    funcionario: IFuncionario,
) => {
    try {
        const response = await Api().put<IFuncionario>(`/funcionarios/${id}`, funcionario)
        return response
    } catch (error) {
        return Verifica(error)
    }
}

const buscarfuncionarioid = async (id: number) => {
    try {
        const response = await Api().get<IFuncionario>(`/funcionarios/${id}`)
        return response.data
    } catch (error) {
        return Verifica(error)
    }
}

const criarfuncionario = async (funcionario: IFuncionario) => {
    try {
        const response = await Api().post<IFuncionario>("/funcionarios", funcionario)
        return response
    } catch (error) {
        return Verifica(error)
    }
}

export const funcionario = {
    listar: listarfuncionarios,
    deletar: deletarfuncionario,
    atualizar: atualizarfuncionario,
    atualizarput: atualizarfuncionarioput,
    buscarid: buscarfuncionarioid,
    criar: criarfuncionario,
}