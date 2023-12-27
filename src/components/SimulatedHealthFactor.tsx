"use client";

import Image from "next/image";
import React from "react";
import { OraclePrice } from "@mrgnlabs/marginfi-client-v2";

import { type Account } from "~/lib/types";
import { usDollarFormatter } from "~/lib/utils/utils";

export default function SimulatedHealthFactor({
  account,
}: {
  account: Account;
}) {
  return (
    <>
      <div>
        <div className="border-border mb-4 mt-8 pb-4">
          <p className="mb-4 text-center text-sm italic">
            Health factor: {account.healthFactor}%
          </p>
          <div className="relative h-2 w-full rounded-full bg-zinc-400">
            <div className="absolute h-2 w-full rounded-full bg-gradient-to-l from-green-600 via-yellow-300 to-red-600" />
            <div
              style={{ width: `${100 - account.healthFactor}%` }}
              className="absolute right-0 h-2 rounded-r-full bg-zinc-400"
            />
          </div>

          <div className="flex flex-col justify-center">
            <div className="mb-3 flex w-full flex-col items-center">
              <h4 className="mb-2 font-medium md:text-lg">Lending</h4>
              {/* container */}
              <div className="flex flex-row flex-wrap gap-3">
                {account.balances.lending.length === 0 && (
                  <p className="text-destructive-foreground">
                    No open lending positions
                  </p>
                )}
                {/* cards */}
                {account.balances.lending.map((balance, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center gap-2 rounded-md border border-zinc-400 bg-zinc-700 p-2 text-center"
                  >
                    <Image
                      src={balance.logo!}
                      alt={balance.name!}
                      width={30}
                      height={30}
                      unoptimized
                      className="rounded-full"
                    />
                    <ul className="font-mono text-sm">
                      <li>
                        {balance.assets.quantity.toLocaleString()}{" "}
                        {balance.symbol}
                      </li>
                      <li>
                        {balance.assets.usd < 0.01
                          ? `$${balance.assets.usd}`
                          : usDollarFormatter.format(balance.assets.usd)}
                      </li>
                    </ul>
                  </div>
                ))}
              </div>
            </div>
            <div className="mb-3 flex w-full flex-col items-center">
              <h4 className="mb-2 text-lg font-medium">Borrowing</h4>
              {/* container */}
              <div className="flex flex-row flex-wrap gap-3">
                {account.balances.borrowing.length === 0 && (
                  <p className="text-destructive-foreground">
                    No open borrowing positions
                  </p>
                )}
                {/* cards */}
                {account.balances.borrowing.map((balance, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center gap-2 rounded-md border border-zinc-400 bg-zinc-700 p-2 text-center"
                  >
                    <Image
                      src={balance.logo!}
                      alt={balance.name!}
                      width={30}
                      height={30}
                      unoptimized
                      className="rounded-full"
                    />
                    <ul className="font-mono text-sm">
                      <li>
                        {balance.liabilities.quantity.toLocaleString()}{" "}
                        {balance.symbol}
                      </li>
                      <li>
                        {balance.liabilities.usd < 0.01
                          ? `$${balance.liabilities.usd}`
                          : usDollarFormatter.format(balance.liabilities.usd)}
                      </li>
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
