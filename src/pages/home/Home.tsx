import {
    BookOpen,
    Building2,
    ChartNoAxesCombined,
    ClipboardList,
    LogIn,
    PackageOpen,
    ReceiptText,
    UserRound,
    // UserRoundPlus,
    UsersRound,
    Wallet,
} from "lucide-react"
import { Link } from "react-router-dom"
import { useAuth } from "../../hooks"
import type { Roles } from "../../utils"
import type { Icardacesso } from "../../utils/interfaces/Icardacesso"

const acessos: Icardacesso[] = [
    {
        titulo: "Cardápio",
        descricao: "Consulte os pratos e produtos disponíveis.",
        rota: "/cardapio",
        icone: BookOpen,
    },
    {
        titulo: "Comandas",
        descricao: "Acompanhe mesas e comandas abertas.",
        rota: "/comandas",
        icone: ReceiptText,
        perfis: ["FUNCIONARIO", "GERENTE", "DONO", "ADMINISTRADOR"],
    },
    {
        titulo: "Pedidos",
        descricao: "Consulte e acompanhe os pedidos.",
        rota: "/pedidos",
        icone: ClipboardList,
        perfis: ["FUNCIONARIO", "GERENTE", "DONO", "ADMINISTRADOR"],
    },
    {
        titulo: "Dashboard",
        descricao: "Visualize vendas, despesas e desempenho.",
        rota: "/dashboard",
        icone: ChartNoAxesCombined,
        perfis: ["GERENTE", "DONO", "ADMINISTRADOR"],
    },
    {
        titulo: "Funcionários",
        descricao: "Gerencie os funcionários do restaurante.",
        rota: "/funcionarios",
        icone: UsersRound,
        perfis: ["GERENTE", "DONO", "ADMINISTRADOR"],
    },
    {
        titulo: "Estoque",
        descricao: "Acompanhe produtos e níveis de estoque.",
        rota: "/estoque",
        icone: PackageOpen,
        perfis: ["GERENTE", "DONO", "ADMINISTRADOR"],
    },
    {
        titulo: "Despesas",
        descricao: "Consulte e controle as despesas.",
        rota: "/despesas",
        icone: Wallet,
        perfis: ["GERENTE", "DONO", "ADMINISTRADOR"],
    },
    {
        titulo: "Gerentes",
        descricao: "Gerencie os acessos de gerência.",
        rota: "/gerentes",
        icone: UserRound,
        perfis: ["DONO", "ADMINISTRADOR"],
    },
    {
        titulo: "Proprietários",
        descricao: "Gerencie os proprietários cadastrados.",
        rota: "/proprietarios",
        icone: Building2,
        perfis: ["ADMINISTRADOR"],
    },
    {
        titulo: "Meu perfil",
        descricao: "Consulte os dados da sua conta.",
        rota: "/perfil",
        icone: UserRound,
        perfis: ["FUNCIONARIO", "GERENTE", "DONO", "ADMINISTRADOR"],
    },
]

export const Home = () => {
    const { usuario, islogged } = useAuth()
    const acessosVisiveis = acessos.filter((acesso) =>
        acesso.perfis === undefined
            ? true
            : islogged && acesso.perfis.includes(usuario?.perfil as Roles),
    )

    return (
        <section className="w-full">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-red-500">
                    {islogged ? `Olá, ${usuario?.nome}` : "Bem-vindo ao Rest All"}
                </h1>
                <p className="mt-1 text-gray-600">
                    {islogged ? "Acessos disponíveis para sua conta" : "Acesse o cardápio ou entre na sua conta"}
                </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {acessosVisiveis.map(({ titulo, descricao, rota, icone: Icon }) => (
                    <Link
                        key={rota}
                        to={rota}
                        className="group flex min-h-36 items-start gap-4 rounded-2xl border-2 border-red-500 bg-red-500 p-5 text-white transition-colors hover:bg-white hover:text-red-500"
                    >
                        <Icon aria-hidden="true" className="mt-1 shrink-0" size={26} />
                        <span className="min-w-0">
                            <span className="block text-lg font-bold">{titulo}</span>
                            <span className="mt-1 block text-sm opacity-90">{descricao}</span>
                        </span>
                    </Link>
                ))}

                {!islogged && (
                    <>
                        <Link
                            to="/login"
                            className="group flex min-h-36 items-start gap-4 rounded-2xl border-2 border-red-500 bg-white p-5 text-red-500 transition-colors hover:bg-red-500 hover:text-white"
                        >
                            <LogIn aria-hidden="true" className="mt-1 shrink-0" size={26} />
                            <span>
                                <span className="block text-lg font-bold">Entrar</span>
                                <span className="mt-1 block text-sm opacity-90">Acesse sua conta.</span>
                            </span>
                        </Link>
                        {/* <Link
                            to="/registro"
                            className="group flex min-h-36 items-start gap-4 rounded-2xl border-2 border-red-500 bg-white p-5 text-red-500 transition-colors hover:bg-red-500 hover:text-white"
                        >
                            <UserRoundPlus aria-hidden="true" className="mt-1 shrink-0" size={26} />
                            <span>
                                <span className="block text-lg font-bold">Criar conta</span>
                                <span className="mt-1 block text-sm opacity-90">Cadastre um restaurante.</span>
                            </span>
                        </Link> */}
                    </>
                )}
            </div>
        </section>
    )
}