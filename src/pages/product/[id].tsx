import { useRouter } from "../../../node_modules/next/router"

export default function Products(){
    const { query } = useRouter()

    return(
        <h1>produtos: {JSON.stringify(query)}</h1>
    )
 }