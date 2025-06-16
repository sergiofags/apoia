"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, LogOut, LayoutDashboard, UserRound } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { DialogTitle } from "@/components/ui/dialog"
import { logout } from "../_actions/logout"

export function MobileMenu() {
  const [open, setOpen] = useState(false)

  async function handleLogout() {
      await logout()
    }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild className="md:hidden">
        <Button variant="ghost" size="icon">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Abrir menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[240px] sm:w-[300px] p-5">
        <DialogTitle>
          Menu
        </DialogTitle>

        <div className="flex flex-col gap-6 py-6">
          <Link
            href="/dashboard"
            className="flex gap-2 text-sm font-medium transition-colors hover:text-primary"
            onClick={() => setOpen(false)}
          >
            <LayoutDashboard className="h-5 w-5"/>
            Dashboard
          </Link>
          <Link
            href="/dashboard/me"
            className="flex gap-2 text-sm font-medium transition-colors hover:text-primary"
            onClick={() => setOpen(false)}
          >
            <UserRound className="h-5 w-5"/>
            Meu perfil
          </Link>

          <Button
            variant="ghost"
            className="justify-start px-0 text-red-500 hover:text-red-600 hover:bg-transparent cursor-pointer gap-2"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" />
            Sair
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
