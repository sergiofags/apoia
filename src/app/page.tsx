"use client"

import { FeatureCard } from "@/components/FeatureCard";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, PiggyBank, Shield, Zap } from "lucide-react";
import { signIn } from '@/lib/auth'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-white to-neutral-50">
      <header className="container  mx-auto py-6 px-4">
        <div className="flex items-center">
          <div className="flex items-center text-zinc-900 font-bold text-xl">
            <PiggyBank className="h-6 w-6 mr-2" />
            <span>Apoia</span>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center">
        <div className="container mx-auto px-4 py-12 md:py-24">
          <div className="max-w-3xl mx-auto">
            <div className="text-center space-y-6">
              <div className="inline-block bg-zinc-100 text-zinc-800 px-4 py-1.5 rounded-full text-sm font-medium mb-2">
                Receba apoio de forma simples e segura
              </div>

              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 to-gray-600">
                Monetize seu público de forma descomplicada
              </h1>

              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Receba doações diretamente dos seus seguidores através de uma página personalizada e elegante, sem
                complicações.
              </p>

              <div className="pt-4">
                <Button
                  type="button"
                  size="lg"
                  className="bg-gradient-to-r from-zinc-900 to-gray-800 hover:bg-gradient-to-r hover:from-zinc-900 hover:to-gray-900 cursor-pointer text-white font-medium px-12 hover:scale-105 transition-transform duration-200 ease-in-out"
                  onClick={() => window.location.href = "/auth/login"}
                >
                  Começar agora
                  <ArrowRight className="h-5 w-5 stroke-3" />
                </Button>
              </div>
            </div>

          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureCard
              icon={<Zap className="h-8 w-8 text-zinc-600" />}
              title="Rápido e simples"
              description="Configure sua página em minutos e comece a receber doações imediatamente."
            />
            <FeatureCard
              icon={<Heart className="h-8 w-8 text-zinc-600" />}
              title="Conexão direta"
              description="Crie uma conexão mais próxima com seus apoiadores através de mensagens personalizadas."
            />
            <FeatureCard
              icon={<Shield className="h-8 w-8 text-zinc-600" />}
              title="Pagamentos seguros"
              description="Transações protegidas e transferências automáticas para sua conta bancária."
            />
          </div>
        </div>
      </main>
    </div>
  );
}
