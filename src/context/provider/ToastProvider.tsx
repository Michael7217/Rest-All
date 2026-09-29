import { useCallback, useEffect, useState, type ReactNode } from "react"
import { CheckCircle2, CircleX, X } from "lucide-react"
import { ToastContext, type ToastType } from "../context/ToastContext"

interface ToastMessage {
    message: string
    type: ToastType
}

export const ToastProvider = ({ children }: { children: ReactNode }) => {
    const [toast, setToast] = useState<ToastMessage | null>(null)

    useEffect(() => {
        if (!toast) return
        const timeout = window.setTimeout(() => setToast(null), 5000)
        return () => window.clearTimeout(timeout)
    }, [toast])

    const showToast = useCallback((message: string, type: ToastType) => {
        setToast({ message, type })
    }, [])

    const isSuccess = toast?.type === "success"
    const Icon = isSuccess ? CheckCircle2 : CircleX

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            {toast && (
                <div className="fixed right-4 top-24 z-200 w-[calc(100%-2rem)] max-w-sm sm:right-6">
                    <div
                        role={isSuccess ? "status" : "alert"}
                        aria-live={isSuccess ? "polite" : "assertive"}
                        className={`flex items-start gap-3 rounded-lg border p-4 text-white shadow-lg ${
                            isSuccess
                                ? "border-green-700 bg-green-600"
                                : "border-red-800 bg-red-700"
                        }`}
                    >
                        <Icon aria-hidden="true" className="mt-0.5 shrink-0" size={20} />
                        <p className="min-w-0 flex-1 wrap-break-word">{toast.message}</p>
                        <button
                            type="button"
                            aria-label="Fechar aviso"
                            onClick={() => setToast(null)}
                            className="shrink-0 cursor-pointer"
                        >
                            <X aria-hidden="true" size={18} />
                        </button>
                    </div>
                </div>
            )}
        </ToastContext.Provider>
    )
}