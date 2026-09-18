import {Routes, Route} from "react-router-dom"
import { Home, Perfil } from "../../pages"
import { Layout } from "../../layout"
import { Login } from "../../pages/login/Login"
import { Privateroutes } from "../routesprivate/private"


export const Rotas = () => {
    return(
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route element={<Privateroutes/>}>
                    <Route element={<Layout/>}>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/perfil" element={<Perfil/>}/>
                    </Route>
                </Route>
            </Routes>
    )
}