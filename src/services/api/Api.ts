import axios from "axios"


export const id = () => {
    let sessionId = localStorage.getItem("sessionId")
    if(!sessionId){
        localStorage.setItem("sessionId",crypto.randomUUID())
        sessionId = localStorage.getItem("sessionId") as string
        return sessionId
    }else{
        return sessionId
    }
}

export const Api = () => {
    const sessionId = id()
    const api = axios.create({
        baseURL: import.meta.env.VITE_API_URL,
        headers: {sessionId}
    })
    return (api)
}