import type { NextPage } from "next";
import { useContext } from "react";
import ChainContext from "../context/chainselect";
import { Mumbai, BaseGoerli , MantleTestnet ,  PolygonZkevmTestnet , CeloAlfajoresTestnet , ScrollAlphaTestnet , ArbitrumSepolia , X1Testnet} from '@thirdweb-dev/chains';

const ChainSelect: NextPage = () => {
  const { selectedChain, setSelectedChain } = useContext(ChainContext);

  const supportedChains = [BaseGoerli, Mumbai , MantleTestnet ,  PolygonZkevmTestnet , CeloAlfajoresTestnet , ScrollAlphaTestnet , ArbitrumSepolia , X1Testnet];
  const chains = {
    [BaseGoerli.chainId]: BaseGoerli,
    [Mumbai.chainId]: Mumbai,
    [MantleTestnet.chainId]: MantleTestnet,
    [PolygonZkevmTestnet.chainId]: PolygonZkevmTestnet,
    [CeloAlfajoresTestnet.chainId]: CeloAlfajoresTestnet,
    [ScrollAlphaTestnet.chainId]: ScrollAlphaTestnet,
    [ArbitrumSepolia.chainId]: ArbitrumSepolia,
    [X1Testnet.chainId]: X1Testnet, 
  }

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedChainId = e.target.value;
    console.log(selectedChainId);
    // @ts-ignore
    const selectedChain = chains[selectedChainId];

    if (selectedChain) {
      setSelectedChain(selectedChain);
    }
  };

  return (
    <div>
      <select value={selectedChain.chainId} onChange={handleChange} className="text-black p-4 rounded-md">
        {supportedChains.map((chain) => (
          <option key={chain.chainId} value={chain.chainId}>
            {chain.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ChainSelect;
