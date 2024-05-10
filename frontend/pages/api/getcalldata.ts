
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req : NextApiRequest, res : NextApiResponse) {
  const { chain , params } = req.query;

  if (!chain) {
    return res.status(400).json({ error: "Missing 'chain' parameter in the request." });
  }

  const url = `https://api.1inch.dev/swap/v5.2/${chain}/swap`;

  const config = {
    headers: {
      Authorization: `Bearer ${process.env.APIONEINCH}`,
    },
    params: params,
  };

  try {
    const response = await axios.get(url, config);
    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
