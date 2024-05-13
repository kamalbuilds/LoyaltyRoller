import Container from '@/components/Container/Container';
import React, { useEffect, useState } from 'react';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import Image from 'next/image';
import DeployCollection from '@/components/Collections/DeployCollection';
import MintNFT from '@/components/Collections/MintNFT';
import DisplayCollection from '@/components/Collections/DisplayCollection';

const CollectionPage = () => {



    return (
        <Container maxWidth="lg">
            Collections Page

            <DisplayCollection />

            <div className='flex gap-16'>
                <DeployCollection />
                <MintNFT />
            </div>


        </Container>
    );
};

export default CollectionPage;