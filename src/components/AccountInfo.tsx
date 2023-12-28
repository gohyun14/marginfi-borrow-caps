import { type PublicKey } from "@solana/web3.js";
import { getAccounts } from "~/server/actions/actions";
import Accounts from "./Accounts";

export default async function AccountInfo({ pk }: { pk: PublicKey }) {
  const accounts = await getAccounts(pk.toString());

  if (!accounts) {
    return <p>Something went wrong</p>;
  }

  return (
    <div className="container px-4 py-8">
      {!!accounts.length ? (
        <Accounts accounts={accounts} />
      ) : (
        <p>No accounts found for this address</p>
      )}
    </div>
  );
}
