import {Routes, Route} from "react-router-dom"
import { Comandas, Home, Login, Pedidos, Perfil, Despesas } from "../../pages"
import { Layout } from "../../layout"
import { Privateroutes } from "../routesprivate/private/private"
import { Cardapio } from "../../pages/cardapio/Cardapio"
import { AdminRoutes } from "../routesprivate/adminroutes/Adminroutes"
import { Funcionarios } from "../../pages/funcionarios/Funcionarios"




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
                        <Route path="/comandas" element={<Comandas/>}></Route>
                    </Route>
                </Route>
                <Route element={<AdminRoutes/>}>
                    <Route element={<Layout/>}>
                        <Route path="/funcionarios" element={<Funcionarios/>}/>
                        <Route path="/despesas" element={<Despesas/>}/>
                    </Route>
                </Route>
            </Routes>
    )
}