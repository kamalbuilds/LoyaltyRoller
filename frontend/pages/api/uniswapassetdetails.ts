import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const url = "https://api.1inch.dev/portfolio/v3/portfolio/additional/uniswapv3/details";

    const { token_id, chain_id } = req.query;

    if (!token_id || !chain_id) {
        return res
            .status(400)
            .json({ error: "Missing 'token_id' or 'chain_id' parameter in the request." });
    }

    const config = {
        headers: {
            Authorization: "Bearer okz7YzxXA8DPc7eehhXbolnROttzvKYA",
        },
        params: {
            chain_id,
            token_id: token_id,
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
