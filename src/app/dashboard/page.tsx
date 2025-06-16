import { DonationTable } from "./_components/donates";
import { Stats } from "./_components/analytics";
import { auth } from '@/lib/auth'
import {redirect } from 'next/navigation'
import CreateAccountButton from "./_components/create-account-button";
import { getStripeDashboard } from "./_data-access/get-stripe-dashboard";
import { Button } from "@/components/ui/button";

export default async function Dashboard() {
  const session = await auth();

  if (!session?.user) {
    redirect("/")
  }

  const loginLink = await getStripeDashboard(session.user?.connectedStripeAccountID)

  return (
    <div className="p-4">
      <section className="flex items-center justify-between mb-4">
        <div className="w-full flex items-center gap-2 justify-between">
          <h1 className="text-2xl font-semibold">Minha conta</h1>

          { loginLink && (
            <a href={loginLink} className="bg-gradient-to-r from-zinc-900 to-gray-800 px-6 py-2 font-semibold rounded-md text-white cursor-pointer">
              Ajustar conta
            </a>
          )}
        </div>
      </section>

      { !session.user.connectedStripeAccountID && (
        <CreateAccountButton />
      )}

      <Stats userId={session.user.id} stripeAccountId={session.user.connectedStripeAccountID ?? ""} />

      <h2 className="text-2xl font-semibold mb-4">Últimas doações</h2>

      { session.user.connectedStripeAccountID && (
        <DonationTable />
      )}
      
    </div>
  );
}