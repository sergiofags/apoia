"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@radix-ui/react-label"
import { createPayment } from "../_actions/create-payments"
import { toast } from "sonner"
import { getStripeJs } from '@/lib/stripe-js'

const formSchema = z.object({
    name: z.string().min(1, "O nome é obrigatório"),
    message: z.string().min(1, "A mensagem é obrigatória"),
    price: z.enum(["15", "25", "35"], {
        required_error: "O valor é obrigatório",
    })
})

type FormData = z.infer<typeof formSchema>

interface FormDonateProps {
    slug: string;
    creatorId: string;
}

export function FormDonate({ slug, creatorId }: FormDonateProps) {

    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            message: "",
            price: "15",
        },
    })

    async function onSubmit(data: FormData) {

        const priceInCents = Number(data.price) * 100
        
        const checkout = await createPayment({
            name: data.name,
            message: data.message,
            creatorId: creatorId,
            slug: slug,
            price: priceInCents,
        })

        if(checkout.error){
            toast.error(checkout.error)
            return;
        }

        if(checkout.sessionId){
            // Use the sessionId as needed, for example, redirect to checkout
            console.log("Session ID:", checkout.sessionId)

            const stripe = await getStripeJs();

            await stripe?.redirectToCheckout({ 
                sessionId: checkout.sessionId 
            });
        }

    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-5">
                <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Nome</FormLabel>
                        <FormControl>
                            <Input placeholder="Digite seu nome" {...field} />
                        </FormControl>
                    </FormItem>
                )}
                />

                <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Mensagem</FormLabel>
                        <FormControl>
                            <Textarea 
                                placeholder="Digite sua mensagem" {...field}  
                                className="h-32 resize-none"
                            />
                        </FormControl>
                    </FormItem>
                )}
                />

                <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Valor da doação</FormLabel>
                        <FormControl>
                            <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex items-center gap-2"
                            >
                                {["15", "25", "35"].map((value) => (
                                    <div key={value} className="flex items-center gap-2">
                                        <RadioGroupItem value={value} id={`value-${value}`} />
                                        <Label htmlFor={value}>R${value}</Label>
                                    </div>
                                ))}

                            </RadioGroup>
                        </FormControl>
                    </FormItem>
                )}
                />

                <Button 
                    type="submit"
                    disabled={form.formState.isSubmitting}
                >
                    {form.formState.isSubmitting ? "Carregando..." : "Fazer doação"}
                </Button>
            </form>
        </Form>
    )
}