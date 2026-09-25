import { Verifica, type IFuncionario } from "../../utils"
import type { Idadosretornados } from "../../utils/interfaces/Idadosretornados"
import { Api } from "../api/Api"

const Listargerentes = async () => {
    try {
        const response = await Api().get<Idadosretornados[]>("/usuarios/gerente")
        return response.data
    } catch (error) {
        return Verifica(error)
    }
}

const Registrargerentes = async (dados: IFuncionario) => {
    try {
        const response = await Api().post<IFuncionario>("/usuarios/gerente", dados)
        return response
    } catch (error) {
        return Verifica(error)
    }
}
const Listarfuncionarios = async () => {
    try {
        const response = await Api().get<Idadosretornados[]>("/usuarios/funcionario")
        return response.data
    } catch (error) {
        return Verifica(error)
    }
}

const Registrarfuncionarios = async (dados: IFuncionario) => {
    const {ativo, id, ...enviodados} = dados
    try {
        const response = await Api().post<IFuncionario>("/usuarios/funcionario", enviodados)
        return response
    } catch (error) {
    
        return Verifica(error)
    }
}
const Registrarproprietario = async (dados: IFuncionario) => {
    try {
        const response = await Api().post<IFuncionario>("/usuarios/dono", dados)
        return response
    } catch (error) {
        return Verifica(error)
    }
}

export const metodosusuarios = {
    ListarGerentes: Listargerentes,
    RegistrarGerentes: Registrargerentes,
    ListarFuncionarios: Listarfuncionarios,
    RegistrarFuncionarios: Registrarfuncionarios,
    RegistrarProprietario: Registrarproprietario
}