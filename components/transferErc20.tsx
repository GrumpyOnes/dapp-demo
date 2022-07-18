import {useEffect, useState,useCallback} from "react"
import {ethers,Contract} from 'ethers'
import {ERC20ABI} from '../abi/ERC20abi'
import {Button, Input , NumberInput, NumberInputField, FormControl, FormLabel } from '@chakra-ui/react'
import {parseEther} from 'ethers/lib/utils'
import {TransactionResponse,TransactionReceipt} from '@ethersproject/abstract-provider'
type Props={
    addressContract:string,
    currentAccount:string
}
declare let window:any;
export default function ReadErc20(props:Props) {
    const {addressContract,currentAccount} = props;
    const [amount,setAmount] = useState('100')
    const [toAddress,setToAddress] = useState<string>('');
    const transfer = useCallback(async (event:any)=>{
        event.preventDefault()
        if(!window.ethereum) return;
        const provider:any =new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const erc20:Contract = new ethers.Contract(addressContract,ERC20ABI,signer)
        
        const trans:TransactionResponse = await erc20.transfer(toAddress,parseEther(amount))
        const recepted:TransactionReceipt =await trans.wait();
        console.log("receipt:",recepted)

    },[addressContract,toAddress,amount])

    return (<form onSubmit={transfer}>
        <FormControl>
        <FormLabel htmlFor='amount'>Amount: </FormLabel>
          <NumberInput defaultValue={amount} min={10} max={1000} onChange={setAmount}>
            <NumberInputField />
          </NumberInput>
          <FormLabel htmlFor='toaddress'>To address: </FormLabel>
          <Input id="toaddress" type="text" required  onChange={(e) => setToAddress(e.target.value)} my={3}/>
          <Button type="submit" isDisabled={!currentAccount}>Transfer</Button>
        </FormControl>
        </form>)
}