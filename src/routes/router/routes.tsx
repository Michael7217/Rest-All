import {Routes, Route} from "react-router-dom"
import { Home, Pedidos, Perfil } from "../../pages"
import { Layout } from "../../layout"
import { Login } from "../../pages/login/Login"
import { Privateroutes } from "../routesprivate/private/private"
import { Cardapio } from "../../pages/cardapio/Cardapio"
import { AdminRoutes } from "../routesprivate/adminroutes/Adminroutes"


export const Rotas = () => {
    return(
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route element={<Privateroutes/>}>
                    <Route element={<Layout/>}>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/perfil" element={<Perfil/>}/>
                        <Route path="/cardapio" element={<Cardapio/>}/>
                        <Route path="/pedidos" element={<Pedidos/>}/>
                    </Route>
                </Route>
                <Route element={<AdminRoutes/>}>
                    <Route element={<Layout/>}>
                        {/* <Route path="/funcionarios" element={<Funcionarios}/> */}
                    </Route>
                </Route>
            </Routes>
    )
}