import { type BigNumber } from "bignumber.js";

export type TokenMetadata = {
  symbol: string;
  address: string;
  chainId: number;
  decimals: number;
  name: string;
  logoURI: string;
};

export type Account = {
  assets: number;
  liabilities: number;
  address: string;
  healthFactor: number;
  balances: {
    lending: {
      bankAddress: string;
      mintAddress: string;
      name: string | undefined;
      symbol: string | undefined;
      logo: string | undefined;
      assets: {
        quantity: number;
        usd: number;
        assetWeightMaint: number;
      };
      liabilities: {
        quantity: number;
        usd: number;
        liabilityWeightMaint: number;
      };
    }[];
    borrowing: {
      bankAddress: string;
      mintAddress: string;
      name: string | undefined;
      symbol: string | undefined;
      logo: string | undefined;
      assets: {
        quantity: number;
        usd: number;
        assetWeightMaint: number;
      };
      liabilities: {
        quantity: number;
        usd: number;
        liabilityWeightMaint: number;
      };
    }[];
  };
};
