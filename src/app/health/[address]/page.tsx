import { NameRegistryState, getDomainKeySync } from "@bonfida/spl-name-service";
import { Connection, PublicKey } from "@solana/web3.js";

import Link from "next/link";
import AccountInfo from "~/components/AccountInfo";

const connection = new Connection(
  "https://mrgn.rpcpool.com/c293bade994b3864b52c6bbbba4b",
  "confirmed",
);

export default async function AddressPage({
  params,
}: {
  params: { address: string };
}) {
  const address = params.address;
  let error = false;
  let pk: PublicKey | undefined = undefined;

  if (address.endsWith(".sol")) {
    try {
      const { pubkey } = getDomainKeySync(address);
      const { registry } = await NameRegistryState.retrieve(connection, pubkey);

      pk = registry.owner;
    } catch (e) {
      error = true;
    }
  } else {
    try {
      pk = new PublicKey(address);
    } catch (e) {
      error = true;
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center overflow-y-auto overflow-x-hidden bg-zinc-900 text-zinc-100">
      {error ? (
        <>
          <p>Invalid domain name provided</p>
          <Link href="/health">New search</Link>
        </>
      ) : (
        <>
          <p>{address}</p>
          {pk && <AccountInfo pk={pk} />}
        </>
      )}
    </main>
  );
}
