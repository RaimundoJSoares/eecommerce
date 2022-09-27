import Link from "next/link";
import { ImageContainer, SuccessContainer } from "../styles/pages/success";

export default function Success() {
    return (
        <SuccessContainer>
            <h1>Compra Efetuada!</h1>

            <ImageContainer>

            </ImageContainer>

            <p>Uhuul, <strong>Raimundo Junior</strong>,
             sua camiseta <strong>HU TAO</strong> já está a caminho da sua casa</p>

             <Link href='/'>
                <a>Voltar ao catálogo</a>
             </Link>
        </SuccessContainer>
    );
}