import { useState } from "react"

export const useSidebar = () => {
    const [isActive, setIsActive] = useState(false)
    const handletoogle = () => {
        setIsActive(!isActive)
    }
    return ({isActive, handletoogle})
}