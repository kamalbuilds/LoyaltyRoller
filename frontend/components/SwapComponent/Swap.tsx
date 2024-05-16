// @ts-nocheck
import { useAddress, useSigner } from '@thirdweb-dev/react';
import React from 'react';
import { activeChain } from '../../const/constants';
import { useSDK } from '@thirdweb-dev/react';
import { Button } from '@chakra-ui/react';

const Swap = () => {
    const address = useAddress();
    const signer = useSigner();
    const chainId = 137;
    const APIONEINCH = process.env.NEXT_PUBLIC_APP_APIONEINCH;
    const sdk = useSDK();
    const web3RpcUrl = ""; // URL for POLygon node
    const walletAddress = "0x0439427C42a099E7E362D86e2Bbe1eA27300f6Cb"; // Your wallet address

    // set allowance to router 0x1111111254eeb25477b68fb85ed929f73a960582
    // polygon example
    // src: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174", // Token address of USDC 10**6
    // dst: "0x8f3cf7ad23cd3cadbd9735aff958023239c6a063", // Token address of DAI
    // amount: "50", // Amount of WETH to swap (in wei) 0.00005 = 50000000000000 , USDC 50 = 0.00005

    const swapParams = {
        // src: "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619", // Token address of WETH 10**18
        src: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174", // Token address of WETH 10**18
        // src: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174", // Token address of USDC 10**6
        dst: "0x8f3cf7ad23cd3cadbd9735aff958023239c6a063", // Token address of DAI
        amount: "50", // Amount of WETH to swap (in wei) 0.00005 = 50000000000000 , USDC 50 = 0.00005
        from: walletAddress,
        slippage: 1, // Maximum acceptable slippage percentage for the swap (e.g., 1 for 1%)
        disableEstimate: false, // Set to true to disable estimation of swap details
        allowPartialFill: false, // Set to true to allow partial filling of the swap order
    };

    const broadcastApiUrl = "https://api.1inch.dev/tx-gateway/v1.1/" + chainId + "/broadcast";
    const apiBaseUrl = "https://api.1inch.dev/swap/v5.2/" + chainId;
    // const web3 = new Web3(web3RpcUrl);
    const headers = { headers: { Authorization: `Bearer ${APIONEINCH}`, accept: "application/json" } };

    // helper fucntions 
    // Construct full API request URL
    function apiRequestUrl(methodName, queryParams) {
        return apiBaseUrl + methodName + "?" + new URLSearchParams(queryParams).toString();
    }

    // Post raw transaction to the API and return transaction hash
    async function broadCastRawTransaction(rawTransaction) {
        return fetch(broadcastApiUrl, {
        method: "post",
        body: JSON.stringify({ rawTransaction }),
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${APIONEINCH}` },
        })
        .then((res) => res.json())
        .then((res) => {
            return res.transactionHash;
        });
    }

    async function checkAllowance(tokenAddress: string, walletAddress: string) {
        const apiBaseUrl = `https://api.1inch.dev/swap/v5.2/${chainId}`; // Assuming chainId 137 for Polygon
        const methodName = "/approve/allowance";
        const queryParams = { tokenAddress, walletAddress };
        console.log(apiBaseUrl, methodName, queryParams, "checkAllowance");
        const url = apiBaseUrl + methodName + "?" + new URLSearchParams(queryParams).toString();
        const head = { headers: { Authorization: `Bearer ${APIONEINCH}`, accept: "application/json" } };
        try {
            const response = await fetch(url, { method: 'GET', head, mode: 'no-cors' });
        const data = await response.json();     
        console.log(data, "data returned from checkAllowance")
        return data.allowance;
        } catch (error) {
        console.error("Error checking allowance:", error);
        throw error;
        }
    }

    // Sign and post a transaction, return its hash
    async function signAndSendTransaction(transaction) {
        // const { rawTransaction } = await web3.eth.accounts.signTransaction(transaction, privateKey);
        const rawTransaction = await sdk?.getSigner().signTransaction(transaction);
        console.log(rawTransaction, "rawTransaction signed");
        return await broadCastRawTransaction(rawTransaction);
    }

    // approve txn
    async function buildTxForApproveTradeWithRouter(tokenAddress: string, amount: string) {
        const url = apiRequestUrl("/approve/transaction", amount ? { tokenAddress, amount } : { tokenAddress });
        const header = { headers: { Authorization: APIONEINCH, accept: "application/json" ,  }  };

        const transaction = await fetch(url, header);
        console.log(transaction, "transaction");
        const transactionForSign = await transaction.json();
        console.log(transactionForSign, "transactionForSign");
        const gasLimit = sdk?.getSignerOrProvider().estimateGas(transactionForSign);

        // const gasLimit = await web3.eth.estimateGas({
        //   ...transaction,
        //   from: walletAddress,
        // });

        return {
        ...transaction,
        gas: gasLimit,
        };
    }

    // swap txn
    async function buildTxForSwap(swapParams) {
        const url = apiRequestUrl("/swap", swapParams);

        // Fetch the swap transaction details from the API
        return fetch(url, headers)
        .then((res) => res.json())
        .then((res) => console.log(res, "res"))
        .then((res) => res.tx);
    }

    const swap = async (swapParams) => {
        const swapTransaction = await buildTxForSwap(swapParams);
        console.log(swapTransaction, swapParams, "swapTransaction");
        console.log("Transaction for swap: ", swapTransaction);

        console.log("Sending the txn");

        const swapTxHash = await signAndSendTransaction(swapTransaction);
        console.log("Swap tx hash: ", swapTxHash);
    }

    const checkAllowanceandApprove = async() => {
        console.log("Checking allowance...", swapParams);
        checkAllowance(swapParams.src, swapParams.from)
            .then((allowance) => {
            if (allowance === "0") {
                console.log("Allowance is 0, approving...");

                const appprovetokens = async () => {
                    const transactionForSign = await buildTxForApproveTradeWithRouter(swapParams.src, swapParams.amount);
                    console.log(transactionForSign, "transactionForSign");

                    // doing manual 

                    const testspp = {
                        "data": "0x095ea7b30000000000000000000000001111111254eeb25477b68fb85ed929f73a96058200000000000000000000000000000000000000000000000000000000000001f4",
                        "gasPrice": "29728389834",
                        "to": "0xdac17f958d2ee523a2206206994597c13d831ec7",
                        "value": "0"
                    }

                    const gasLimit = sdk?.getSignerOrProvider().estimateGas(testspp);
                    console.log(gasLimit, "gasLimit"); 
                    // const gasLimit = await web3.eth.estimateGas({
                    //   ...testspp,
                    //   from: walletAddress,
                    // });
                    const approveTxHash = await signAndSendTransaction({ testspp, gas: gasLimit });
                    console.log("Approve tx hash: ", approveTxHash);
                }
                appprovetokens();
            }

            else if (allowance !== "0") {
                console.log("Allowance is sufficient, swapping...");
                swap(swapParams);
            }
            }).catch((error) => {
                console.error("Error in checking the allowance:", error);
            });
        }

      
    return (
        <div className='p-4 gap-4'>
            <Button
                onClick={checkAllowanceandApprove}
                className='p-4 m-2 hover:cursor-pointer border-green-800'
                variant='solid'
                bgColor="orange"
            >
                Check Allowance
            </Button>
    </div>
    );
};

export default Swap;