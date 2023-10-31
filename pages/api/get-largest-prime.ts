// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { DEVELOPER_NAME } from "@/lib/developer-name";
import { getLargestPrime } from "@/lib/get-largest-prime";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const maxQueryParam = req.query.maximum;

  if (typeof maxQueryParam !== "string") {
    res.status(400).json("Must specify 'maximum' in query params");
    return;
  }

  const maxValue = Number.parseInt(maxQueryParam);

  const largestPrime = getLargestPrime(maxValue);

  console.log("Logging from get-largest-prime API route");

  console.log(
    JSON.stringify({
      largestPrime,
      strategy: "client-fetching",
      developer: DEVELOPER_NAME,
    })
  );

  res.status(200).json(largestPrime);
}
