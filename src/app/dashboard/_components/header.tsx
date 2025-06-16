"use client"

import Link from "next/link"
import { LayoutDashboard, LogOut, PiggyBank, UserRound } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MobileMenu } from "./menu-mobile"
import { logout } from "../_actions/logout"

export function Header() {

  async function handleLogout() {
    await logout()
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">

      <div className="flex h-16 items-center justify-between w-full px-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-2 font-semibold">
          <Link href="/dashboard" className="flex items-center gap-1 text-zinc-900">
            <PiggyBank className="h-6 w-6 mr-2" />
            <span className="text-xl font-bold">
              Apoia.ai
            </span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="/dashboard" className="text-sm font-medium transition-colors flex items-center gap-2 hover:text-blue-800">
            <LayoutDashboard className="h-5 w-5"/>
            Dashboard
          </Link>
          <Link href="/dashboard/me" className="text-sm font-medium transition-colors flex items-center gap-2 hover:text-blue-800">
            <UserRound className="h-5 w-5"/>
            Meu perfil
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="text-red-600 hover:text-red-400 hover:bg-red-50 cursor-pointer ml-2"
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5" />
            Sair
          </Button>
        </nav>
        
        <MobileMenu />
      </div>
    </header>
  )
}
