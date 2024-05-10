import React from 'react';
import { AiOutlineCopy } from "react-icons/ai";
import { shortenText } from '../../helpers/getChain';

const ActiveAsset = ({ activeAsset }: any) => {

    const {
        token_id,
        is_active,
        token0_address,
        token0_amount,
        token1_address,
        token1_amount,
        unclaimed_fees_value_usd
    } = activeAsset;

    console.log("Active Asset", activeAsset, token_id);


    return (
        <div>
            <div className='border border-gray-600 px-[14px] py-[7px] rounded-lg'>
                <div className='text-end text-[36px] text-[#a0a0a0]  mb-8'>{token_id}</div>
                <div className='flex flex-row gap-4 '>
                    <div className='flex flex-col flex-1 items-center'>
                        <div className='text-[22px] text-center mb-4'>Token 0</div>
                        <div className='flex flex-row gap-4'>
                            <div className='text-[16px]'>Address</div>
                            <div className='flex flex-row gap-2 items-center'>
                                {shortenText(token0_address, 6)}
                                <div onClick={() => navigator?.clipboard?.writeText?.(token0_address)}>
                                    <AiOutlineCopy />
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-row gap-4'>
                            <div className='text-[16px]'>Amount</div>
                            <div>{token0_amount}</div>
                        </div>
                    </div>

                    <div className='w-[2px] bg-gray-800 h-[inherit'></div>

                    <div className='flex flex-col flex-1 items-center'>
                        <div className='text-[24px] text-center mb-4'>Token 1</div>
                        <div className='flex flex-row gap-4'>
                            <div>Address</div>
                            <div className='flex flex-row gap-2 items-center'>
                                {shortenText(token1_address, 6)}
                                <div onClick={() => navigator?.clipboard?.writeText?.(token1_address)}>
                                    <AiOutlineCopy />
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-row gap-4'>
                            <div>Amount</div>
                            <div>{token1_amount}</div>
                        </div>
                    </div>
                </div>

                <div className='h-[2px] w-[inehrit] bg-gray-400 my-4'></div>

                <div className='flex flex-row gap-8 items-center justify-center'>
                    <div className='text-[22px]'>Unclaimed Fee Amount</div>
                    <div className='text-[22px]'>{unclaimed_fees_value_usd}</div>
                </div>
            </div>
        </div>
    );
};

export default ActiveAsset;