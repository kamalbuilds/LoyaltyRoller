import { ChainId } from "@thirdweb-dev/sdk"

const Chains = [
    { chainId: 1, name: 'Mainnet' },
    { chainId: 5, name: 'Goerli' },
    { chainId: 137, name: 'Polygon' },
    { chainId: 80001, name: 'Mumbai' },
    { chainId: 137, name: 'Polygon' },
    // ... other chain objects
];

// const Chains = {
//     Mainnet = 1,
//     Goerli = 5,
//     Polygon = 137,
//     Mumbai = 80001,
//     Localhost = 1337,
//     Hardhat = 31337,
//     Fantom = 250,
//     FantomTestnet = 4002,
//     Avalanche = 43114,
//     AvalancheFujiTestnet = 43113,
//     Optimism = 10,
//     OptimismGoerli = 420,
//     Arbitrum = 42161,
//     ArbitrumGoerli = 421613,
//     BinanceSmartChainMainnet = 56,
//     BinanceSmartChainTestnet = 97
// }

export const getChainNamebyId = (chainId: number) => {
    const foundChain = Chains.find(chain => chain.chainId === chainId);
    return foundChain ? foundChain.name : 'Unknown Chain';
}

export const shortenText = (str: string, substringLengthStart: number, substringLengthEnd?: number): string => {
    return `${str?.substring(0, substringLengthStart)}...${str?.substring(str?.length - (substringLengthEnd ?? substringLengthStart))}`;
};