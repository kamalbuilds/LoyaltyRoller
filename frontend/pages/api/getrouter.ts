
import axios from "axios";
import { NextApiRequest , NextApiResponse } from "next";

export default async function handler(req : NextApiRequest, res : NextApiResponse)  {
  const { chainid, params } = req.query;

  if (!chainid) {
    return res.status(400).json({ error: "Missing 'url' parameter in the request." });
  }

  const url = `https://api.1inch.dev/swap/v5.2/${chainid}/quote`;

  const config = {
    headers: {
      Authorization: `Bearer ${process.env.APIONEINCH}`,
    },
    params: params ? params : {},
  };

  try {
    const response = await axios.get(url, config);
    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
