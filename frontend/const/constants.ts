import { Chain} from '@thirdweb-dev/chains';
// registery
export const factoryAddress: string = '0x301Ab38c7f652FA23C7Ba1fa182E36665Dac0fC2'
// TBA
export const implementation: string = '0x5cD41A1F206912d068bd153D9f1D8dF63c8667E7';

export const TWApiKey: string = process.env.NEXT_PUBLIC_APP_TEMPLATE_CLIENT_ID || ''

export const loyaltyCardAddress: string = ''
export const addidas: string = '0xA5970338e5934c0C23eC4DDdC2E46E5763e15627'
export const tokenAddress: string = ''

export const activeChain : Chain = {
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

