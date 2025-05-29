"use server"

import { z } from "zod"
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { createSlug } from "@/utils/create-slug"


const createUsernameSchema = z.object({
    username: z.string().min(4, "O username precisa ter no minimo 4 caracteres")
})

type createUsernameFormData = z.infer<typeof createUsernameSchema>

export async function createUsername(data: createUsernameFormData) {
    
    const session = await auth()

    if (!session?.user) {
        return {
            data: null,
            error: "Usuário não autenticado"
        }
    }

    const schema = createUsernameSchema.safeParse(data)

    if (!schema.success) {
        return {
            data: null,
            error: schema.error.issues[0].message
        }
    }

    try{
        const userId = session.user.id;

        const slug = createSlug(data.username)

        const existSlug = await prisma.user.findFirst({
            where:{
                username: slug
            }
        })

        if(existSlug){
            return {
                data: null,
                error: "Este username já existe"
            }
        }

        await prisma.user.update({
            where:{
                id: userId
            },
            data:{
                username: slug
            }
        })
        
        return {
            data: slug,
            error: null
        }

    } catch(err) {
        return {
            data: null,
            error: "Falha ao atualizar o username"
        }
    }
}