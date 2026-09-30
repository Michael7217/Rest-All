import {Routes, Route} from "react-router-dom"
import { Comandas, Home, Login, Pedidos, Perfil, Despesas, Registro, Proprietarios, Estoque, Dashboard, Restaurantes, Meurestaurante, Cardapiopublico } from "../../pages"
import { Layout } from "../../layout"
import { Privateroutes } from "../routesprivate/private/private"
import { Cardapio } from "../../pages/cardapio/Cardapio"
import { AdminRoutes } from "../routesprivate/adminroutes/Adminroutes"
import { Funcionarios } from "../../pages"
import { Gerentes } from "../../pages"

export const Rotas = () => {
    return(
            <Routes>
                // rotas publicas
                <Route path="/login" element={<Login/>}/>
                <Route element={<Layout/>}>
                    <Route path="/" element={<Home/>}/>
                        <Route path="/cardapio" element={<Cardapio/>}/>
                    <Route path="/cardapio/:Idrestaurante" element={<Cardapiopublico/>}/>
                </Route>
                // rotas privadas
                <Route element={<Privateroutes/>}>
                    <Route element={<Layout/>}>
                        <Route path="/perfil" element={<Perfil/>}/>
                        <Route path="/pedidos" element={<Pedidos/>}/>
                        <Route path="/comandas" element={<Comandas/>}></Route>
                    </Route>
                </Route>
                <Route element={<AdminRoutes roles={["GERENTE", "DONO", "ADMINISTRADOR"]}/>}>
                    <Route element={<Layout/>}>
                        <Route path="/funcionarios" element={<Funcionarios/>}/>
                        <Route path="/despesas" element={<Despesas/>}/>
                        <Route path="/estoque" element={<Estoque/>}/>
                        <Route path="/dashboard" element={<Dashboard/>}/>
                        <Route path="/meu-restaurante" element={<Meurestaurante/>}/>
                    </Route>
                </Route>
                <Route element={<AdminRoutes roles={["DONO", "ADMINISTRADOR"]}/>}>
                    <Route element={<Layout/>}>
                        <Route path="/gerentes" element={<Gerentes/>}/>
                        <Route path="/restaurantes" element={<Restaurantes/>}/>
                    </Route>
                </Route>
                <Route element={<AdminRoutes roles={["ADMINISTRADOR"]}/>}>
                    <Route element={<Layout/>}>
                        <Route path="/proprietarios" element={<Proprietarios/>}/>
                        <Route path="/registro" element={<Registro/>}/>
                    </Route>
                </Route>
            </Routes>
    )
}