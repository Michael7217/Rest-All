import { Verifica } from "../../utils"
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

const Registrargerentes = async (dados: Idadosretornados) => {
    try {
        const response = await Api().post<Idadosretornados[]>("/usuarios/gerente", dados)
        return response.data
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
const Registrarfuncionarios = async (dados: Idadosretornados) => {
    try {
        const response = await Api().post<Idadosretornados[]>("/usuarios/funcionario", dados)
        return response.data
    } catch (error) {
        return Verifica(error)
    }
}
const Registrarproprietario = async (dados: Idadosretornados) => {
    try {
        const response = await Api().post<Idadosretornados[]>("/usuarios/dono", dados)
        return response.data
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