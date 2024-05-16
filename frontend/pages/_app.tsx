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
import { TWApiKey } from "../const/constants";
import { AirstackProvider } from "@airstack/airstack-react";
import {
  safeWallet,
  smartWallet,
  rainbowWallet,
  okxWallet
} from "@thirdweb-dev/react";
import { ChakraProvider, DarkMode } from '@chakra-ui/react'
import { useState } from "react";
import { Mumbai, BaseGoerli, MantleTestnet, PolygonZkevmTestnet, CeloAlfajoresTestnet } from '@thirdweb-dev/chains';
import ChainContext from "../context/chainselect";

function MyApp({ Component, pageProps }: AppProps) {

  const customChain = {
    chainId: 1729,
    rpc: ["https://rpc-loyalty-roller-roqlic24du.t.conduit.xyz"],
   
    nativeCurrency: {
      decimals: 18,
      name: "ETH",
      symbol: "ETH",
    },
    shortName: "loyalty-roller",
    slug: "loyalty-roller",
    testnet: true,
    chain: "Loyalty-Roller-Rollup",
    name: "Loyalty Roller Rollup",
  };

  return (
    // @ts-ignore
      <ThirdwebProvider
        activeChain={customChain}
        clientId={TWApiKey}
        supportedWallets={[
          metamaskWallet({
            recommended: true,
          }),
          coinbaseWallet(),
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
  );
}

export default MyApp;
