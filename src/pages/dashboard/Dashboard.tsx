import { Modal } from "../../components"
import { useToogle } from "../../hooks"
import { metodosdashboard } from "../../services/metodos/Metodosdashboard"
import type { ICampoFormulario } from "../../utils"

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
    return (
        <>
            <Modal isActive={isActive} toogle={handletoogle} criar={metodosdashboard.Verdashboard} campos={campos}/>
                    <div className="relative flex w-full items-center mb-3.5">
                      <button
                                onClick={handletoogle}
                                className="absolute right-0 cursor-pointer bg-white w-25 h-10 rounded-2xl border-2 border-red-500 text-red-500 font-bold"
                            >filtrar</button>
                        <h1 className="w-full text-center text-2xl text-red-500 font-bold pr-4">
                            Dashboard
                        </h1>
                    </div>
        </>
    )
}