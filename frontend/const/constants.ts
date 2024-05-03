import { Mumbai, Chain, BaseGoerli , MantleTestnet} from '@thirdweb-dev/chains';
// registery
export const factoryAddress: string = ''
// TBA
export const implementation: string = '';

export const TWApiKey: string = process.env.NEXT_PUBLIC_APP_TEMPLATE_CLIENT_ID || ''

export const activeChain: Chain = Mumbai;

export const loyaltyCardAddress: string = ''
export const addidas: string = ''
export const tokenAddress: string = ''

export const getaddresses: Record<number, Record<string, string>> = {
    // mumbai
    80001: {
        loyaltyCardAddress: '',
        addidas: '',
        tokenAddress: '',
        factoryAddress: '',
        implementation: '',
    },
    // base goerli
    84531: {
        loyaltyCardAddress: '',
        addidas: '',
        factoryAddress: '',
        implementation: '',
    },
    // mantle testnet
    5001: {
        factoryAddress: '',
        implementation: '',
        addidas: ''
    },
};

