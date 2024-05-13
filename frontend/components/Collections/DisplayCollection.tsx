import React, { useState } from 'react';
import { Button } from '../ui/button';

const DisplayCollection = () => {

    const [collections, setCollections] = useState([]);

    const getCollections = async () => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                'x-api-key': '4420934b-eaf9-4ff8-8ab7-48729855913e'
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
        <div>

            <Button variant="outline" onClick={getCollections}>Get Collection</Button>

        </div>
    );
};

export default DisplayCollection;