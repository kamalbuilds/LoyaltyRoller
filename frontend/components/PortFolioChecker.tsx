// @ts-nocheck
import React, { useEffect } from 'react';
import axios from 'axios'; // Use axios for HTTP requests

const PortfolioChecker = () => {
    const ONEINCHAPI = process.env.NEXT_PUBLIC_APP_APIONEINCH;

  useEffect(() => {
    const getPrices = async () => {
      // Set up your portfolio details
      const chainId = 1; // Mainnet Ethereum
      const contractAddressEth = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'; // Example: Ethereum (ETH)
      const contractAddressDai = '0x6B175474E89094C44Da98b954EedeAC495271d0F'; // Example: DAI stablecoin
      const currency = 'usd';
      const fromTimestamp = 1625097600; // Example: July 1, 2021
      const toTimestamp = 1627776000; // Example: July 31, 2021
      const addresses = [contractAddressEth, contractAddressDai];

      try {
        // Get token prices
        const ethPrices = await getTokenPrices(chainId, contractAddressEth, currency, fromTimestamp, toTimestamp);
        const daiPrices = await getTokenPrices(chainId, contractAddressDai, currency, fromTimestamp, toTimestamp);

        console.log("Ethereum Prices:", ethPrices);
        console.log("DAI Prices:", daiPrices);

        // Calculate absolute profit
        const profitData = await calculateAbsoluteProfit(chainId , fromTimestamp, toTimestamp, addresses);
        const absoluteProfit = profitData.absolute_profit || 0;
        const profitCurrency = profitData.currency || 'USD';

        console.log(`Absolute Profit: ${absoluteProfit} ${profitCurrency}`);

        // Execute a token swap
        const fromTokenAddress = contractAddressEth;
        const toTokenAddress = contractAddressDai;
        const amountToSwap = 1.0; // Replace with the desired amount to swap
        const userAddress = '0xYourAddress'; // Replace with the user's Ethereum address

        const swapResult = await executeSwap(fromTokenAddress, toTokenAddress, amountToSwap, userAddress);
        console.log("Swap Result:", swapResult);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    getPrices();
  }, []);

  const getTokenPrices = async (chainId, contractAddress, currency, fromTimestamp, toTimestamp) => {
    const endpoint = 'https://api.1inch.dev/portfolio/v2/token_prices/time_range';
    const payload = {
      chain_id: chainId,
      contract_address: contractAddress,
      currency: currency,
      granularity: 'day',
      from_timestamp: fromTimestamp,
      to_timestamp: toTimestamp,
    };

    const response = await axios.post(endpoint, payload, { headers: { Authorization: `Bearer ${ONEINCHAPI}` } });
    return response.data.prices || [];
  };

  const calculateAbsoluteProfit = async (chainId : number , fromTimestamp : number, toTimestamp  : number, addresses: string) => {
    const endpoint = 'https://api.1inch.dev/portfolio/v2/pnl/tokens_pnl/absolute_profit_by_portfolio_timerange';
    const payload = {
      chain_id: chainId,
      from_timestamp: fromTimestamp,
      to_timestamp: toTimestamp,
      addresses: addresses,
    };

    const response = await axios.post(endpoint, payload, { headers: { Authorization: `Bearer ${ONEINCHAPI}` } });
    return response.data;
  };

  const executeSwap = async (src : string, dst : string, amount : number, from : string, slippage = 1.0) => {
    const endpoint = 'https://api.1inch.dev/swap/v5.2/1/swap';
    const payload = {
      src: src,
      dst: dst,
      amount: amount,
      from: from,
      slippage: slippage,
    };

    const response = await axios.post(endpoint, payload, { headers: { Authorization: `Bearer ${ONEINCHAPI}` } });
    return response.data;
  };

  return (
    <div>
      {/* Your component JSX goes here */}
    </div>
  );
};

export default PortfolioChecker;
