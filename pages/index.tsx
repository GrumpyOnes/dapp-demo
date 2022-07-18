// src/pages/index.tsx
import type { NextPage } from 'next'
import Head from 'next/head'
import NextLink from "next/link"
import { VStack, Heading, Box, LinkOverlay, LinkBox} from "@chakra-ui/layout"
import { Text, Button } from '@chakra-ui/react'
import {useState,useCallback, useEffect} from "react"
import { ethers } from 'ethers'
import ReadErc20 from '../components/readErc20'
import TransferErc20 from '../components/transferErc20'

declare let window:any;
const addressERC20='0x5FbDB2315678afecb367f032d93F642f64180aa3';
const Home: NextPage = () => {
  const [currentAccount,setCurrentAccount] = useState<string | undefined>();
  const onClickDisconnect = useCallback(()=>{},[])
  const onClickConnect = useCallback(async ()=>{
    if(!window.ethereum){
      console.log("please install metamask!");
      return;
    }
    const provider:any = new ethers.providers.Web3Provider(window.ethereum);
    const accounts = await provider.send("eth_requestAccounts").catch((err:any)=>{
      console.log(err)
    });
    if(accounts?.length>0){
      setCurrentAccount(accounts[0])
    }
  },[])
  const [balance,setBalance] = useState<string | undefined>()
  const [chainmsg,setChainmsg] = useState<any>({});
  useEffect(()=>{
    if(!currentAccount || !ethers.utils.isAddress(currentAccount)){
      return;
    }
    const provider:any= new ethers.providers.Web3Provider(window.ethereum);
    provider.getBalance(currentAccount).then((data:any)=>{
      setBalance(ethers.utils.formatEther(data))
    })
    provider.getNetwork().then((data:any)=>{
      console.log('*****data*****',data)
      setChainmsg(data)
    })
  },[currentAccount])
  return (
    <>
      <Head>
        <title>My DAPP</title>
      </Head>

      <Heading as="h3"  my={4}>Explore Web3</Heading>          
      <VStack>
        <Box  mb={0} p={4} w='100%' borderWidth="1px" borderRadius="lg">
          {currentAccount?<Button type="button" w={"100%"} onClick={onClickDisconnect}>
            Account:{currentAccount}
          </Button>:<Button type="button" w={"100%"} onClick={onClickConnect}>
            Connect Metamask
          </Button>}
          
        </Box>
        {currentAccount && (<Box  mb={0} p={4} w='100%' borderWidth="1px" borderRadius="lg">
            <Heading my={4}  fontSize='xl'>Account info</Heading>
            <Text>ETH Balance of current account: {balance}</Text>
            <Text>Chain Info: ChainId - {chainmsg.chainId} ,name - {chainmsg.name}</Text>
        </Box>)}
        <Box  my={4} p={4} w='100%' borderWidth="1px" borderRadius="lg">
          <Heading my={4}  fontSize='xl'>Task 2</Heading>
          <Text>read ERC20</Text>
          <ReadErc20 addressContract={addressERC20} currentAccount={currentAccount||''} />
        </Box>

        <Box  my={4} p={4} w='100%' borderWidth="1px" borderRadius="lg">
          <Heading my={4}  fontSize='xl'>Task 3</Heading>
          <Text>transfer ERC20</Text>
          <TransferErc20 addressContract={addressERC20} currentAccount={currentAccount||''} />
        </Box>

        <LinkBox  my={4} p={4} w='100%' borderWidth="1px" borderRadius="lg">
          <NextLink href="https://github.com/NoahZinsmeister/web3-react/tree/v6" passHref>
          <LinkOverlay>
            <Heading my={4} fontSize='xl'>Task 3 with link</Heading>
            <Text>Read docs of Web3-React V6</Text>
          </LinkOverlay>
          </NextLink>
        </LinkBox>
      </VStack>
    </>
  )
}

export default Home