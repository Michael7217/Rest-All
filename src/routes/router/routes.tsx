import {Routes, Route} from "react-router-dom"
import { Comandas, Home, Login, Pedidos, Perfil, Despesas, Registro, Proprietarios } from "../../pages"
import { Layout } from "../../layout"
import { Privateroutes } from "../routesprivate/private/private"
import { Cardapio } from "../../pages/cardapio/Cardapio"
import { AdminRoutes } from "../routesprivate/adminroutes/Adminroutes"
import { Funcionarios } from "../../pages"
import { Gerentes } from "../../pages"

export const Rotas = () => {
    return(
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="/registro" element={<Registro/>}/>
                <Route element={<Privateroutes/>}>
                    <Route element={<Layout/>}>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/perfil" element={<Perfil/>}/>
                        <Route path="/cardapio" element={<Cardapio/>}/>
                        <Route path="/pedidos" element={<Pedidos/>}/>
                        <Route path="/comandas" element={<Comandas/>}></Route>
                    </Route>
                </Route>
                <Route element={<AdminRoutes roles={["GERENTE", "DONO", "ADMINISTRADOR"]}/>}>
                    <Route element={<Layout/>}>
                        <Route path="/funcionarios" element={<Funcionarios/>}/>
                        <Route path="/despesas" element={<Despesas/>}/>
                    </Route>
                </Route>
                <Route element={<AdminRoutes roles={["DONO", "ADMINISTRADOR"]}/>}>
                    <Route element={<Layout/>}>
                        <Route path="/gerentes" element={<Gerentes/>}/>
                    </Route>
                </Route>
                <Route element={<AdminRoutes roles={["DONO", "ADMINISTRADOR"]}/>}>
                    <Route element={<Layout/>}>
                        <Route path="/proprietarios" element={<Proprietarios/>}/>
                    </Route>
                </Route>
            </Routes>
    )
}