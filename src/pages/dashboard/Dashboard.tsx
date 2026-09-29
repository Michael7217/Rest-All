import { useState } from "react"
import {
    Bar,
    BarChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts"
import { Modal } from "../../components"
import { useToogle } from "../../hooks"
import { metodosdashboard } from "../../services/metodos/Metodosdashboard"
import type { ICampoFormulario, Idashboard, Idashboarddados } from "../../utils"

const campos: ICampoFormulario[] = [
    {
        nome: "periodo",
        rotulo: "Período",
        placeholder: "Selecione o período",
        tipo: "select",
        opcoes: [
            { valor: "DIA", rotulo: "Dia" },
            { valor: "SEMANA", rotulo: "Semana" },
            { valor: "MES", rotulo: "Mês" },
            { valor: "ANO", rotulo: "Ano" },
        ],
    },
    { nome: "dataInicio", rotulo: "Data inicial", placeholder: "Selecione a data inicial", tipo: "date" },
    { nome: "dataFim", rotulo: "Data final", placeholder: "Selecione a data final", tipo: "date" },
]
export const Dashboard = () => {
    const {isActive, handletoogle} = useToogle()
    const [dados, setDados] = useState<Idashboarddados | null>(null)

    const formatarMoeda = (valor: number) =>
        valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })

    return (
        <>
            <Modal<Idashboard, Idashboarddados>
                isActive={isActive}
                toogle={handletoogle}
                criar={metodosdashboard.Verdashboard}
                campos={campos}
                aoCriar={setDados}
                textoBotao="Aplicar filtros"
                textoSucesso="Dashboard atualizado."
            />
            <div className="relative mb-6 flex w-full items-center">
                <button
                    onClick={handletoogle}
                    className="absolute right-0 cursor-pointer rounded-xl border-2 border-red-500 bg-white px-4 py-2 font-bold text-red-500"
                >
                    Filtrar
                </button>
                <h1 className="w-full pr-4 text-center text-2xl font-bold text-red-500">
                    Dashboard
                </h1>
            </div>

            {!dados ? (
                <p className="text-center text-gray-500">
                    Aplique os filtros para carregar os dados do dashboard.
                </p>
            ) : (
                <div className="space-y-6">
                    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                        <article className="rounded-lg border border-gray-200 bg-white p-4">
                            <h2 className="text-sm font-medium text-gray-500">Total vendido</h2>
                            <p className="mt-2 text-lg font-bold text-gray-900 sm:text-2xl">{formatarMoeda(dados.totalVendido)}</p>
                        </article>
                        <article className="rounded-lg border border-gray-200 bg-white p-4">
                            <h2 className="text-sm font-medium text-gray-500">Total de despesas</h2>
                            <p className="mt-2 text-lg font-bold text-gray-900 sm:text-2xl">{formatarMoeda(dados.totalDespesas)}</p>
                        </article>
                        <article className="rounded-lg border border-gray-200 bg-white p-4">
                            <h2 className="text-sm font-medium text-gray-500">Lucro líquido</h2>
                            <p className="mt-2 text-lg font-bold text-gray-900 sm:text-2xl">{formatarMoeda(dados.lucroLiquido)}</p>
                        </article>
                        <article className="rounded-lg border border-gray-200 bg-white p-4">
                            <h2 className="text-sm font-medium text-gray-500">Quantidade de comandas</h2>
                            <p className="mt-2 text-lg font-bold text-gray-900 sm:text-2xl">{dados.quantidadeComandas.toLocaleString("pt-BR")}</p>
                        </article>
                    </section>

                    <section className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                        <article className="min-w-0 rounded-lg border border-gray-200 bg-white p-4">
                            <h2 className="mb-4 font-bold text-gray-900">Comandas por mesa</h2>
                            {dados.comandasPorMesa.length === 0 ? (
                                <p className="text-sm text-gray-500">Sem dados para o período selecionado.</p>
                            ) : (
                                <div className="h-72 w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={dados.comandasPorMesa} margin={{ top: 8, right: 8, left: 0, bottom: 8 }}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="mesa" tickFormatter={(mesa: number) => `Mesa ${mesa}`} />
                                            <YAxis allowDecimals={false} />
                                            <Tooltip labelFormatter={(mesa) => `Mesa ${mesa}`} />
                                            <Bar dataKey="quantidade" name="Comandas" fill="#0047AB" radius={[4, 4, 0, 0]} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            )}
                        </article>

                        <article className="min-w-0 rounded-lg border border-gray-200 bg-white p-4">
                            <h2 className="mb-4 font-bold text-gray-900">Itens mais vendidos</h2>
                            {dados.itensMaisVendidos.length === 0 ? (
                                <p className="text-sm text-gray-500">Sem dados para o período selecionado.</p>
                            ) : (
                                <div className="h-72 w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={dados.itensMaisVendidos} margin={{ top: 8, right: 8, left: 0, bottom: 48 }}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="nomeItem" interval={0} angle={-30} textAnchor="end" />
                                            <YAxis allowDecimals={false} />
                                            <Tooltip />
                                            <Bar dataKey="quantidade" name="Unidades vendidas" fill="#FF2C2C" radius={[4, 4, 0, 0]} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            )}
                        </article>
                    </section>
                </div>
            )}
        </>
    )
}