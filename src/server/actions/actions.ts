"use server";

import { MarginfiClient, getConfig } from "@mrgnlabs/marginfi-client-v2";
import { Connection, PublicKey } from "@solana/web3.js";
import { type Account, type TokenMetadata } from "~/lib/types";

export async function getAccounts(address: string) {
  let pk: PublicKey;

  if (!address) {
    return null;
  }

  try {
    pk = new PublicKey(address);
  } catch (e) {
    return null;
  }

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

  const tokenMetadata = await fetch(
    "https://storage.googleapis.com/mrgn-public/mrgn-token-metadata-cache.json",
  );
  const tokenMetadataJson = (await tokenMetadata.json()) as TokenMetadata[];

  const accountsRaw = await marginfiClient.getMarginfiAccountsForAuthority(pk);

  const accounts: Account[] = accountsRaw.map((account) => {
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
        price: priceInfo!.price.toNumber(),
        assets: {
          quantity: !assetsUsd.isZero() ? assets.toNumber() : 0,
          usd: assetsUsd.toNumber(),
          assetWeightMaint: bank.config.assetWeightMaint.toNumber(),
        },
        liabilities: {
          quantity: !liabilitiesUsd.isZero() ? liabilities.toNumber() : 0,
          usd: liabilitiesUsd.toNumber(),
          liabilityWeightMaint: bank.config.liabilityWeightMaint.toNumber(),
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

  return accounts;
}
