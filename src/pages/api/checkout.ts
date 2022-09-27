import { stripe } from './../../lib/stripe';
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    const { priceId } = req.body

    //evitar que a rota seja acessada por GET
    if(req.method !== 'POST') {
        return res.status(405).end('Method not allowed')
    }

    if(!priceId){
        return res.status(400).send('Price not found')
    }
    

    const sucessUrl = `${process.env.NEXT_URL}/success`;
    const cancelUrl = `${process.env.NEXT_URL}`;

    const checkoutSession = await stripe.checkout.sessions.create({
        cancel_url: cancelUrl ,
        success_url:sucessUrl,
        mode: 'payment', //o usuário vai apenas pagar, não vai criar assinatura ou algo do tipo
        line_items: [
            {
                price: priceId,
                quantity: 1
            }
        ],
    })

    return res.status(201).json({
        checkoutUrl: checkoutSession.url,
    })
}