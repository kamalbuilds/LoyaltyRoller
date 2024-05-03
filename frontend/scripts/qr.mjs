import qrcode from "qrcode";
import { PrismaClient } from "@prisma/client";

let prisma = new PrismaClient();


const main = async () => {
  try {
    
    const nfts = await prisma.nFT.findMany({
      where: {
        minted: false,
      },
    });

    console.log(nfts);

    // for (const nft of nfts) {
    //   await qrcode.toFile(
    //     `./qrs/${nft.id}.png`,
    //     `https://engine-phygital.vercel.app/claim?id=${nft.id}`
    //   );
    // }
  } catch (e) {
    console.error(e);
  }
};

main();