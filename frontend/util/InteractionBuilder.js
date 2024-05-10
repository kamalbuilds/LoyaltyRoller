import { ethers } from 'ethers';
import UniswapV2ABI from '../constants/UniswapV2ABI.js';

export default class InteractionBuilder {

    globalEncoder = new ethers.AbiCoder();


    buildInteraction(target, extraData, calldata) {
        return target+extraData.replaceAll('0x', '')+calldata.replaceAll('0x', '');
    }

    // funny, target is what we want to do the interaction callback but also where we want the funds to end up. 
    /**
     * 
     * @param {amount of token0 to output} amountOut0 
     * @param {amount of token1 to output} amountOut1 
     * @param {the token address you're selling} inputToken 
     * @param {the liquidity pool you're going through} pool 
     * @param {*} actionType 
     * @returns 
     */
    encodeTradeOneTokenUniswapV2Swap(amountOut0, amountOut1, inputToken, pool, mySmartContract) // callback_calldata is excluded as we don't use the callback. 
    {
        let uv2Interface = new ethers.Interface(UniswapV2ABI);
        let swapData = uv2Interface.encodeFunctionData('swap', [amountOut0, amountOut1, pool, '0x']);
        let calldata = this.globalEncoder.encode(['address', 'address', 'uint256', 'bytes'], [pool, inputToken, 0, swapData]);
        return this.buildInteraction(mySmartContract, '0x02', calldata);
    }



}