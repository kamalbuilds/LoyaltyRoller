import { PrismaClient } from "@prisma/client";

let prisma = new PrismaClient();

if(process.env.NODE_ENV === "production") {
    prisma = new PrismaClient();
} else {
    const globalWithPrisma = global;
    if (!globalWithPrisma.prisma) {
        globalWithPrisma.prisma = new PrismaClient();
    }
    prisma = globalWithPrisma.prisma;
}

const NFTs = [
    {
        name: "NFT 1",
        description: "NFT 1 description",
        image: "https://source.unsplash.com/random",
        // price: 1,
        owner: "0x0439427C42a099E7E362D86e2Bbe1eA27300f6Cb",
        attributes: {
            "background-color": "red",
            "font-color": "white",
        },
    },
];

const main = async () => {
    try{
        await prisma.nFT.createMany({
            data: NFTs.map((nft) => ({
                ...nft,
                minted: false,
            })),
        });
        console.log("NFTs created successfully ! 🚀");
    } catch (error) {
        console.error(error);
    }
};

main();