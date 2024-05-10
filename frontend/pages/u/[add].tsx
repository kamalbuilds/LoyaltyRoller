import React, { useEffect, useState } from 'react';
import { init, useQuery } from "@airstack/airstack-react";
import Container from '../../components/Container/Container';
import UserAssets from '../../components/UserAssets/UserAssets';
import { useChainId } from '@thirdweb-dev/react';
import { useAddress } from '@thirdweb-dev/react';
import { CCIPNavbar } from '../../components/CCIP-Navbar/Navbar';

interface ProfileProps {
  contractAddress: string;
  tokenId: string;
}

// @ts-ignore
init(process.env.NEXT_PUBLIC_APP_AIRSTACK_API_KEY);

const Profile: React.FC<ProfileProps> = ({ contractAddress, tokenId }) => {
    const address = useAddress();
    const add ="0xb42e891e32a7dd40acbf52e359fd6246efd26cc5";

    const query = `query MyQuery {
      Ethereum: TokenBalances(
        input: {filter: {owner: {_eq: "${add}"}, tokenType: {_eq: ERC721}, tokenAddress: {_eq: "0xC36442b4a4522E871399CD717aBDD847Ab11FE88"}}, blockchain: polygon}
      ) {
        TokenBalance {
          amount
          tokenAddress
          tokenId
          tokenType
          tokenNfts {
            contentValue {
              image {
                small
              }
            }
          }
        }
        pageInfo {
          nextCursor
          prevCursor
        }
      }
    }`;

  const { data, loading, error } = useQuery(query);
  console.log(data, data?.Ethereum?.TokenBalance, "Here!!!")

  const chainId = useChainId();
  const [usersProtocol, setUserProtocol] = useState();

  console.log("data", data)

  const getAssetValue = async () => {
    try {
      const response = await fetch(
        `/api/portfoliocurrentvalue?addresses=0xB42e891E32a7Dd40ACbf52e359Fd6246eFD26cc5&chain_id=137`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      const { protocols, total } = result;
      setUserProtocol(protocols);

      if (protocols) {
        const keys = Object.keys(protocols);
      }

      // setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
      // setError(error.message);
    }
  }

  return (
    <Container maxWidth="lg">
      <div>
        <CCIPNavbar />
        <h1 className='p-4 bg-green-300'>Profile Powered by 1inch 🦄 to analyse Uniswap Position 🥃</h1>
        <div onClick={getAssetValue} className='p-4 border hover:cursor-pointer'>Get Asset value</div>

        {usersProtocol && Object.keys(usersProtocol).map((protocol, index) => {
          return (
            <UserAssets protocol={protocol} key={index} usersProtocol={usersProtocol} />
          )
        })}


        {/* <UserAssets /> */}
        {data && data?.Ethereum?.TokenBalance?.map((item: any, index: number) => {
          return (
            <div key={index} className='flex flex-row'>
              <p>Token ID: {item.tokenId}</p>
              <img src={item.tokenNfts.contentValue.image.small} alt="token image" />
            </div>
          )

        })}
      </div>
    </Container>
  );
};

export default Profile;
