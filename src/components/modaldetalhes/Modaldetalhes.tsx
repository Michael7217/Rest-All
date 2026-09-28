import { X } from "lucide-react"
import type { ReactNode } from "react"

interface IModalDetalhesProps {
    aberto: boolean
    titulo: string
    aoFechar: () => void
    detalhes: {
        rotulo: string
        valor: ReactNode
        colunaDireita?: boolean
    }[]
}

export const Modaldetalhes = ({
    aberto,
    titulo,
    aoFechar,
    detalhes,
}: IModalDetalhesProps) => {
    if (!aberto) return null

    const detalhesEsquerda = detalhes.filter((detalhe) => !detalhe.colunaDireita)
    const detalhesDireita = detalhes.filter((detalhe) => detalhe.colunaDireita)

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/40 p-4 md:overflow-hidden"
            onClick={aoFechar}
        >
            <section
                role="dialog"
                aria-modal="true"
                aria-labelledby="titulo-modal-detalhes"
                className="my-auto max-h-[calc(100dvh-2rem)] w-full max-w-lg overflow-y-auto rounded-2xl border-2 border-red-500 bg-white p-6 text-gray-700 md:my-0 md:flex md:h-[min(80dvh,42rem)] md:max-h-[calc(100dvh-2rem)] md:max-w-4xl md:flex-col md:overflow-hidden"
                onClick={(evento) => evento.stopPropagation()}
            >
                <div className="mb-4 flex items-center justify-between gap-4">
                    <h2 id="titulo-modal-detalhes" className="text-xl font-bold">
                        {titulo}
                    </h2>
                    <button className="cursor-pointer" type="button" onClick={aoFechar} aria-label="Fechar detalhes">
                        <X color="red"/>
                    </button>
                </div>
                <div className="space-y-3 md:grid md:min-h-0 md:flex-1 md:grid-cols-2 md:gap-6 md:space-y-0">
                    <dl className="space-y-3">
                        {detalhesEsquerda.map((detalhe) => (
                            <div key={detalhe.rotulo}>
                                <dt className="font-semibold">{detalhe.rotulo}</dt>
                                <dd>{detalhe.valor}</dd>
                            </div>
                        ))}
                    </dl>
                    {detalhesDireita.length > 0 && (
                        <dl className="space-y-3 md:min-h-0 md:overflow-y-auto md:pr-2">
                            {detalhesDireita.map((detalhe) => (
                                <div key={detalhe.rotulo}>
                                    <dt className="font-semibold">{detalhe.rotulo}</dt>
                                    <dd>{detalhe.valor}</dd>
                                </div>
                            ))}
                        </dl>
                    )}
                </div>
            </section>
        </div>
    )
}