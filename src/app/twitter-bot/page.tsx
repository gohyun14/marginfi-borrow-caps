import React from "react";

const TwitterBot: React.FC = async () => {
  const data = await fetch("https://hi.com", {
    method: "GET",
  });
  console.log("component", data);
  return <div>TwitterBot</div>;
};

export default TwitterBot;
