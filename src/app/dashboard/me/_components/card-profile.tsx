import Image from "next/image";
import { Name } from "./name";
import { Description } from "./description";


interface CardProfileProps{
    user:{
        id: string;
        name: string | null;
        username: string | null;
        bio: string | null;
        image: string | null;
    }
}

export function CardProfile({ user }: CardProfileProps){
    return(
        <section className="w-full flex flex-col items-center ms-auto px-4">
            <div>
                <Image 
                    src={user.image ?? "https://cdn-icons-png.freepik.com/512/7718/7718888.png"}
                    alt="Foto de perfil"
                    width={104}
                    height={104}
                    className="rounded-full bg-gray-50 object-cover border-4 border-white hover:shadow-xl duration-300"
                    quality={100}
                />
            </div>

            <div>
                <Name 
                    initialName={user.name ?? "Digite seu nome..."}
                />

                <Description 
                   initialDescription={user.bio ?? "Digite sua biografia..."}
                />
            </div>
        </section>
    )
}