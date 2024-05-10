import {
  ThirdwebSDKProvider,
  useAddress,
  useBalance,
  Web3Button,
} from "@thirdweb-dev/react";
import React from "react";
import { activeChain, tokenAddress, TWApiKey } from "../../const/constants";
import { Signer } from "ethers";
import style from "../../styles/Token.module.css";
import toast from "react-hot-toast";
import toastStyle from "../../util/toastConfig";
import Swap from "../SwapComponent/Swap";
import Button from "../Button";
interface ConnectedProps {
  signer: Signer | undefined;
  scaaddress: string | undefined;
}

// ThirdwebSDKProvider is a wrapper component that provides the smart wallet signer and active chain to the Thirdweb SDK.
const SmartWalletConnected: React.FC<ConnectedProps> = ({ signer, scaaddress }) => {
  return (
    <ThirdwebSDKProvider
      signer={signer}
      activeChain={activeChain}
      clientId={TWApiKey}
    >
      <h2>This is Your Token Bound Account! {scaaddress}</h2>
      <ClaimTokens />
      {signer && <Swap />}
    </ThirdwebSDKProvider>
  );
};

// This is the main component that shows the user's token bound smart wallet.
const ClaimTokens = () => {
  const address = useAddress();
  const { data: tokenBalance, isLoading: loadingBalance } =
    useBalance(tokenAddress);

  return (
    <div className={style.walletContainer}>
      {address ? (
        loadingBalance ? (
          <h2>Loading Balance...</h2>
        ) : (
          <div className={style.pricingContainer}>
            <h2>Balance: {tokenBalance?.displayValue}</h2>
            <Web3Button
              contractAddress={tokenAddress}
              action={async (contract) => await contract.erc20.claim(10)}
              onSuccess={() => {
                toast(`Tokens Claimed!`, {
                  icon: "✅",
                  style: toastStyle,
                  position: "bottom-center",
                });
              }}
              onError={(e) => {
                console.log(e);
                toast(`Tokens Claim Failed! Reason: ${(e as any).reason}`, {
                  icon: "❌",
                  style: toastStyle,
                  position: "bottom-center",
                });
              }}
            >
              Claim 10 Tokens
            </Web3Button>
          </div>
        )
      ) : null}
    </div>
  );
};

export default SmartWalletConnected;
