import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Stripe from "stripe";
import { stripe } from "../lib/stripe";
import { ImageContainer, SuccessContainer } from "../styles/pages/success";

interface SuccessProps {
    customerName: string;
    product: {
        name: string;
        image: string;
    }
}

export default function Success({customerName, product}: SuccessProps) {
    return (

        <>
            <Head>
            <title>Compra efetuada | Ignite shop</title>

            <meta name="robots" content="noindex" />
            </Head>
            <SuccessContainer>
                <h1>Compra Efetuada!</h1>

                <ImageContainer>
                    <Image src={product.image} width={120} height={110} alt=''/>
                </ImageContainer>

                <p>Uhuul, <strong>{customerName}</strong>, sua camiseta <strong>{product.name}</strong> já está a caminho da sua casa</p>

                <Link href='/'>
                    <a>Voltar ao catálogo</a>
                </Link>
            </SuccessContainer>

        </>
    );
}

export const getServerSideProps: GetServerSideProps = async({query}) => {
 if(!query.session_id) {
    return {
        redirect: {
            destination: '/',
            permanent: false
        }
    }
 }

 const sessionid = String(query.session_id);

 const session = await stripe.checkout.sessions.retrieve(sessionid, {
    expand: ['line_items', 'line_items.data.price.product']
 })

 const customerName = session.customer_details.name;
 const product = session.line_items.data[0].price.product as Stripe.Product;

    return {
        props: {
            customerName,
            product: {
                name: product.name,
                image: product.images[0],
            }
        }
    }
}