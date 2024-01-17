import { MarginfiClient, getConfig } from "@mrgnlabs/marginfi-client-v2";
import { Connection, PublicKey } from "@solana/web3.js";
import { NextResponse } from "next/server";
import { type Account, type TokenMetadata } from "~/lib/types";

export async function GET() {
  console.log("server");
  const response = new Response(JSON.stringify({ message: "success" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });

  return response;
}
