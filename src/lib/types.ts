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
      price: number;
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
      price: number;
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

export type SPLTransaction = {
  description: string;
  type: string;
  source: string;
  fee: number;
  feePayer: string;
  signature: string;
  slot: number;
  timestamp: number;
  tokenTransfers: {
    fromTokenAccount: string;
    toTokenAccount: string;
    fromUserAccount: string;
    toUserAccount: string;
    tokenAmount: number;
    mint: string;
    tokenStandard: string;
  }[];

  nativeTransfers: [];
  accountData: {
    account: string;
    nativeBalanceChange: number;
    tokenBalanceChanges: {
      userAccount: string;
      tokenAccount: string;
      rawTokenAmount: {
        tokenAmount: string;
        decimals: number;
      };
      mint: string;
    }[];
  }[];
  transactionError: null;
};
