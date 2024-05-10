import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req : NextApiRequest, res: NextApiResponse) {
  const url = "https://api.1inch.dev/fusion/quoter/v1.0/137/quote/receive";

  const config = {
    headers: {
      Authorization: `Bearer ${process.env.APIONEINCH}`,
    },
    params: {
      fromTokenAddress: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
      toTokenAddress: "0x6b175474e89094c44da98b954eedeac495271d0f",
      amount: "100000",
      walletAddress: "0x0000000000000000000000000000000000000000",
      enableEstimate: "false",
    },
  };

  const body = req.body;
  
//   {
//     auctionDuration: 10,
//     auctionStartAmount: "string",
//     auctionEndAmount: "string",
//     points: ["string"],
//   };

  try {
    const response = await axios.post(url, body, config);
    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
