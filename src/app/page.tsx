import { FeatureCard } from "@/components/FeatureCard";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, PiggyBank, Shield, Zap } from "lucide-react";
import { signIn } from '@/lib/auth'

export default function Home() {

  async function handleRegister() {
    "use server"

    await signIn("google", { redirectTo: "/dashboard" })
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-white to-gray-200">
      <header className="container mx-auto py-6 px-4">
        <div className="flex items-center">
          <div className="flex items-center text-cyan-600 font-bold text-xl">
            <PiggyBank className="h-6 w-6 mr-2" />
            <span>Apoia.ai</span>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center">
        <div className="container mx-auto px-4 py-12 md:py-24">
          <div className="max-w-3xl mx-auto">
            <div className="text-center space-y-6">
              <div className="inline-block bg-cyan-100 text-cyan-800 px-4 py-1.5 rounded-full text-sm font-medium mb-2">
                Receba apoio de forma simples e segura
              </div>

              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-cyan-500">
                Monetize seu público de forma descomplicada
              </h1>

              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Receba doações diretamente dos seus seguidores através de uma página personalizada e elegante, sem
                complicações.
              </p>

              <div className="pt-4">
                <form action={handleRegister}>
                  <Button
                    type="submit"
                    size="lg"
                    className="bg-cyan-600 hover:bg-cyan-700 cursor-pointer text-white font-medium px-12"
                  >
                    Começar agora
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </div>
            </div>

          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureCard
              icon={<Zap className="h-8 w-8 text-cyan-600" />}
              title="Rápido e simples"
              description="Configure sua página em minutos e comece a receber doações imediatamente."
            />
            <FeatureCard
              icon={<Heart className="h-8 w-8 text-cyan-600" />}
              title="Conexão direta"
              description="Crie uma conexão mais próxima com seus apoiadores através de mensagens personalizadas."
            />
            <FeatureCard
              icon={<Shield className="h-8 w-8 text-cyan-600" />}
              title="Pagamentos seguros"
              description="Transações protegidas e transferências automáticas para sua conta bancária."
            />
          </div>
        </div>
      </main>
    </div>
  );
}
