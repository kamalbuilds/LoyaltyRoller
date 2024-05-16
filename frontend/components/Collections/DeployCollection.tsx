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

const DeployCollection = () => {

    const [imageFile, setImageFile] = useState(null);
    const [imageUrl, setImageUrl] = useState('');

    const handleImageChange = (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setImageFile(file);
            setImageUrl(reader.result);
        };

        if (file) {
            reader.readAsDataURL(file);

        }
    };

    const handleRemoveImage = () => {
        setImageFile(null);
        setImageUrl('');
    };

    const [object, setObject] = useState({
        name: '',
        symbol: '',
        type: 'ERC721',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setObject({
            ...object,
            [name]: value
        });
    };

    const handleDeploy = () => {
        console.log("Object >>>>>", object, imageUrl);

        const options = {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                'x-api-key': '45a5afb2-e232-4b78-aa2a-f436f9d36129'
            },
            body: JSON.stringify({
                chainId: 919,
                name: object.name,
                symbol: object.symbol,
                type: 'ERC721',
                contractImage: imageUrl,
                feeNumerator: '500'
            })
        };

        fetch('https://contracts-api.owlprotocol.xyz/api/project/collection/deploy', options)
            .then(response => response.json())
            .then(response => console.log("Response >>>>", response))
            .catch(err => console.error(err));

    }

    return (
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle>Deploy Collection</CardTitle>
                <CardDescription>Deploy your new project in one-click.</CardDescription>
            </CardHeader>
            <CardContent>
                <form>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">Collection Name</Label>
                            <Input
                                className='placeholder:text-gray-600 border-gray-700	focus:border-white'
                                id="name"
                                name="name"
                                placeholder="Name of your collection"
                                value={object.name}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="symbol">Symbol</Label>
                            <Input
                                className='placeholder:text-gray-600 border-gray-700 focus:border-white'
                                id="symbol"
                                name="symbol"
                                placeholder="Collection Symbol"
                                value={object.symbol}
                                onChange={handleChange}
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
                            {imageUrl && (
                                <Image src={imageUrl} alt="Uploaded" width={100} height={100} />
                            )}
                            <Input
                                type="file"
                                id="actual-btn"
                                accept="image/*"
                                style={{ display: 'none' }}
                                onChange={handleImageChange}
                            />
                            {imageUrl ? (
                                <Button onClick={handleRemoveImage} className='border border-gray-800 px-4 py-4 rounded-xl'>Remove Image</Button>
                            ) : (
                                <Label className='border border-gray-800 px-4 py-4 rounded-xl' htmlFor="actual-btn">Upload Image</Label>
                            )}
                        </div>


                    </div>
                </form>
            </CardContent>
            <CardFooter className="block">
                <Button onClick={handleDeploy} className='w-full' variant="outline" >Deploy</Button>
            </CardFooter>
        </Card>
    );
};

export default DeployCollection;