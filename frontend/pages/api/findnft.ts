
// import { PrismaClient } from "@prisma/client";
import prisma from "../../prisma/prisma";
import { NextApiRequest, NextApiResponse } from "next";

// const prisma = new PrismaClient();
async function GET(req: NextApiRequest , res : NextApiResponse) {
  // the address to send the znft to

  // @ts-ignore
  const { id } = req.query;
  // find the nft using the id in the database
  try {
    const nft = await prisma.nFT.findUnique({
      where: {
        // @ts-ignore
        id,
      },
    });

    console.log(nft, "nft");

    if (!nft) {
      return res.status(400).json({ error: "NFT not found" });
    }

    return res.status(200).json( nft);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: e });
  }
}

export default GET;