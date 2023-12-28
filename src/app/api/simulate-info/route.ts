import { NextResponse } from "next/server";

export async function POST() {
  // const response = new NextResponse(JSON.stringify({ message: "hi" }), {
  //   status: 200,
  //   headers: { "Content-Type": "application/json" },
  // });
  // console.log("response: ", response);

  // return response;

  return NextResponse.json({ message: "hi" }, { status: 200 });
}
