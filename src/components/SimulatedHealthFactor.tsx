"use client";

import Image from "next/image";
import { useState } from "react";

import { type Account } from "~/lib/types";
import { usDollarFormatter } from "~/lib/utils/utils";

export default function SimulatedHealthFactor({
  account,
}: {
  account: Account;
}) {
  const [tokenPrices, setTokenPrices] = useState(
    new Map(
      [
        ...account.balances.lending.map((balance) => [
          balance.symbol!,
          balance.assets.usd / balance.assets.quantity,
        ]),
        ...account.balances.borrowing.map((balance) => [
          balance.symbol!,
          balance.liabilities.usd / balance.liabilities.quantity,
        ]),
      ].map((x) => [x[0] as string, x[1] as number]),
    ),
  );

  const assets = account.balances.lending.reduce(
    (acc, balance) =>
      acc +
      balance.assets.quantity *
        (tokenPrices.get(balance.symbol!) ?? balance.assets.usd) *
        balance.assets.assetWeightMaint,
    0,
  );
  const liabilities = account.balances.borrowing.reduce(
    (acc, balance) =>
      acc +
      balance.liabilities.quantity *
        (tokenPrices.get(balance.symbol!) ?? balance.liabilities.usd) *
        balance.liabilities.liabilityWeightMaint,
    0,
  );

  const healthFactor =
    assets === 0 ? 1 : Math.max(((assets - liabilities) / assets) * 100, 0);
  // console.log(healthFactor, account.healthFactor);

  return (
    <>
      <div>
        <div className="flex flex-row gap-3">
          {Array.from(tokenPrices.keys()).map((token) => (
            <div key={token}>
              <label htmlFor={token}>{token}</label>
              <input
                name={token}
                value={tokenPrices.get(token)}
                onChange={(e) =>
                  setTokenPrices(
                    new Map(tokenPrices.set(token, Number(e.target.value))),
                  )
                }
                className="text-black"
              />
            </div>
          ))}
        </div>
        <div>Simulated Account Info</div>
        <div className="mb-4 mt-8 pb-4">
          <p className="mb-4 text-center text-sm italic">
            Health factor: {healthFactor.toFixed(2)}%
          </p>
          <div className="relative h-2 w-full overflow-hidden rounded-full bg-zinc-400">
            <div className="absolute h-2 w-full rounded-full bg-gradient-to-l from-green-600 via-yellow-300 to-red-600" />
            <div
              style={{ width: `${100 - healthFactor}%` }}
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
                        {balance.assets.quantity *
                          (tokenPrices.get(balance.symbol!) ??
                            balance.assets.usd) <
                        0.01
                          ? `$${
                              balance.assets.quantity *
                              (tokenPrices.get(balance.symbol!) ??
                                balance.assets.usd)
                            }`
                          : usDollarFormatter.format(
                              balance.assets.quantity *
                                (tokenPrices.get(balance.symbol!) ??
                                  balance.assets.usd),
                            )}
                      </li>
                    </ul>
                    <p>
                      {balance.price} -{" "}
                      {balance.assets.usd / balance.assets.quantity}
                    </p>
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
                        {balance.liabilities.quantity *
                          (tokenPrices.get(balance.symbol!) ??
                            balance.liabilities.usd) <
                        0.01
                          ? `$${
                              balance.liabilities.quantity *
                              (tokenPrices.get(balance.symbol!) ??
                                balance.liabilities.usd)
                            }`
                          : usDollarFormatter.format(
                              balance.liabilities.quantity *
                                (tokenPrices.get(balance.symbol!) ??
                                  balance.liabilities.usd),
                            )}
                      </li>
                    </ul>
                    <p>
                      {balance.price} -{" "}
                      {balance.liabilities.usd / balance.liabilities.quantity}
                    </p>
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
