import { Header } from "../../components/header/Header"

interface Itoogle {
    toogle?: () => void 
    isactivesidebar?: boolean

}
export const Home = ({toogle, isactivesidebar}: Itoogle) => {

    return(
        <>
        <Header isactivesidebar={isactivesidebar} toogle={toogle}/>
        </>
    )
}