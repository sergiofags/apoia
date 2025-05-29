"use client"

import { Button } from "@/components/ui/button";
import { createUsername } from "../_actions/create-username";
import React, { useState } from "react";
import Link from "next/link";
import { Link2 } from "lucide-react";

interface UrlPreviewProps{
    username: string | null;
}

export function UrlPreview( { username: slug }: UrlPreviewProps ){

    const [error, setError] = React.useState<string | null>(null);
    const [username, setUsername] = React.useState(slug)

    async function submitAction(formData: FormData) {
        const username = formData.get("username") as string

        if(username === ""){
            return;
        }

        const response = await createUsername({ username})

        if (response.error) {
            setError(response.error);
            return;
        }

        if(response.data){
            setUsername(response.data)
        }
    }

    if(!!username) {
        return (
            <div className="flex items-center justify-between flex-1 p-2 text-gray-100 ">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-center gap-2">
                    <h3 className="font-bold text-lg">Sua URL: </h3>
                    <Link className="text-cyan-500 hover:underline" href={`${process.env.NEXT_PUBLIC_HOST_URL}/creator/${username}`} target="_blank">
                        {process.env.NEXT_PUBLIC_HOST_URL}/creator/{username}
                    </Link>
                </div>

                <Link href={`${process.env.NEXT_PUBLIC_HOST_URL}/creator/${username}`} target="_blank">
                    <Link2 className="w-5 h-5 text-white hover:text-cyan-500 hidden md:block"/>
                </Link>
            </div>
        )
    }

    return(
        <div className="w-full">
            <div className="flex items-center flex-1 p-2 text-gray-100">
                <form 
                    action={submitAction}
                    className="flex flex-1 flex-col md:flex-row gap-4 items-start md:items-center"
                >
                    <div className="flex items-center justify-center w-full">
                        <p>
                            {process.env.NEXT_PUBLIC_HOST_URL}/creator/
                        </p>
                        <input 
                            type="text"
                            className="flex-1 outline-none border h-9 border-gray-300 text-black rounded-md bg-gray-50 px-1"
                            placeholder="Digite o seu username... "
                            name="username"
                        />
                    </div>

                    <Button
                        type="submit"
                        className="bg-blue-500 h-9 w-full md:w-fit text-white px-4 rounded-md hover:bg-blue-600 cursor-pointer"
                    >Salvar</Button>
                    
                </form>
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
    )
}