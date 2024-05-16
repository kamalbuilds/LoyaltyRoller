import type { NextPage } from "next";
import styles from "../styles/Main.module.css";
import NFTGrid from "../components/NFT/NFTGrid";
import {
  ConnectWallet,
  NFT,
  Transaction,
  TransactionResultWithId,
  Web3Button,
  getSignerAndProvider,
  useAddress,
  useChainId,
  useContract,
  useOwnedNFTs,
  useSigner,
} from "@thirdweb-dev/react";
import { loyaltyCardAddress } from "../const/constants";
import Container from "../components/Container/Container";
import toast from "react-hot-toast";
import toastStyle from "../util/toastConfig";
import { fetchQuery } from "@airstack/airstack-react";
import { getaddresses } from "../const/constants";
import { useContext, useMemo } from "react";
import ChainContext from "../context/chainselect";
import { createClient, createPublicClient, encodeFunctionData, getContract, http } from "viem";
import { baseGoerli, polygonMumbai } from "viem/chains";
import { BASE_GOERLI_PAYMASTER_URL } from "../lib/constants";
import { generatePrivateKey, privateKeyToAccount, signMessage } from "viem/accounts";
import { addidas } from "../const/constants";
// import { SmartAccountContext } from "../context/SmartAccountContext";

/**
 * The home page of the application.
 */
const Home: NextPage = () => {
  const address = useAddress();
  const chain = useChainId();

  // const { createSafeAccount, getInitCode } = useContext(SmartAccountContext);

  // const { contract: nftDropContract } = useContract(loyaltyCardAddress, "nft-drop");
  const { contract : addidasContract } = useContract(addidas);
  console.log(addidasContract);
  const { data: nfts, isLoading } = useOwnedNFTs(addidasContract, address);

  const fetchNftDetailsUsingAirstack = async () => {
    const contractAddress = addidas;
    const blockchain = "ethereum";
    const query = `query MyQuery {
      TokenBalances(
        input: {filter: {tokenAddress: {_eq: "${contractAddress}"}, owner: {_eq: "${address}"}}, blockchain: ${blockchain}}
      ) {
        TokenBalance {
          owner {
            addresses
          }
          amount
          tokenAddress
          tokenId
        }
      }
    }`;
    const { data, error } = await fetchQuery(query);
    console.log(data);
    return data;
  }

  const updateNft = async () => {
    const details = await fetchNftDetailsUsingAirstack();
  }

  const handleMintNFT = async () => {
    if (addidasContract) {

      const metadata = {
        name: "Cool NFT",
        description: "This is a cool NFT",
        image: "https://assets.ajio.com/medias/sys_master/root/20230807/qccn/64d0b9b6eebac147fcac6ee7/-473Wx593H-469496424-white-MODEL.jpg"
      };

      const tx = await addidasContract.erc721.mintTo(address as string, metadata);
      const receipt = tx.receipt; // the transaction receipt
      const tokenId = tx.id; // the id of the NFT minted
      const nft = await tx.data(); // (optional) fetch details of minted NFT

      console.log("Tx", tx, receipt, tokenId, nft);
    }
  }

  // const handleMintNFTGas = async () => {
  //   if (addidasContract) {

  //     const SIMPLE_ACCOUNT_FACTORY_ADDRESS = "0x9406Cc6185a346906296840746125a0E44976454"
  //     const chain = "mumbai" // find the list of chain names on the Pimlico verifying paymaster reference page
  //     const apiKey = 'f3ebcd79-cc7f-4889-a044-b92fb8bfa7ee' // REPLACE THIS


  //     const publicClient = createPublicClient({
  //       // transport: http("https://base-goerli.g.alchemy.com/v2/CO_noBqhVqsoYj9lRQ7ThBs7mjhlgtu3"),
  //       transport: http("https://polygon-mumbai.g.alchemy.com/v2/eoLi0hkG_t_JgHwf3wWhw62Gx0OnF9yf"),
  //       chain: polygonMumbai
  //     })

  //     const bundlerClient = createClient({
  //       transport: http(`https://api.pimlico.io/v1/${chain}/rpc?apikey=${apiKey}`),
  //       chain: polygonMumbai
  //     })
  //       .extend(bundlerActions)
  //       .extend(pimlicoBundlerActions)


  //     const paymasterClient = createClient({
  //       transport: http(`https://api.pimlico.io/v2/${chain}/rpc?apikey=${apiKey}`),
  //       chain: polygonMumbai
  //     }).extend(pimlicoPaymasterActions)

  //     console.log("Public Client", publicClient, bundlerClient, paymasterClient);


  //     const initCode = await getInitCode(address);

  //     const ENTRY_POINT_ADDRESS = "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789"

  //     const senderAddress = await getSenderAddress(publicClient, {
  //       initCode,
  //       entryPoint: ENTRY_POINT_ADDRESS
  //     })
  //     console.log("Calculated sender address:", senderAddress)

  //     const to = "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045"
  //     const value = 0n
  //     const data = "0x68656c6c6f"

  //     const metadata = {
  //       name: "Cool NFT",
  //       description: "This is a Abhishek's NFT",
  //       image: "https://assets.ajio.com/medias/sys_master/root/20230807/qccn/64d0b9b6eebac147fcac6ee7/-473Wx593H-469496424-white-MODEL.jpg"
  //     };

  //     const callData = encodeFunctionData({
  //       abi: NFTAbi,
  //       args: [address, metadata],
  //       functionName: "mintTo"
  //     })

  //     console.log("Generated callData:", callData)

  //     const gasPrice = await bundlerClient.getUserOperationGasPrice()

  //     console.log("gasPrice", gasPrice)

  //     //TODO: After getting the gas price, sign the useroperation and then send the paymaster sponser request to pimlico and then add the request to user operation and then send the transction

  //     const userOperation = {
  //       sender: senderAddress,
  //       nonce: 0n,
  //       initCode,
  //       callData,
  //       maxFeePerGas: gasPrice.fast.maxFeePerGas,
  //       maxPriorityFeePerGas: gasPrice.fast.maxPriorityFeePerGas,
  //       // dummy signature, needs to be there so the SimpleAccount doesn't immediately revert because of invalid signature length
  //       signature: "0xa15569dd8f8324dbeabf8073fdec36d4b754f53ce5901e283c6de79af177dc94557fa3c9922cd7af2a96ca94402d35c39f266925ee6407aeb32b31d76978d4ba1c" as Hex
  //     }

  //     const sponsorUserOperationResult = await paymasterClient.sponsorUserOperation({
  //       userOperation,
  //       entryPoint: ENTRY_POINT_ADDRESS
  //     })

  //     const sponsoredUserOperation: UserOperation = {
  //       ...userOperation,
  //       preVerificationGas: sponsorUserOperationResult.preVerificationGas,
  //       verificationGasLimit: sponsorUserOperationResult.verificationGasLimit,
  //       callGasLimit: sponsorUserOperationResult.callGasLimit,
  //       paymasterAndData: sponsorUserOperationResult.paymasterAndData
  //     }

  //     console.log("Received paymaster sponsor result:", sponsorUserOperationResult)


  //     console.log("sponsoredUserOperation", sponsoredUserOperation);

  //     const signature = await signUserOperationHashWithECDSA({
  //       account: address,
  //       userOperation: sponsoredUserOperation,
  //       chainId: polygonMumbai.id,
  //       entryPoint: ENTRY_POINT_ADDRESS
  //     })
  //     sponsoredUserOperation.signature = signature

  //     console.log("Generated signature:", signature)

  //     // const metadata = {
  //     //   name: "Cool NFT",
  //     //   description: "This is a cool NFT",
  //     //   image: "https://assets.ajio.com/medias/sys_master/root/20230807/qccn/64d0b9b6eebac147fcac6ee7/-473Wx593H-469496424-white-MODEL.jpg"
  //     // };

  //     const tx: Transaction<TransactionResultWithId<NFT>> = await addidasContract.erc721.mintTo.prepare(address, metadata);
  //     console.log("Tx", tx);

  //     const gasCost = await tx.estimateGasCost();
  //     console.log("Tx gas cost", gasCost);


  //   }
  // }

  const signer = useSigner();
  console.log("Signer >>>>>>", signer);

  const publicClient = createPublicClient({
    transport: http("https://CHAIN.infura.io/v3/API_KEY"),
  });

  const paymaster = useMemo(
    () =>
      createPublicClient({
        chain: baseGoerli,
        transport: http(BASE_GOERLI_PAYMASTER_URL),
      }),
    []
  );

  return (
    <Container maxWidth="lg">
      {address ? (
        <div className={styles.container}>
          <h1>LoyaltyRoller</h1>
          <p>
            Browse the NFTs inside your personal wallet, select one to connect a
            token bound smart wallet & view it&apos;s balance.
          </p>
          <button onClick={handleMintNFT} className={styles.button}>Mint NFT</button>
          {/* <button onClick={handleMintNFTGas} className={styles.button}>Mint NFT Gasless</button> */}
          {/* <button onClick={createSafeAccount} className={styles.button}>Create Mumbai wallet </button> */}
          {/* <Pimlico /> */}
          <NFTGrid
            nfts={nfts}
            isLoading={isLoading}
            emptyText={
              "Looks like you don't own any NFTs. Did you import your contract on the thirdweb dashboard? https://thirdweb.com/dashboard"
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

      <Web3Button
        contractAddress="0x301Ab38c7f652FA23C7Ba1fa182E36665Dac0fC2"
        action={(contract: any) => {
          contract.call("createAccount", ["0x5cD41A1F206912d068bd153D9f1D8dF63c8667E7", "0x0000000000000000000000000000000000000000000000000000000000000000", 84531, addidas, 0])
        }}
      >
        create TBA for this NFT
      </Web3Button>
    </Container>
  );
};

export default Home;
