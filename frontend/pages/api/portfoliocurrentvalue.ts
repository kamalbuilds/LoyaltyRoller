import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const url = "https://api.1inch.dev/portfolio/v3/portfolio/overview/assets/current_value";

  const { addresses, chain_id } = req.query;
  console.log("Addressses", addresses, chain_id);

  if (!addresses || !chain_id) {
    return res
      .status(400)
      .json({ error: "Missing 'addresses' or 'chain_id' parameter in the request." });
  }

  const config = {
    headers: {
      Authorization: "Bearer okz7YzxXA8DPc7eehhXbolnROttzvKYA",
    },
    params: {
      addresses: addresses,
      chain_id,
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
