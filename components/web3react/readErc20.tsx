import {Text,Center,Container,useColorModeValue} from "@chakra-ui/react"
import {useEffect, useState,useCallback} from "react"
import {ethers} from 'ethers'
import {ERC20ABI} from '../../abi/ERC20abi'
import {Web3Provider} from "@ethersproject/providers"
import {Contract} from "@ethersproject/contracts"
import {useWeb3React} from '@web3-react/core'
import useSWR from 'swr'
import {formatEther} from 'ethers/lib/utils'

type Props={
    addressContract:string;
}
const fetcher = (library:Web3Provider | undefined,abi:any)=>(...args:any)=>{
    if(!library) return;
    const [arg1,arg2,...params] = args;
    const address = arg1;
    const method = arg2;
    const contract = new Contract(address,abi,library);
    return contract[method](...params);
}
export default function ReadErc20(props:Props) {
    const {addressContract} = props;
    const [totalSupply,setTotalSupply]=useState<string>()
    const [symbol,setSymbol] = useState<string>('')
    const {library:provider,account,active} = useWeb3React<Web3Provider>()

    const {data:balance,mutate} = useSWR([addressContract,'balanceOf',account],{
        fetcher:fetcher(provider,ERC20ABI)
    })
    useEffect(()=>{
        if(!active || !account || !provider) return;
        const erc20:Contract = new Contract(addressContract,ERC20ABI,provider)
        provider.getCode(addressContract).then((data:any)=>{
            if(data==='0x') return;
            erc20.symbol().then((result:string)=>{
                setSymbol(result)
            }).catch('error', console.error)
      
            erc20.totalSupply().then((result:string)=>{
                setTotalSupply(formatEther(result))
            }).catch('error', console.error);

        }).catch(err=>console.log(err))
    },[active])
    useEffect(()=>{
        if(!active || !account || !provider) return;
        const erc20:Contract = new Contract(addressContract, ERC20ABI, provider)
       const fromMe =  erc20.filters.Transfer(account,null);
       const toMe = erc20.filters.Transfer(null, account);
       erc20.on(fromMe,(from,to,amount,event)=>{
        console.log('Transfer|sent', { from, to, amount, event })
        mutate(undefined,true)
       })
       erc20.on(toMe, (from, to, amount, event) => {
        console.log('Transfer|received', { from, to, amount, event })
        mutate(undefined, true)
    })

    return ()=>{
        erc20.removeAllListeners(toMe)
        erc20.removeAllListeners(fromMe)
    }
    },[active,account])

    return (<div>
        <Text><b>ERC20 Contract:</b>{addressContract}</Text>
        <Text><b>MyToken totalSupply:</b>{totalSupply} {symbol}</Text>
        <Text><b>MyToken in current account:</b>{balance && formatEther(balance)} {symbol}</Text>
    </div>)
}