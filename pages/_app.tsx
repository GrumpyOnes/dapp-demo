import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {ChakraProvider} from "@chakra-ui/react";
import Layout from '../components/layout'
import {Web3ReactProvider} from "@web3-react/core";
import {Web3Provider} from "@ethersproject/providers"

function getLibrary(provider:any):Web3Provider {
  const library = new Web3Provider(provider) //从ethers里面引入web3provider
  return library
}
function MyApp({ Component, pageProps }: AppProps) {
  return (
  <Web3ReactProvider getLibrary={getLibrary}>
    <ChakraProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  </Web3ReactProvider>)
}

export default MyApp
