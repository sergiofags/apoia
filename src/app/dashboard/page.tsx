import { DonationTable } from "./_components/donates";
import { Stats } from "./_components/analytics";
import { auth } from '@/lib/auth'
import {redirect } from 'next/navigation'
import CreateAccountButton from "./_components/create-account-button";
import { getLoginOnBoardAccount } from "./_data-access/create-onboard-account";


export default async function Dashboard() {
  const session = await auth();

  if (!session?.user) {
    redirect("/")
  }

  const accountUrl = await getLoginOnBoardAccount(session.user.connectedStripeAccountID)

  return (
    <div className="p-4">
      <section className="flex items-center justify-between mb-4">
        <div className="w-full flex items-center gap-2 justify-between">
          <h1 className="text-2xl font-semibold">Minha conta</h1>

          { accountUrl && (
            <a href={accountUrl} className="bg-zinc-900 px-4 py-1 rounded-md text-white cursor-pointer">
              Ajustar conta
            </a>
          )}
        </div>
      </section>

      { !session.user.connectedStripeAccountID && (
        <CreateAccountButton />
      )}

      <Stats />


      <h2 className="text-2xl font-semibold mb-2">Últimas doações</h2>
      <DonationTable />
    </div>
  );
}