import React from "react";
import { Connection, type PublicKey } from "@solana/web3.js";
import { getConfig, MarginfiClient } from "@mrgnlabs/marginfi-client-v2";
import { type TokenMetadata } from "~/lib/types";

const connection = new Connection(
  "https://mrgn.rpcpool.com/c293bade994b3864b52c6bbbba4b",
  "confirmed",
);

export default async function HealthFactor({ pk }: { pk: PublicKey }) {
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

  return <div>{pk.toBase58()}</div>;
}
