import { MarginfiClient, getConfig } from "@mrgnlabs/marginfi-client-v2";
import { Connection } from "@solana/web3.js";
import { BigNumber } from "bignumber.js";
import { type SPLTransaction, type TokenMetadata } from "~/lib/types";

/*
bank addresses:
usdc:
 - mint: EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v
 - program: 2s37akK2eyBbp8DZgCm7RtsaEz8eJP3Nxd4urLHQv7yB
 - vault: 7jaiZR5Sk8hdYN9MxTpczTcwbWpb5WEoxSANuUwveuat
sol:
 - mint: So11111111111111111111111111111111111111112
 - program: CCKtUs6Cgwo4aaQUmBPmyoApH2gUDErxNZCAntD6LYGh
 - vault: 
usdt:
 - mint: Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB
 - program: 
 - vault: 
*/

export async function POST(request: Request) {
  // const { searchParams } = new URL(request.url);
  // const address = searchParams.get("address");

  const tokenMetadata = await fetch(
    "https://storage.googleapis.com/mrgn-public/mrgn-token-metadata-cache.json",
  ).then(async (res) => (await res.json()) as TokenMetadata[]);

  const connection = new Connection(
    "https://mrgn.rpcpool.com/c293bade994b3864b52c6bbbba4b",
    "confirmed",
  );
  const config = getConfig("production");
  const marginfiClient = await MarginfiClient.fetch(
    config,
    // eslint-disable-next-line
    {} as any,
    connection,
  );

  const transactionData = (await request.json()) as SPLTransaction;

  const mintAddress = transactionData.tokenTransfers[0]?.mint;

  const bank = Array.from(marginfiClient.banks.values()).find(
    (bank) => bank.mint.toBase58() === mintAddress,
  );

  if (
    !bank ||
    transactionData.tokenTransfers[0]?.toTokenAccount !==
      bank.liquidityVault.toBase58()
  ) {
    return new Response(JSON.stringify({ message: "failure" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  const repaidAmount = transactionData.tokenTransfers[0]?.tokenAmount;

  const priceInfo = marginfiClient.oraclePrices.get(bank.address.toBase58())!;

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

  console.log("totalBorrowQuantityRemaining: ", totalBorrowValueRemaining);

  const message = `🤑 Repaid ${repaidAmount.toFixed(
    2,
  )} USDC; ${totalBorrowQuantityRemaining} remaining ($${totalBorrowValueRemaining})`;

  const response = new Response(JSON.stringify({ message }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
  // console.log("server response: ", response);

  return response;
}
