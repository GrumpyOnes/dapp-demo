import {useEffect, useState} from 'react'
import {useWeb3React} from '@web3-react/core'
import {Web3Provider} from "@ethersproject/providers"
import {Text} from "@chakra-ui/react"
import {formatEther} from "ethers/lib/utils"

const ETHBalance = ()=>{
    const [ethBalance,setEthBalance]  = useState<number | undefined>()
    const {account,active,library:providers,chainId} = useWeb3React<Web3Provider>()
    useEffect(()=>{
        if(account && active){
            
            (providers as any)?.getBalance(account).then((result:any)=>{
                console.log('$$$$$$$',result)
                setEthBalance(Number(formatEther(result)))
            })
        }
    },[])
    return (<div>
        {active?(<Text fontSize={"md"} w="100%" my="2" align="left">
            Eth in Account:{ethBalance?.toFixed(3)} {chainId===31337?'Test':' '}Eth
        </Text>):<Text fontSize={"md"} w="100%" my="2" align="left">not actived</Text>}
    </div>)
}
export default ETHBalance 