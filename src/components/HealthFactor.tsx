import React from "react";
import { Connection, type PublicKey } from "@solana/web3.js";
import {
  getConfig,
  MarginfiClient,
  MarginRequirementType,
} from "@mrgnlabs/marginfi-client-v2";
import { type TokenMetadata } from "~/lib/types";
import Image from "next/image";
import SimulatedHealthFactor from "./SimulatedHealthFactor";

const connection = new Connection(
  "https://mrgn.rpcpool.com/c293bade994b3864b52c6bbbba4b",
  "confirmed",
);

export default async function HealthFactor({ pk }: { pk: PublicKey }) {
  const usDollarFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const config = getConfig("production");

  const marginfiClient = await MarginfiClient.fetch(
    config,
    // eslint-disable-next-line
    {} as any,
    connection,
  );

  const tokenMetadata = await fetch(
    "https://storage.googleapis.com/mrgn-public/mrgn-token-metadata-cache.json",
  );
  const tokenMetadataJson = (await tokenMetadata.json()) as TokenMetadata[];

  const accountsRaw = await marginfiClient.getMarginfiAccountsForAuthority(pk);

  const accounts = accountsRaw.map((account) => {
    const { assets, liabilities } = account.computeHealthComponents(2);
    const maintenanceComponentsWithBiasAndWeighted =
      account.computeHealthComponents(1);
    const healthFactor =
      maintenanceComponentsWithBiasAndWeighted.assets.isZero()
        ? 1
        : maintenanceComponentsWithBiasAndWeighted.assets
            .minus(maintenanceComponentsWithBiasAndWeighted.liabilities)
            .dividedBy(maintenanceComponentsWithBiasAndWeighted.assets)
            .toNumber();

    const balances = account.activeBalances.map((balance) => {
      const bank = marginfiClient.banks.get(balance.bankPk.toBase58())!;
      const priceInfo = marginfiClient.oraclePrices.get(
        balance.bankPk.toBase58(),
      );

      const tokenMetadata = tokenMetadataJson.find(
        (token: { address: string }) => token.address === bank.mint.toBase58(),
      );

      const { assets, liabilities } = balance.computeQuantityUi(bank);
      const assetsUsd = bank.computeAssetUsdValue(
        priceInfo!,
        balance.assetShares,
        2,
        0,
      );
      const liabilitiesUsd = bank.computeLiabilityUsdValue(
        priceInfo!,
        balance.liabilityShares,
        2,
        0,
      );

      return {
        bankAddress: bank.address.toBase58(),
        mintAddress: bank.mint.toBase58(),
        name: tokenMetadata?.name,
        symbol: tokenMetadata?.symbol,
        logo: tokenMetadata?.logoURI,
        assets: {
          quantity: !assetsUsd.isZero() ? assets.toNumber() : 0,
          usd: assetsUsd.toNumber(),
        },
        liabilities: {
          quantity: !liabilitiesUsd.isZero() ? liabilities.toNumber() : 0,
          usd: liabilitiesUsd.toNumber(),
        },
      };
    });

    const lendingPositions = balances.filter(
      (balance) => balance.assets.quantity > 0,
    );
    const borrowingPositions = balances.filter(
      (balance) => balance.liabilities.quantity > 0,
    );

    return {
      assets: assets.toNumber(),
      liabilities: liabilities.toNumber(),
      address: account.address.toBase58(),
      healthFactor: parseFloat((healthFactor * 100).toFixed(2)),
      balances: {
        lending: lendingPositions,
        borrowing: borrowingPositions,
      },
    };
  });

  return (
    <div className="container px-4 py-8">
      {accounts && accounts.length > 0 && (
        <div>
          <p className="mb-4 text-center text-sm italic">
            {accounts.length} account{accounts.length > 1 && "s"} found
          </p>

          {accounts.map((account, index) => (
            <div key={index} className="border-border mb-4 mt-8 pb-4">
              <h3 className="mb-8 text-center font-medium md:text-lg">
                Account:{" "}
                <span className="font-mono text-xs md:text-base">
                  {account.address}
                </span>
              </h3>

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
                              : usDollarFormatter.format(
                                  balance.liabilities.usd,
                                )}
                          </li>
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <SimulatedHealthFactor />
    </div>
  );
}
