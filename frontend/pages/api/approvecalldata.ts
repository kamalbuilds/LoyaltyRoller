// Generate approve calldata to allow 1inch Router to perform a swap
// /approvecalldata?tokenAddress=0x111111111117dc0aa78b770fa6a738034120c302&amount=1000
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req : NextApiRequest, res : NextApiResponse) {

    
  const url = "https://api.1inch.dev/swap/v5.2/137/approve/transaction";

  const { tokenAddress, amount } = req.query;

  if (!tokenAddress || !amount) {
    return res
      .status(400)
      .json({ error: "Missing 'tokenAddress' or 'amount' parameter in the request." });
  }

  const config = {
    headers: {
      Authorization: "Bearer yaKQVmmFk88T7BoxB8SFqUuE4YHEWu2F",
    },
    params: {
      tokenAddress,
      amount,
    },
  };

  try {
    const response = await axios.get(url, config);
    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
