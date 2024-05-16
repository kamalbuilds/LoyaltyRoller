// @ts-nocheck
import Container from '../../components/Container/Container';
import React, { useEffect, useState } from 'react';
import { Input } from "../../components/ui/input"
import { Button } from "../../components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../../components/ui/card"
import { Label } from "../../components/ui/label"
import Image from 'next/image';

const MintNFT = () => {

    //TODO: Make it as params


    const [userAddress, setUserAddress] = useState();

    const handleMint = async () => {

        if (!userAddress) return;

        const chainId = 919;
        const address = "0xf9203991e084e0dbea97CcB9c6791a8C40B1C131"; //contract address of collection

        const options = {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                'x-api-key': '45a5afb2-e232-4b78-aa2a-f436f9d36129'
            },
            body: JSON.stringify(
                {
                    //TODO: Change this to userAddress.
                    mints: [{ to: userAddress }]
                })
        };

        fetch(`https://contracts-api.owlprotocol.xyz/api/project/collection/${chainId}/${address}/mint/erc721AutoId`, options)
            .then(response => response.json())
            .then(response => console.log("Response >>>>>>>", response))
            .catch(err => console.error(err));
    }


    return (
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle>Mint NFT</CardTitle>
                <CardDescription>Mint NFT of the passed Collection Address</CardDescription>
            </CardHeader>
            <CardContent>
                <form>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">Address</Label>
                            <Input
                                className='placeholder:text-gray-600 border-gray-700	focus:border-white'
                                id="name"
                                name="name"
                                placeholder="Name of your collection"
                                value={userAddress}
                                onChange={(e) => setUserAddress(e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="type">Collection Type</Label>
                            <Input
                                className='placeholder:text-gray-600 border-gray-700 focus:border-white'
                                id="type"
                                value='ERC721'
                                name="type"
                            />
                        </div>

                        <div className='flex flex-col gap-8 items-center'>
                            {/* {imageUrl && (
                            <Image src={imageUrl} alt="Uploaded" width={100} height={100} />
                        )} */}
                            <Input
                                type="file"
                                id="actual-btn"
                                accept="image/*"
                                style={{ display: 'none' }}
                            // onChange={handleImageChange}
                            />
                            {/* {imageUrl ? (
                            <Button onClick={handleRemoveImage} className='border border-gray-800 px-4 py-4 rounded-xl'>Remove Image</Button>
                        ) : (
                            <Label className='border border-gray-800 px-4 py-4 rounded-xl' htmlFor="actual-btn">Upload Image</Label>
                        )} */}
                        </div>


                    </div>
                </form>
            </CardContent>
            <CardFooter className="block">
                <Button
                    onClick={handleMint}
                    className='w-full' variant="outline" >Mint</Button>
            </CardFooter>
        </Card>
    );
};

export default MintNFT;