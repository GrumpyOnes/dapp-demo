import {Text,Center,Container,useColorModeValue} from "@chakra-ui/react"
import {useEffect, useState,useCallback} from "react"
import {ethers,Contract} from 'ethers'
import {ERC20ABI} from '../abi/ERC20abi'

type Props={
    addressContract:string,
    currentAccount:string
}
declare let window:any;
export default function ReadErc20(props:Props) {
    const {addressContract,currentAccount} = props;
    const [totalSupply,setTotalSupply]=useState<any>()
    const [myCount,setMyCount] = useState<string|undefined>();

    const [symbol,setSymbol] = useState<string>('')
    useEffect(()=>{
        if(!window.ethereum){return;}
        const provider:any =new ethers.providers.Web3Provider(window.ethereum);
        const erc20:Contract = new ethers.Contract(addressContract,ERC20ABI,provider)
        provider.getCode(addressContract).then((code:string)=>{
            if(code == '0x') return;
            erc20.symbol().then((data:string)=>{
                setSymbol(data)
            }).catch((err:any)=>{console.log(err)})
            erc20.totalSupply().then((data:any)=>{
                setTotalSupply(ethers.utils.formatEther(data))
            }).catch((err:any)=>{console.log(err)})
            
        })

    },[addressContract,currentAccount])
    const getBalance = useCallback(()=>{
        if(!currentAccount || !window.ethereum) return;
        const provider:any =new ethers.providers.Web3Provider(window.ethereum);
        const erc20:Contract = new ethers.Contract(addressContract,ERC20ABI,provider)
        erc20.balanceOf(currentAccount).then((data:any)=>{
            setMyCount(ethers.utils.formatEther(data))
        })
    },[addressContract,currentAccount])
    useEffect(()=>{
        if(!currentAccount || !window.ethereum) return;
        getBalance()
        const provider:any =new ethers.providers.Web3Provider(window.ethereum);
        const erc20:Contract = new ethers.Contract(addressContract,ERC20ABI,provider)
        const fromMe = erc20.filters.Transfer(currentAccount,null)
        erc20.on(fromMe,(from,to,amount,event)=>{
            getBalance()
        })
        const toMe = erc20.filters.Transfer(null,currentAccount)
        erc20.on(toMe,(from,to,amount,event)=>{
            getBalance()
        })
        return ()=>{
            erc20.removeAllListener(fromMe)
            erc20.removeAllListener(toMe)
        }
    },[currentAccount,getBalance])
    return (<div>
        <Text><b>ERC20 Contract:</b>{addressContract}</Text>
        <Text><b>MyToken totalSupply:</b>{totalSupply} {symbol}</Text>
        <Text><b>MyToken in current account:</b>{myCount} {symbol}</Text>
    </div>)
}