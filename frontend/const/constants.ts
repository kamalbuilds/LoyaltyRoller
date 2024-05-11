import { Mumbai, Chain, BaseGoerli , MantleTestnet} from '@thirdweb-dev/chains';
// registery
export const factoryAddress: string = '0xD4f005d93Abe34bE1A1f2fEBc0411F74F0cff4a9'
// TBA
export const implementation: string = '0x6c65E8ba1E6267f1DDEBb06026e77636A5F9a4eE';

export const TWApiKey: string = process.env.NEXT_PUBLIC_APP_TEMPLATE_CLIENT_ID || ''

export const loyaltyCardAddress: string = ''
export const addidas: string = '0x4AaCAC78f756780c8EdBFaFE620E0b3DAdC86A47'
export const tokenAddress: string = ''

export const activeChain : Chain = {
    chainId: 60385, // Chain ID of the network
    rpc: ["https://rpc-useful-aquamarine-rhinoceros-dufw1ydgcn.t.conduit.xyz"],
   
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

export const getaddresses: Record<number, Record<string, string>> = {
    // layer3 addresses needed here -> 
    80001: {
        loyaltyCardAddress: '',
        addidas: '',
        tokenAddress: '',
        factoryAddress: '',
        implementation: '',
    },
};

