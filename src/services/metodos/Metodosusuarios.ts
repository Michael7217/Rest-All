import { Verifica, type IFuncionario, type Iregistro } from "../../utils"
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

const Registrargerentes = async (dados: Iregistro) => {
    try {
        const response = await Api().post<Iregistro>("/usuarios/gerente", dados)
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

const Registrarfuncionarios = async (dados: Iregistro) => {
    
    try {
        const response = await Api().post<Iregistro>("/usuarios/funcionario", dados)
        return response
    } catch (error) {
    
        return Verifica(error)
    }
}
const Registrarproprietario = async (dados: Iregistro) => {
    try {
        const response = await Api().post<Iregistro>("/usuarios/dono", dados)
        return response
    } catch (error) {
        return Verifica(error)
    }
}

const Deletargerente = async (id: number) => {
    try {
        const response = await Api().post<IFuncionario>(`/usuarios/gerente/${id}`)
        return response
    } catch (error) {
        return Verifica(error)
    }
}
const Deletarfuncionario = async (id: number) => {
    try {
        const response = await Api().post<IFuncionario>(`/usuarios/funcionario/${id}`)
        return response
    } catch (error) {
        return Verifica(error)
    }
}

const Deletarproprietario = async (id: number) => {
    try {
        const response = await Api().post<IFuncionario>(`/usuarios/dono/${id}`)
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
    RegistrarProprietario: Registrarproprietario,
    DeletarGerente: Deletargerente,
    DeletarFuncionario: Deletarfuncionario,
    DeletarProprietario: Deletarproprietario
}