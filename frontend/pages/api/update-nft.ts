import { NFT, ThirdwebSDK } from "@thirdweb-dev/sdk";
import { loyaltyCardAddress } from "../../const/constants";

export default async function updateNFT(
    nft : NFT,
    lvl: number,
    experience: string,
){
    try {
        // @ts-ignore
        const sdk = new ThirdwebSDK.fromPrivateKey(
            process.env.NEXT_PUBLIC_PRIVATE_KEY || '',
            "mumbai",
            {
                clientId: process.env.NEXT_PUBLIC_APP_TEMPLATE_CLIENT_ID || '',
            }
        );

        const loyaltyCardContract = await sdk.getContract(loyaltyCardAddress);
        
        const metadata = {
            ...nft.metadata,
            attributes: [
                {
                    trait_type: "lvl",
                    value: lvl + 10,
                },
                {
                    trait_type: "experience",
                    value: experience,
                },
            ],
        }
        
        if (true) {
            const tx = await loyaltyCardContract.erc721.update(
                nft.metadata.id,
                metadata
            );
        } else {
            alert("You don't own this NFT");
            return { error : "You don't own this NFT" };
        }

        return { success : "NFT updated" };
    }
    catch (e) {
        console.log(e);
        return null;
    }
}