"use server"

import { stripe } from '@/lib/stripe'

export async function getLoginOnBoardAccount(accountId: string | undefined) {
    
    if(!accountId){
        return null;
    }

    try{

        const accountLink = await stripe.accountLinks.create({
            account: accountId,
            refresh_url: `${process.env.NEXT_PUBLIC_HOST_URL!}/dashboard`,
            return_url: `${process.env.NEXT_PUBLIC_HOST_URL!}/dashboard`,
            type: "account_onboarding"
        })

        return accountLink.url

    } catch(err){
        console.log("Error account ID", err)
        return null;
    }

}