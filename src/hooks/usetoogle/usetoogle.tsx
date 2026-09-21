import { useState } from "react"

export const useToogle = () => {
    const [isActive, setIsActive] = useState(false)
    const handletoogle = () => {
        setIsActive(!isActive)
    }
    return ({isActive, handletoogle})
}