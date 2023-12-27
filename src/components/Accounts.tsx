import React from "react";

import { type Account } from "~/lib/types";
import SimulatedHealthFactor from "./SimulatedHealthFactor";
import HealthFactor from "./HealthFactor";

export default function Accounts({ accounts }: { accounts: Account[] }) {
  const account = accounts[0]!;

  return (
    <>
      <p className="mb-4 text-center text-sm italic">
        {accounts.length} account{accounts.length > 1 && "s"} found
      </p>

      <h3 className="mb-8 text-center font-medium md:text-lg">
        Account:{" "}
        <span className="font-mono text-xs md:text-base">
          {account.address}
        </span>
      </h3>

      <HealthFactor account={account} />

      <SimulatedHealthFactor account={account} />
    </>
  );
}
