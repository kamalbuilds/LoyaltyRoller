// @ts-nocheck
import React, { useEffect, useState } from "react";
import Button from "../../components/Button";
import { MediaRenderer } from "@thirdweb-dev/react";
import styles from "../../styles/Claim.module.css";
import { useRouter } from "next/router";
import Container from "../../components/Container/Container";


export default function ClaimPage(  ) {
  const router = useRouter();
  const { id } = router.query;
  const [nft, setNft] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetch(`/api/findnft?id=${id}`, {
          method: "GET",
        });

        // const data = await getData(id);
        console.log("Data", data);
        setNft(JSON.parse(data.nft));
        setLoading(false);
      } catch (error) {
        // Handle error, e.g., show an error message or redirect
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    }

    fetchData();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>; // You can replace this with a loading spinner or any other loading indicator
  }

  if (!nft) {
    return <div>Error loading data</div>; // Handle the case where data cannot be fetched
  }

  return (
    <Container maxWidth="lg">
    <div className={styles.container}>
      {nft.minted ? (
        <h1 className={styles.title}>NFT has already been claimed</h1>
      ) : (
        <h1 className={styles.title}>
          You&apos;ve discovered a<br />
          <span className={styles.blue}>&apos;{nft.name}&apos; NFT</span>.
        </h1>
      )}
      <div className={styles.nft}>
        <MediaRenderer
          src={nft.image}
          alt={nft.name}
          width="250px"
          height="250px"
        />
        <h2>{nft.name}</h2>
        <p>{nft.description}</p>
        {/* @ts-ignore */}
        <div className={styles.attributes}>
          {Object.keys(nft.attributes).map((key) => (
            <div key={key} className={styles.attribute}>
              <p className={styles.attributeKey}>{key}</p>
              <p className={styles.attributeValue}>
                {/* @ts-ignore */}
                {nft.attributes[key]}
              </p>
            </div>
          ))}
        </div>
      </div>

      {!nft.minted && <Button id={id} />}
    </div>
  </Container>
  );
}
