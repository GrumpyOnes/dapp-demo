import {useEffect, useState,useCallback} from "react"
import {ERC20ABI} from '../../abi/ERC20abi'
import {Button, Input , NumberInput, NumberInputField, FormControl, FormLabel } from '@chakra-ui/react'
import {parseEther,formatEther} from 'ethers/lib/utils'
import {TransactionResponse,TransactionReceipt} from '@ethersproject/abstract-provider'
import { useWeb3React } from "@web3-react/core"
import {Web3Provider} from "@ethersproject/providers"
import {Contract} from "@ethersproject/contracts"


type Props={
    addressContract:string
}
declare let window:any;
export default function ReadErc20(props:Props) {
    const {addressContract} = props;
    const [amount,setAmount] = useState('100')
    const [toAddress,setToAddress] = useState<string>('');
    const {active,account,library:provider} = useWeb3React<Web3Provider>()
    const transfer = useCallback( (event:any)=>{
        event.preventDefault()
        if(!provider || !account || !active) return;
        const erc20:Contract = new Contract(addressContract,ERC20ABI,provider.getSigner());
        erc20.transfer(toAddress,parseEther(amount)).catch((err:any)=>console.log(err));
         
    },[amount,toAddress,provider,account,active])

    return (<form onSubmit={transfer}>
        <FormControl>
        <FormLabel htmlFor='amount'>Amount: </FormLabel>
          <NumberInput defaultValue={amount} min={10} max={1000} onChange={setAmount}>
            <NumberInputField />
          </NumberInput>
          <FormLabel htmlFor='toaddress'>To address: </FormLabel>
          <Input id="toaddress" type="text" required  onChange={(e) => setToAddress(e.target.value)} my={3}/>
          <Button type="submit" isDisabled={!account}>Transfer</Button>
        </FormControl>
        </form>)
}