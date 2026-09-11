interface Iativo{
    ativo?: boolean
}
export const Sidebar = ({ativo}: Iativo) => {
    return(
        <aside className={`${ativo ? "fixed" : "hidden"} h-screen top-0`}>
            <nav className="flex flex-col items-center w-xs bg-red-500 h-full rounded-r-4xl justify-center gap-10">
            
            <h1>Home</h1>
            <h1>Cardapio</h1>
            <h1>Comandas</h1>
            <h1>Pedidos</h1>
            <h1>Funcionários</h1>
            
            </nav>
        </aside>
    )
}