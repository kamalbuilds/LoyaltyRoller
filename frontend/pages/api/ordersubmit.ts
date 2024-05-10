import axios from "axios";

export default async function handler(req : any, res : any) {
  const url = "https://api.1inch.dev/fusion/relayer/v1.0/137/order/submit";
    console.log(url)
  const config = {
    headers: {
      Authorization: `Bearer ${process.env.APIONEINCH}`,
    },
    params: {},
  };

  const body = req.body;

  try {
    const response = await axios.post(url, body, config);
    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
