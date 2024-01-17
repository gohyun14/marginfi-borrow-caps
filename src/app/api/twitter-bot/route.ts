import { MarginfiClient, getConfig } from "@mrgnlabs/marginfi-client-v2";
import { Connection, PublicKey } from "@solana/web3.js";
import { NextResponse } from "next/server";
import { type Account, type TokenMetadata } from "~/lib/types";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get("address");

  const response = new Response(
    JSON.stringify({ address: address ?? "NONE" }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    },
  );
  console.log("response: ", response);

  return response;
}
