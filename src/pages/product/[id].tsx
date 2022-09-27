import { GetStaticPaths, GetStaticProps } from "next"
import Stripe from "stripe"
import { stripe } from "../../lib/stripe"
import { ImageContainer, ProductContainer, ProductDetails } from "../../styles/pages/pages"
import Image from "next/image"
import { useRouter } from "next/router"
import axios from "axios"
import { useState } from "react"
import Head from "next/head"

interface ProductProps {
    product: {
        id: string;
        price: string;
        name: string;
        image: string;
        description: string;
        defaultPriceId: string;
    }
}

export default function Products({product}: ProductProps) { 
    const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false)

    async function handleBuyProduct(){

        try {
            setIsCreatingCheckoutSession(true)

            const response = await axios.post('/api/checkout', {
                priceId : product.defaultPriceId,
            })

            const {checkoutUrl} = response.data

            window.location.href = checkoutUrl //se for para uma rota externa, estamos redicionando para o stripe, stripe não é aplicação nossa, é rota externa
            //se eu quiser redirecionar o usuario a uma rota interna, ou seja uma rota que eu criei, eu uso o router do next
            //

        } catch (error) {
            setIsCreatingCheckoutSession(false)
            alert('Falha ao direcionar checkout')

        }
     
    }


    const { isFallback } = useRouter()

    if (isFallback) {
        return <p>Carregando...</p>
    }

    return(

        <>
           <Head>
             <title>{product.name} | Ignite shop</title>
             </Head>
            <ProductContainer>
                <ImageContainer>
                <Image src={product.image}  width={520} height={480} alt='' />
                </ImageContainer>

                <ProductDetails>
                    <h1>{product.name} </h1>
                    <span>{product.price} </span>
                    <p>{product.description} </p>

                    <button disabled={isCreatingCheckoutSession}
                    onClick={handleBuyProduct}
                    >Comprar Agora
                    </button>
                </ProductDetails>
            </ProductContainer>
        </>
    )
 }

 export const getStaticPaths: GetStaticPaths = async() =>{
    return{
        paths: [
            { params : {id:'prod_MTvzZvDMoFOVVi'}}
        ],
        fallback: true,
    }
 }

 export const getStaticProps : GetStaticProps = async ({ params}) => {
    const paramsId = params.id //pegando o id do produto

    //agora precisamos buscar o produto de dentro do stripe
    const product = await stripe.products.retrieve(paramsId as string, {
        expand: ['default_price'] //como não é uma lista, não preciso usar o data, apenas o default_price
    })

    const price = product.default_price as Stripe.Price

    return{
        props: {
            product : {
                id: product.id,
                name: product.name,
                image : product.images[0],
                price: new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                }).format(price.unit_amount / 100),
                description: product.description,
                defaultPriceId: price.id,
            }
        },
        revalidate: 60 * 60 * 1 // 1 hour
    }
 }