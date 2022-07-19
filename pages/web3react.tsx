// src/pages/index.tsx
import type { NextPage } from 'next'
import Head from 'next/head'
import NextLink from "next/link"
import { VStack, Heading, Box, LinkOverlay, LinkBox} from "@chakra-ui/layout"
import { Text, Button } from '@chakra-ui/react'
import {useState,useCallback, useEffect} from "react"
import { ethers } from 'ethers'
import ConnectMetamask from '../components/web3react/connectMetamask'
import EthMsg from "../components/web3react/ethmsg"
import ReadErc20 from '../components/web3react/readErc20'
import TransferErc20 from '../components/web3react/transferErc20'
declare let window:any;
const addressERC20='0x5FbDB2315678afecb367f032d93F642f64180aa3';
const Home: NextPage = () => {

  return (
    <>
      <Head>
        <title>My DAPP</title>
      </Head>

      <Heading as="h3"  my={4}>Explore Web3</Heading>          
      <VStack>
        <ConnectMetamask />
        <EthMsg />
        
        <Box  my={4} p={4} w='100%' borderWidth="1px" borderRadius="lg">
          <Heading my={4}  fontSize='xl'>Task 2</Heading>
          <Text>read ERC20</Text>
          <ReadErc20 addressContract={addressERC20} />
        </Box>

        <Box  my={4} p={4} w='100%' borderWidth="1px" borderRadius="lg">
          <Heading my={4}  fontSize='xl'>Task 3</Heading>
          <Text>transfer ERC20</Text>
          <TransferErc20 addressContract={addressERC20} />
        </Box>

      </VStack>
    </>
  )
}

export default Home