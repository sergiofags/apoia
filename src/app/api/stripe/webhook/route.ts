import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { stripe } from "@/lib/stripe"
import { prisma } from "@/lib/prisma"

export async function POST(req: NextRequest) {

    const sig = req.headers.get("Stripe-Signature")!

    const endPointSecret = process.env.STRIPE_WEBHOOK_SECRET as string;

    let event: Stripe.Event;

    try {
        const payload = await req.text();
        event = stripe.webhooks.constructEvent(payload, sig, endPointSecret);



    } catch(err){
        console.log("Falha ao autenticar assinatura", err);
        return new NextResponse("Webhook error", { status: 400 });
    }


    switch(event.type){
        case 'checkout.session.completed':
            const session = event.data.object as Stripe.Checkout.Session;
            const paymentItentId = session.payment_intent as string;

        const paymentIntent = await stripe.paymentIntents.retrieve(paymentItentId);
        console.log('## Payment intent ', paymentIntent);

        const donorName = paymentIntent.metadata.donorName;
        const donorMessage = paymentIntent.metadata.donorMessage;
        const donateId = paymentIntent.metadata.donationId;

        try {
            const updateDonation = await prisma.donation.update({
                where: {
                    id: donateId
                },
                data: {
                    status: "PAID",
                    donorName: donorName ?? "Anonimo",
                    donorMessage: donorMessage ?? "Sem mensagem...",
                }
            })

            console.log("Doacao atualizada", updateDonation)

        } catch(err) {
            console.log(err)
        }

        break;

        default:
            console.log(`Evento nao tratado: ${event.type}`);
    }

    return NextResponse.json({ ok: true })

}