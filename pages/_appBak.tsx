import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {ChakraProvider} from "@chakra-ui/react";
import Layout from '../components/layout'

function MyApp({ Component, pageProps }: AppProps) {
  return (<ChakraProvider>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </ChakraProvider>)
}

export default MyApp

//这里是为使用web3-react swr前的配置
