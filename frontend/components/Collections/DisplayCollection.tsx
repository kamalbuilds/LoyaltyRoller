// @ts-nocheck
import React, { useState } from 'react';
import { Button } from '../ui/button';

const DisplayCollection = () => {

    const [collections, setCollections] = useState([]);

    const getCollections = async () => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                'x-api-key': '45a5afb2-e232-4b78-aa2a-f436f9d36129'
            }
        };

        fetch('https://contracts-api.owlprotocol.xyz/api/project/contracts', options)
            .then(response => response.json())
            .then(response => {
                console.log("Response >>>", response);
                setCollections(prev => [...prev, ...response]);

            })
            .catch(err => console.error(err));
    }

    console.log("Collections >>>", collections);

    return (
        <div className='my-8'>

            <Button variant="outline" onClick={getCollections}>Get Collection</Button>


            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {collections.map((collection, index) => (
                    <div key={index} className="border rounded-lg p-4 shadow-md">
                        <h2 className="text-xl font-bold mb-2">{collection.contractName}</h2>
                        <p className="text-sm"><strong>Chain ID:</strong> {collection.chainId}</p>
                        <p className="text-sm"><strong>Address:</strong> {collection.address}</p>
                        <p className="text-sm"><strong>Feature Type:</strong> {collection.featureType}</p>
                        <p className="text-sm"><strong>Project ID:</strong> {collection.projectId}</p>
                        <p className="text-sm"><strong>Contract Type:</strong> {collection.collectionContractType}</p>
                        <p className="text-sm"><strong>Metadata Type:</strong> {collection.collectionMetadataType}</p>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default DisplayCollection;