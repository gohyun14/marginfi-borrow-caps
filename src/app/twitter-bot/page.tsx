import React from "react";

export default async function TwitterBot() {
  const data = await fetch(
    `${process.env.API_URL}/twitter-bot?address=4yhXa4iERFGma3T1HMMjH8nJ8EdFqbahCV5Yomm8Z3do`,
    {
      method: "GET",
    },
  ).then((res) => res.json() as Promise<{ address: string }>);
  console.log("component", data);
  return <div>{data.address}</div>;
}
