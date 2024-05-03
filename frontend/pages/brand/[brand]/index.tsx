import type { NextPage } from "next";
import styles from "../../../styles/Main.module.css";
import NFTGrid from "../../../components/NFT/NFTGrid";
import {
  ConnectWallet,
  Web3Button,
  useAddress,
  useContract,
  useNFTs,
  useOwnedNFTs,
} from "@thirdweb-dev/react";
import { addidas } from "../../../const/constants";
import Container from "../../../components/Container/Container";
import { useRouter } from "next/router";

/**
 * The home page of the application.
 */
const Brand: NextPage = () => {
  const router = useRouter();
  const { brand } = router.query;
  const address = useAddress();
  const { contract, isLoading } = useContract("0xBd491b4321DbE318522Ab3266590883c9F055200");
  const { data: nfts, error } = useNFTs(contract, { start: 0, count: 100 });

  return (
    <Container maxWidth="lg">
      {address ? (
        <div className={styles.container}>
          <h1>Welcome to {brand} </h1>
          <p>
            Browse the productNFTs from { brand}
          </p>
          <NFTGrid
            nfts={nfts}
            isLoading={isLoading}
            emptyText={
              "Looks like there are no product NFTs."
            }
            contractaddress={addidas}
          />
        </div>
      ) : (
        <div className={styles.container}>
          <h2>Connect a personal wallet to view your owned NFTs</h2>
          <ConnectWallet />
        </div>
      )}
    </Container>
  );
};

export default Brand;
