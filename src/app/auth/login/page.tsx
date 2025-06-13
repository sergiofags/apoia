"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Github, LogIn, PiggyBank } from "lucide-react";
import { signIn } from "next-auth/react";

export default function Login() {
  async function LoginGoogle() {
    await signIn("google", { callbackUrl: "/dashboard" });
  }

  async function LoginGithub() {
    await signIn("github", { callbackUrl: "/dashboard" });
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-white to-neutral-50">
      <main className="flex-1 flex items-center justify-center">
        <div className="container mx-auto px-4 py-12 md:py-24">
          <div className="flex justify-center items-center mx-auto text-green-600 font-bold text-xl">
            <PiggyBank className="h-6 w-6 mr-2" />
            <span>Apoia</span>
          </div>
          <div className="max-w-md mx-auto text-center mt-4">
            <h1 className="text-3xl font-bold mb-4 text-green-600">Bem-vindo de volta!</h1>
            <p className="text-gray-600 mb-6">
              Faça login para continuar usando o Apoia.
            </p>
          </div>
          <div className="max-w-96 mx-auto text-center">
            <div className="sm:flex sm:gap-4">
              <Button
                type="button"
                onClick={LoginGoogle}
                size="lg"
                className="bg-gradient-to-r from-neutral-900 to-neutral-800 mt-5 cursor-pointer text-white font-medium"
              >
                Entrar com Google
                <img src="/google-icon.svg" alt="google Icon" className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                onClick={LoginGithub}
                size="lg"
                className="bg-gradient-to-r from-neutral-900 to-neutral-800 mt-5 cursor-pointer text-white font-medium"
              >
                Entrar com GitHub
                <Github className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}