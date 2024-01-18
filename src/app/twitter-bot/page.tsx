import React from "react";

const transation = {
  description: "",
  type: "UNKNOWN",
  source: "UNKNOWN",
  fee: 5001,
  feePayer: "8eoa9tC2sinfignGQYGVAAeR9qt1NBym7SKDCEuMgBac",
  signature:
    "3kBa1u529HKp4TCi1jrecqfJPVUy8BFrm718B7N4vYLBceGYmv2aJnTAFPefheLchnakpEgYeNEkxbsL4zW76V1C",
  slot: 242458606,
  timestamp: 1705536475,
  tokenTransfers: [
    {
      fromTokenAccount: "9Mx7dL99HxXiijbFNjVUykcNBmNqfd95KfYTAwPXvtkX",
      toTokenAccount: "7jaiZR5Sk8hdYN9MxTpczTcwbWpb5WEoxSANuUwveuat",
      fromUserAccount: "8eoa9tC2sinfignGQYGVAAeR9qt1NBym7SKDCEuMgBac",
      toUserAccount: "3uxNepDbmkDNq6JhRja5Z8QwbTrfmkKP8AKZV5chYDGG",
      tokenAmount: 25.982573,
      mint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
      tokenStandard: "UnknownStandard",
    },
  ],
  nativeTransfers: [],
  accountData: [
    {
      account: "8eoa9tC2sinfignGQYGVAAeR9qt1NBym7SKDCEuMgBac",
      nativeBalanceChange: -5001,
      tokenBalanceChanges: [],
    },
    {
      account: "BQS8ax69jinZuuoGpR51VZYkDoXj6SjFAy4WBnFqMhPV",
      nativeBalanceChange: 0,
      tokenBalanceChanges: [],
    },
    {
      account: "9Mx7dL99HxXiijbFNjVUykcNBmNqfd95KfYTAwPXvtkX",
      nativeBalanceChange: 0,
      tokenBalanceChanges: [
        {
          userAccount: "8eoa9tC2sinfignGQYGVAAeR9qt1NBym7SKDCEuMgBac",
          tokenAccount: "9Mx7dL99HxXiijbFNjVUykcNBmNqfd95KfYTAwPXvtkX",
          rawTokenAmount: {
            tokenAmount: "-25982573",
            decimals: 6,
          },
          mint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
        },
      ],
    },
    {
      account: "7jaiZR5Sk8hdYN9MxTpczTcwbWpb5WEoxSANuUwveuat",
      nativeBalanceChange: 0,
      tokenBalanceChanges: [
        {
          userAccount: "3uxNepDbmkDNq6JhRja5Z8QwbTrfmkKP8AKZV5chYDGG",
          tokenAccount: "7jaiZR5Sk8hdYN9MxTpczTcwbWpb5WEoxSANuUwveuat",
          rawTokenAmount: {
            tokenAmount: "25982573",
            decimals: 6,
          },
          mint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
        },
      ],
    },
    {
      account: "ComputeBudget111111111111111111111111111111",
      nativeBalanceChange: 0,
      tokenBalanceChanges: [],
    },
    {
      account: "MFv2hWf31Z9kbCa1snEPYctwafyhdvnV7FZnsebVacA",
      nativeBalanceChange: 0,
      tokenBalanceChanges: [],
    },
    {
      account: "4qp6Fx6tnZkY5Wropq9wUYgtFxXKwE6viZxFHg3rdAG8",
      nativeBalanceChange: 0,
      tokenBalanceChanges: [],
    },
    {
      account: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
      nativeBalanceChange: 0,
      tokenBalanceChanges: [],
    },
    {
      account: "2s37akK2eyBbp8DZgCm7RtsaEz8eJP3Nxd4urLHQv7yB",
      nativeBalanceChange: 0,
      tokenBalanceChanges: [],
    },
    {
      account: "Gnt27xtC473ZT2Mw5u8wZ68Z3gULkSTb5DuxJy7eJotD",
      nativeBalanceChange: 0,
      tokenBalanceChanges: [],
    },
  ],
  transactionError: null,
  instructions: [
    {
      accounts: [],
      data: "3DdGGhkhJbjm",
      programId: "ComputeBudget111111111111111111111111111111",
      innerInstructions: [],
    },
    {
      accounts: [
        "4qp6Fx6tnZkY5Wropq9wUYgtFxXKwE6viZxFHg3rdAG8",
        "BQS8ax69jinZuuoGpR51VZYkDoXj6SjFAy4WBnFqMhPV",
        "8eoa9tC2sinfignGQYGVAAeR9qt1NBym7SKDCEuMgBac",
        "2s37akK2eyBbp8DZgCm7RtsaEz8eJP3Nxd4urLHQv7yB",
        "9Mx7dL99HxXiijbFNjVUykcNBmNqfd95KfYTAwPXvtkX",
        "7jaiZR5Sk8hdYN9MxTpczTcwbWpb5WEoxSANuUwveuat",
        "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
        "2s37akK2eyBbp8DZgCm7RtsaEz8eJP3Nxd4urLHQv7yB",
        "Gnt27xtC473ZT2Mw5u8wZ68Z3gULkSTb5DuxJy7eJotD",
      ],
      data: "NANc1rs4FiM9Xk9ZoFVG9M",
      programId: "MFv2hWf31Z9kbCa1snEPYctwafyhdvnV7FZnsebVacA",
      innerInstructions: [
        {
          accounts: [
            "9Mx7dL99HxXiijbFNjVUykcNBmNqfd95KfYTAwPXvtkX",
            "7jaiZR5Sk8hdYN9MxTpczTcwbWpb5WEoxSANuUwveuat",
            "8eoa9tC2sinfignGQYGVAAeR9qt1NBym7SKDCEuMgBac",
          ],
          data: "3XmVUdGcS6nb",
          programId: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
        },
      ],
    },
  ],
  events: {},
};

export default async function TwitterBot() {
  const data = await fetch(
    `${process.env.API_URL}/twitter-bot?address=2s37akK2eyBbp8DZgCm7RtsaEz8eJP3Nxd4urLHQv7yB`,
    {
      method: "POST",
      body: JSON.stringify(transation),
    },
  ).then((res) => res.json() as Promise<{ address: string }>);
  // console.log("component response", data);
  return <div>{data.address}</div>;
}
