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
      ].map((x) => [x[0] as string, x[1]?.toString()]),
    ),
  );

  const assets = account.balances.lending.reduce(
    (acc, balance) =>
      acc +
      balance.assets.quantity *
        +tokenPrices.get(balance.symbol!)! *
        balance.assets.assetWeightMaint,
    0,
  );
  const liabilities = account.balances.borrowing.reduce(
    (acc, balance) =>
      acc +
      balance.liabilities.quantity *
        +tokenPrices.get(balance.symbol!)! *
        balance.liabilities.liabilityWeightMaint,
    0,
  );

  const healthFactor =
    assets === 0 ? 1 : Math.max(((assets - liabilities) / assets) * 100, 0);

  const handleReset = () => {
    setTokenPrices(
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
        ].map((x) => [x[0] as string, x[1]?.toString()]),
      ),
    );
  };

  return (
    <div>
      <div className="flex flex-col items-center gap-2">
        <h4 className="font-medium md:text-lg">Asset Values ($)</h4>
        <ul className="flex flex-row flex-wrap items-center justify-center gap-3">
          {Array.from(tokenPrices.keys()).map((token) => (
            <li key={token} className="flex flex-col">
              <label htmlFor={token} className="text-sm">
                {token}
              </label>
              <input
                name={token}
                type="text"
                value={tokenPrices.get(token)?.toString()}
                onChange={(e) => {
                  const val = e.target.value;

                  if (val === "" || /^-?(\d+\.?\d*|\.\d+)$/.test(val)) {
                    setTokenPrices(new Map(tokenPrices.set(token, val)));
                  }
                }}
                pattern="^-?(\d+\.?\d*|\.\d+)$"
                inputMode="decimal"
                className="rounded-md border bg-zinc-100 px-2 py-1 text-black transition focus:outline-none focus:ring-2 focus:ring-rose-600"
              />
            </li>
          ))}
        </ul>
        <button
          aria-label="Reset"
          onClick={handleReset}
          className="rounded-md bg-zinc-500 px-2 py-1 text-base transition hover:bg-zinc-600 focus:outline-none focus:ring-2 focus:ring-rose-600 active:bg-zinc-500"
        >
          Reset
        </button>
      </div>

      <div className="mb-4 mt-5 flex flex-col gap-3 pb-4">
        <div className="flex w-full flex-col items-center">
          <h4 className="mb-1 font-medium md:text-lg">
            Health factor: {healthFactor.toFixed(2)}%
          </h4>
          <div className="relative h-2 w-full max-w-xl overflow-hidden rounded-full bg-zinc-400">
            <div className="absolute h-2 w-full rounded-full bg-gradient-to-l from-green-600 via-yellow-300 to-red-600" />
            <div
              style={{ width: `${100 - healthFactor}%` }}
              className="absolute right-0 h-2 rounded-r-full bg-zinc-400"
            />
          </div>
        </div>

        <div className="flex flex-col justify-center gap-2">
          <div className="flex w-full flex-col items-center">
            <h4 className="mb-1 font-medium md:text-lg">Lending</h4>
            {/* container */}
            <div className="flex flex-row flex-wrap items-center justify-center gap-3">
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
                        +tokenPrices.get(balance.symbol!)! <
                      0.01
                        ? `$${
                            balance.assets.quantity *
                            +tokenPrices.get(balance.symbol!)!
                          }`
                        : usDollarFormatter.format(
                            balance.assets.quantity *
                              +tokenPrices.get(balance.symbol!)!,
                          )}
                    </li>
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <div className="flex w-full flex-col items-center">
            <h4 className="mb-1 text-lg font-medium">Borrowing</h4>
            {/* container */}
            <div className="flex flex-row flex-wrap items-center justify-center gap-3">
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
                        +tokenPrices.get(balance.symbol!)! <
                      0.01
                        ? `$${
                            balance.liabilities.quantity *
                            +tokenPrices.get(balance.symbol!)!
                          }`
                        : usDollarFormatter.format(
                            balance.liabilities.quantity *
                              +tokenPrices.get(balance.symbol!)!,
                          )}
                    </li>
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
