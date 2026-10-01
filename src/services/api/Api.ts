import axios from "axios"
import type { Idadosuser } from "../../utils/interfaces/Idadosuser"


export const Api = () => {
    const api = axios.create({
        baseURL: import.meta.env.VITE_API_URL,
    })
    api.interceptors.request.use((config) => {
        const Usuariosalvo = localStorage.getItem("usuario")
        if (Usuariosalvo) {
            const usuarioparse = JSON.parse(Usuariosalvo) as Idadosuser
            if(usuarioparse.token) {
                config.headers.Authorization = `Bearer ${usuarioparse.token}`
        }
    }
    return config
})
    api.interceptors.response.use(
        (response) => response,
        (error: unknown) => {
            if (axios.isAxiosError(error) && error.response?.status === 401) {
                const tinhaSessao = !!localStorage.getItem("usuario")
                localStorage.removeItem("usuario")
                if (tinhaSessao && !window.location.pathname.startsWith("/login")) {
                    window.location.href = "/login"
                }
            }
            return Promise.reject(error)
        }
    )
    return (api)
}

