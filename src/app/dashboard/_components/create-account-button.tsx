"use client"

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

export default function CreateAccountButton() {
    const [loading, setLoading] = useState(false)

    async function handleCreateStripeAccount() {
        setLoading(true);

        try {

            console.log('to aqui')

            const res = await fetch(`${process.env.NEXT_PUBLIC_HOST_URL}/api/stripe/create-account`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
            })

            if(!res.ok){
                toast.error("Falha ao criar conta de pagamento")
                setLoading(false)
                return;
            }

            const data = await res.json();

            window.location.href = data.url

        } catch(err) {
            console.log(err)
            setLoading(false)
        }

    }

    return (
        <div className="mb-5">
            <Button 
                onClick={handleCreateStripeAccount} 
                className="cursor-pointer"
                disabled={loading}
            >
                {loading ? "Carregando..." : "Criar conta"}
            </Button>
        </div>
    )
}