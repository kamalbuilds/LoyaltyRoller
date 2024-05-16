import {
  MediaRenderer,
  ThirdwebNftMedia,
  useAddress,
  useContract,
  useNFTBalance,
  useWallet,
} from "@thirdweb-dev/react";
import React, { useEffect, useState } from "react";
import Container from "../../../components/Container/Container";
import { GetStaticProps, GetStaticPaths } from "next";
import { NFT, ThirdwebSDK } from "@thirdweb-dev/sdk";
import {
  getaddresses,
  TWApiKey,
} from "../../../const/constants";
import styles from "../../../styles/Token.module.css";
import { Toaster } from "react-hot-toast";
import { Signer } from "ethers";
import newSmartWallet from "../../../components/SmartWallet/SmartWallet";
import SmartWalletConnected from "../../../components/SmartWallet/smartConnected";
import Link from "next/link";
import ChainContext from "../../../context/chainselect";
import { useContext } from "react";
import { Button } from "@chakra-ui/react";
import { addidas } from "../../../const/constants";
import { activeChain } from "../../../const/constants";

type Props = {
  nft: NFT;
  contractMetadata: any;
};

export default function TokenPage({ nft, contractMetadata }: Props) {
  const { selectedChain } = useContext(ChainContext);
  const activeChain = selectedChain;
  const addidasaddres = addidas;
  const loyaltyaddres = getaddresses[activeChain.chainId]?.loyaltyCardAddress;
  const [smartWalletAddress, setSmartWalletAddress] = useState<string | null>(
    null
  );
  const [signer, setSigner] = useState<Signer>();

  // get the currently connected wallet
  const address = useAddress();
  const wallet = useWallet();

  // create a smart wallet for the NFT
  useEffect(() => {
    console.count();
    const createSmartWallet = async (nft: NFT) => {
      console.log("NFT if statement", nft, smartWalletAddress, address, wallet);

      if (wallet) {
        const smartWallet = newSmartWallet(nft);
        console.log(smartWallet, "Smart wallet")
        const a = await smartWallet.connect({ personalWallet: wallet });
        console.log(a, "Smart wallet")
        console.log("Smart wallet", smartWallet);

        const isDeployed = await smartWallet.isDeployed();
        console.log("Is Deployed? ???", isDeployed);

        // if (!isDeployed) {
        //   console.log("Smart Account is deploying >>>>>>.....");
        //   try {
        //     const tx = await smartWallet.deploy();
        //     console.log("Smart Account is deploying.....", tx);
        //   } catch (error) {
        //     console.log("Error in deploying", error)
        //   }
        // }

        const smartWalletSigner = await smartWallet.getSigner();
        console.log("Smart wallet signer", smartWalletSigner);
        setSigner(smartWalletSigner);

        const ownerAddress = await smartWallet.getAddress();
        console.log("Smart wallet ownerAddress", ownerAddress);
        setSmartWalletAddress(ownerAddress);



      }
    };
    createSmartWallet(nft);
  }, [nft, address, wallet]);
  // const { contract, isLoading } = useContract'("0xE1822311D285d78EE98f5bD0f2edcF56fb7F1D29");
  // const { data: ownerBalance, isLoading, error } = useNFTBalance(contract, "0x0439427C42a099E7E362D86e2Bbe1eA27300f6Cb");


  return (
    <>
      <Toaster position="bottom-center" reverseOrder={false} />
      <Container maxWidth="lg">
        <div className={styles.container}>
          <div className={styles.metadataContainer}>
            <ThirdwebNftMedia
              metadata={nft.metadata}
              className={styles.image}
            />
          </div>

          <div className={styles.listingContainer}>
            {contractMetadata && (
              <div className={styles.contractMetadataContainer}>
                <MediaRenderer
                  src={contractMetadata.image}
                  className={styles.collectionImage}
                />
                <p className={styles.collectionName}>{contractMetadata.name}</p>
              </div>
            )}
            <h1 className={styles.title}>{nft.metadata.name}</h1>
            <p className={styles.collectionName}>Token ID #{nft.metadata.id}</p>
            {smartWalletAddress ? (
              <>
              <SmartWalletConnected signer={signer} scaaddress={smartWalletAddress} />
              </>
            ) : (
              <div className={styles.btnContainer}>
                <p>Loading...</p>
              </div>
            )}
          </div>
        </div>
      </Container>
    </>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const tokenId = context.params?.tokenId as string;
  

  const sdk = new ThirdwebSDK(activeChain, {
    secretKey: process.env.TW_SECRET_KEY,
  });

  const contract = await sdk.getContract(addidas);

  const nft = await contract.erc721.get(tokenId);
  console.log(nft.metadata.uri, "Here!!!");

  let contractMetadata;

  try {
    contractMetadata = await contract.metadata.get();
  } catch (e) { }

  return {
    props: {
      nft,
      contractMetadata: contractMetadata || null,
    },
    revalidate: 1, // https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration
  };
};

export const getStaticPaths: GetStaticPaths = async () => {


  const sdk = new ThirdwebSDK(activeChain, {
    secretKey: process.env.TW_SECRET_KEY,
  });

  const contract = await sdk.getContract(addidas);

  const nfts = await contract.erc721.getAll();

  const paths = nfts.map((nft) => {
    return {
      params: {
        contractAddress: addidas,
        tokenId: nft.metadata.id,
      },
    };
  });

  return {
    paths,
    fallback: "blocking", // can also be true or 'blocking'
  };
};
