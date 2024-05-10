// ERC6551 Smart Wallet
import { ethers } from "ethers";
import { SmartWallet } from "@thirdweb-dev/wallets";
// factory address and implementation address ERC-6551
import {
  TWApiKey,
  activeChain
} from "../../const/constants";
import { SmartContract, NFT } from "@thirdweb-dev/sdk";
import { WalletOptions } from "@thirdweb-dev/wallets";
import type { SmartWalletConfig } from "@thirdweb-dev/wallets";
import type { BaseContract } from "ethers";
import { useContext } from "react";
import ChainContext from "../../context/chainselect";
import { getaddresses } from "../../const/constants";

export default function newSmartWallet(token: NFT) {
  //Smart Wallet config object
  const selectedChain = activeChain;
  const factoryadd = getaddresses[selectedChain.chainId]?.factoryAddress;
  const implementationadd = getaddresses[selectedChain.chainId]?.implementation;
  const addidasaddress = getaddresses[selectedChain.chainId]?.addidas;
  console.log("factoryadd", factoryadd , addidasaddress, implementationadd);

  const config: WalletOptions<SmartWalletConfig> = {
    chain: selectedChain, // the chain where your smart wallet will be or is deployed
    factoryAddress: factoryadd, // your own deployed account factory address
    clientId: TWApiKey, // obtained from the thirdweb dashboard
    gasless: true, // enable or disable gasless transactions
    factoryInfo: {
      createAccount: async (
        factory: SmartContract<BaseContract>,
        owner: string
      ) => {
        const account = factory.prepare("createAccount", [
          implementationadd,
          selectedChain.chainId,
          addidasaddress,
          token.metadata.id,
          0,
          ethers.utils.toUtf8Bytes("")
        ]);
        console.log("here", account);
        return account;
      }, // the factory method to call to create a new account
      getAccountAddress: async (
        factory: SmartContract<BaseContract>,
        owner: string
      ) => {
        return factory.call("account", [
          implementationadd,
          selectedChain.chainId,
          addidasaddress,
          token.metadata.id,
          0
        ]);
      }, // the factory method to call to get the account address
    },
  };
  return new SmartWallet(config);
}
