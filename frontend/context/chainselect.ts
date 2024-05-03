import { createContext } from "react";
import { Chain } from "@thirdweb-dev/react";
import { Mumbai } from "@thirdweb-dev/chains";

const ChainContext = createContext({
    selectedChain: Mumbai,
    setSelectedChain: (chain: Chain) => {},
});

export default ChainContext;