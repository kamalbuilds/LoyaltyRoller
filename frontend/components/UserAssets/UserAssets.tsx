// @ts-nocheck
import React, { useState } from 'react';
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box,
} from '@chakra-ui/react'
import ActiveAsset from './ActiveAsset';
import { getChainNamebyId, shortenText } from '../../helpers/getChain';
import { AiOutlineCopy } from "react-icons/ai";
import toast from 'react-hot-toast';

const UserAssets = ({
    protocol,
    usersProtocol
}: any) => {

    console.log("User Protocol", protocol, typeof (protocol), usersProtocol);

    const values = Object.keys(usersProtocol);

    const { chains, addresses } = usersProtocol[protocol];
    console.log("Chains and addresses", chains, addresses, typeof (values));

    const [activeAssets, setActiveAssets] = useState();


    const getAssetDetails = async () => {
        try {

            if (protocol == 'erc20') {
                toast.error('You can get details on Uniswap branch');
                return;
            }

            const response = await fetch(
                `/api/assetdetails?protocol=${protocol}&addresses=0xB42e891E32a7Dd40ACbf52e359Fd6246eFD26cc5&chain_id=137`
            );

            console.log("response", response);

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const result = await response.json();
            console.log("Result", result);

            // @ts-ignore
            const res = result.filter(asset => asset.is_active == 1)
            console.log("Res", res);
            setActiveAssets(res);
            // setData(result);
        } catch (error) {
            console.error("Error fetching data:", error);
            // setError(error.message);
        }
    }

    console.log("activeAssets", activeAssets);

    return (
        <div>
            <Accordion defaultIndex={[0]} allowMultiple>


                <AccordionItem>
                    <h2>
                        <AccordionButton>
                            <Box as="span" flex='1' textAlign='left' className='text-[32px]'>
                                {protocol.toUpperCase()}
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>


                        <div className='flex gap-4'>
                            <div className='border flex-1 border-gray-600 rounded-lg w-fit px-4 py-2'>
                                <h2 className='text-[18px] mt-2 mb-4'>Addresses:</h2>
                                <div className='flex flex-col gap-4'>
                                    {addresses.map((address, index) => (
                                        <div key={index} className='flex flex-col gap-2'>
                                            <div className='border flex items-center w-fit gap-4 border-gray-400 px-4 py-2 rounded-md'>
                                                {address.address}
                                                <div onClick={() => navigator?.clipboard?.writeText?.(address)}>
                                                    <AiOutlineCopy />
                                                </div>
                                            </div>

                                            <p>Amount: ${address.value_usd.toFixed(2)}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>



                            <div className='border flex-1 border-gray-600 rounded-lg w-fit px-4 py-2'>
                                <h2 className='text-[18px] mt-2 mb-4'>Chains:</h2>
                                <div className='flex flex-col gap-4'>
                                {/* @ts-ignore */}
                                    {chains.map((chain, index) => {
                                        const chainName = getChainNamebyId(chain.chain_id)
                                        return (
                                            <div key={index} className='flex flex-col gap-2'>
                                                <div>${chain.value_usd.toFixed(2)}</div>
                                                <div>Chain: {chainName}</div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>

                        </div>

                        {protocol != 'erc20' && <div onClick={getAssetDetails} className='border border-gray-400 px-4 py-2 rounded-lg my-4 w-fit hover:cursor-pointer'>Get Asset Details</div>
                        }
                        <div className='flex flex-row gap-4 flex-wrap'>
                            {activeAssets && activeAssets?.map((activeAsset: any) => {
                                return (
                                    <div key={activeAsset.token_id} className='flex-1'>
                                        <ActiveAsset activeAsset={activeAsset} />
                                    </div>
                                )
                            })}
                        </div>

                    </AccordionPanel>
                </AccordionItem>

            </Accordion>
        </div>
    );
};

export default UserAssets;