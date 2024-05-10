import type { AppProps } from "next/app";
import {
  Chain,
  ThirdwebProvider,
  coinbaseWallet,
  metamaskWallet,
  walletConnect,
} from "@thirdweb-dev/react";
import "../styles/globals.css";
import { Navbar } from "../components/Navbar/Navbar";
import { TWApiKey, activeChain } from "../const/constants";
import { AirstackProvider } from "@airstack/airstack-react";
import {
  safeWallet,
  smartWallet,
  rainbowWallet,
  okxWallet
} from "@thirdweb-dev/react";
import { UserOperationStruct } from "@account-abstraction/contracts";
import { PaymasterAPI } from "@account-abstraction/sdk";
import { ChakraProvider, DarkMode } from '@chakra-ui/react'
import { useState } from "react";
import { Mumbai, BaseGoerli, MantleTestnet, PolygonZkevmTestnet, CeloAlfajoresTestnet } from '@thirdweb-dev/chains';
import ChainContext from "../context/chainselect";
// import SmartAccountContextProvider from "../context/SmartAccountContext";

class MyPaymaster extends PaymasterAPI {

  async getPaymasterAndData(
    userOp: Partial<UserOperationStruct>,
  ): Promise<string> {
    // your implementation, must return the signed paymaster data

    try {
      // Request for eth_paymasterAndDataForEstimateGas
      const estimateGasResponse = await fetch("https://paymaster.base.org", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: 1,
          jsonrpc: "2.0",
          method: "eth_paymasterAndDataForEstimateGas",
          params: [
            userOp,
            "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789", // entrypoint
            "0x14A33", // chainid in hexadecimal
          ],
        }),
      }).then(response => response.json());

      estimateGasResponse();
      // Call estimate gas on your bundler of choice with the above response
      userOp.paymasterAndData = estimateGasResponse.result;


      // Request for eth_paymasterAndDataForUserOperation
      const userOperationResponse = await fetch("https://paymaster.base.org", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: 1,
          jsonrpc: "2.0",
          method: "eth_paymasterAndDataForUserOperation",
          params: [
            userOp,
            "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789",
            "0x14A33",
          ],
        }),
      }).then(response => response.json());

      // Return the hex-encoded response from eth_paymasterAndDataForUserOperation
      return userOperationResponse.result;
    } catch (error) {
      console.error("Error:", error);
      throw error; // Propagate the error
    }
  }
}

const basesmartWalletOptions = {
  factoryAddress: "0x05b4683D10E5b4aCfEa8e996c5fda70F030a6e7E",
  gasless: false,
  // bundlerUrl: "https://bundler.biconomy.io/api/v2/84531/nJPK7B3ru.dd7f7861-190d-41bd-af80-6877f74b8f44",
  bundlerUrl: "https://api.pimlico.io/v2/base-goerli/rpc?apikey=f3ebcd79-cc7f-4889-a044-b92fb8bfa7ee",
  paymasterUrl: "https://api.pimlico.io/v2/base-goerli/rpc?apikey=f3ebcd79-cc7f-4889-a044-b92fb8bfa7ee",

};

const smartWalletOptions = {
  factoryAddress: "0xaFE10af6984689d744861d1fb4FE4f91d6D6ACa4",
  gasless: true,
};

function MyApp({ Component, pageProps }: AppProps) {
  const [selectedChain, setSelectedChain] = useState(Mumbai);
  const app_id = process.env.NEXT_PUBLIC_APP_AADHAR_ID || "";
  return (
    // @ts-ignore
    <ChainContext.Provider value={{ selectedChain, setSelectedChain }}>
      <ThirdwebProvider
        activeChain={selectedChain}
        clientId={TWApiKey}
        supportedWallets={[
          okxWallet(),
          metamaskWallet({
            recommended: true,
          }),
          coinbaseWallet(),
          safeWallet({
            personalWallets: [
              smartWallet(
                metamaskWallet(),
                basesmartWalletOptions,
              ),
              smartWallet(
                rainbowWallet(),
                smartWalletOptions,
              ),
            ],
          }),
        ]}
      >
        {/* <SmartAccountContextProvider> */}
          <ChakraProvider theme={DarkMode}>
            <AirstackProvider apiKey={process.env.NEXT_PUBLIC_APP_AIRSTACK_API_KEY || ""}>
                <>
                  <Navbar />
                  <Component {...pageProps} />
                </>
            </AirstackProvider>
          </ChakraProvider>
        {/* </SmartAccountContextProvider> */}
      </ThirdwebProvider>
    </ChainContext.Provider>
  );
}

export default MyApp;
