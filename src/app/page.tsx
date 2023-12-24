import { MarginfiClient, getConfig } from "@mrgnlabs/marginfi-client-v2";
import { Connection } from "@solana/web3.js";
import { BigNumber } from "bignumber.js";

import Image from "next/image";
import { type TokenMetadata } from "~/lib/types";

export const dynamic = "force-dynamic";

const bankMints = [
  "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
  "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",
  "So11111111111111111111111111111111111111112",
];

const connection = new Connection(
  "https://mrgn.rpcpool.com/c293bade994b3864b52c6bbbba4b",
  "confirmed",
);

export default async function HomePage() {
  // eslint-disable-next-line
  const config = await getConfig("production");

  const marginfiClient = await MarginfiClient.fetch(
    config,
    // eslint-disable-next-line
    {} as any,
    connection,
  );

  const banks = marginfiClient.banks.entries();

  const tokenMetadata = await fetch(
    "https://storage.googleapis.com/mrgn-public/mrgn-token-metadata-cache.json",
  );
  const tokenMetadataJson = (await tokenMetadata.json()) as TokenMetadata[];

  return (
    <main className="flex min-h-screen flex-col items-center justify-center overflow-y-auto overflow-x-hidden bg-zinc-900">
      <h1 className="pt-8 text-center text-4xl text-zinc-100 sm:px-4 sm:pt-0 sm:text-6xl">
        marginfi borrow availability
      </h1>
      <div className="container grid grid-flow-row grid-cols-1 gap-[16px] px-4 py-8 text-zinc-100 sm:grid-cols-3">
        {Array.from(banks)
          .filter((bankEntry) =>
            bankMints.includes(bankEntry[1].mint.toBase58()),
          )
          .sort((a, b) =>
            a[1].mint.toBase58().localeCompare(b[1].mint.toBase58()),
          )
          .map((bankEntry) => {
            const bank = bankEntry[1];

            const tokenMetadata = tokenMetadataJson.find(
              (token: { address: string }) =>
                token.address === bank.mint.toBase58(),
            );

            const priceInfo = marginfiClient.oraclePrices.get(bankEntry[0])!;

            const borrowLimit = bank.config.borrowLimit;
            const borrowLimitBN = new BigNumber(borrowLimit).multipliedBy(
              Math.pow(10, bank.mintDecimals),
            );

            const totalLiabilityQuantityBN = bank.getTotalLiabilityQuantity();

            const totalBorrowQuantityRemainingBN = borrowLimitBN.minus(
              totalLiabilityQuantityBN,
            );
            const totalBorrowQuantityRemaining = Math.max(
              totalBorrowQuantityRemainingBN
                .div(Math.pow(10, bank.mintDecimals))
                .decimalPlaces(2)
                .toNumber(),
              0,
            );

            const totalBorrowValueRemaining = Math.max(
              bank
                .computeUsdValue(priceInfo, totalBorrowQuantityRemainingBN, 2)
                .decimalPlaces(2)
                .toNumber(),
              0,
            );

            const percentBorrowed = totalLiabilityQuantityBN
              .div(borrowLimitBN)
              .multipliedBy(100)
              .decimalPlaces(2)
              .toNumber();

            const borrowAPY = bank
              .computeInterestRates()
              .borrowingRate.multipliedBy(100)
              .decimalPlaces(2)
              .toNumber();

            return (
              <div
                key={bank.mint.toBase58()}
                className="flex w-full flex-col items-center rounded-[8px] border border-zinc-400 bg-zinc-700 p-4 shadow-md"
              >
                <div className="mb-2 flex w-full flex-row items-center justify-between">
                  <p className="text-left text-sm font-[300] text-zinc-300">
                    {borrowAPY}% apr
                  </p>

                  <p className="text-right text-sm font-[300] text-zinc-300">
                    {percentBorrowed.toLocaleString()}% usage
                  </p>
                </div>

                {tokenMetadata && (
                  <Image
                    src={tokenMetadata?.logoURI}
                    alt={tokenMetadata?.name}
                    width={64}
                    height={64}
                    className="mb-2 rounded-full"
                  />
                )}

                <p className="text-2xl">
                  {totalBorrowQuantityRemaining.toLocaleString()}{" "}
                  {tokenMetadata?.name}
                </p>

                <p className="text-xl text-zinc-400">
                  ${totalBorrowValueRemaining.toLocaleString()}
                </p>

                <div className="mt-2 flex w-full flex-row items-center justify-between">
                  <p className="text-center text-sm font-[300] text-zinc-300">
                    ${priceInfo?.price.toNumber().toFixed(0)}
                  </p>
                </div>
              </div>
            );
          })}
      </div>
    </main>
  );
}
