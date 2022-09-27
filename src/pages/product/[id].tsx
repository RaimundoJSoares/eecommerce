import { GetStaticPaths, GetStaticProps } from "next"
import Stripe from "stripe"
import { stripe } from "../../lib/stripe"
import { ImageContainer, ProductContainer, ProductDetails } from "../../styles/pages/pages"
import Image from "next/image"
import { useRouter } from "next/router"

interface ProductProps {
    product: {
        id: string;
        price: string;
        name: string;
        image: string;
        description: string;
    }
}

export default function Products({product}: ProductProps) {
    const { isFallback } = useRouter()

    if (isFallback) {
        return <p>Carregando...</p>
    }

    return(
        <ProductContainer>
            <ImageContainer>
               <Image src={product.image}  width={520} height={480} alt='' />
            </ImageContainer>

            <ProductDetails>
                <h1>{product.name} </h1>
                <span>{product.price} </span>
                <p>{product.description} </p>

                <button>Comprar Agora</button>
            </ProductDetails>
        </ProductContainer>
    )
 }

 export const getStaticPaths: GetStaticPaths = async() =>{
    return{
        paths: [
            { params : {id: ''}}
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
                description: product.description
            }
        },
        revalidate: 60 * 60 * 1 // 1 hour
    }
 }