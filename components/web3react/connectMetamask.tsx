import {useEffect,useCallback} from "react"
import {useWeb3React} from "@web3-react/core"
import {Web3Provider} from "@ethersproject/providers"
import {Box,Button,Text} from "@chakra-ui/react"
import { providers } from "ethers"
import {injected} from './utils/connectors'
import { UserRejectedRequestError } from "@web3-react/injected-connector"


const ConnectMetamask = ()=>{
    const {chainId,account:currentAccount,activate,deactivate,setError,active,library:providers,connector} = useWeb3React<Web3Provider>()
    const onClickConnect = useCallback(()=>{
        activate(injected,(error)=>{
            if(error instanceof UserRejectedRequestError){
                console.log('user refused.')
            }else{
                setError(error)
            }
        })
    },[])
    const onClickDisconnect = useCallback(()=>{
        deactivate()
    },[])
    return (<Box  mb={0} p={4} w='100%' borderWidth="1px" borderRadius="lg">
    {currentAccount?<Button type="button" w={"100%"} onClick={onClickDisconnect}>
      Account:{currentAccount}
    </Button>:<Button type="button" w={"100%"} onClick={onClickConnect}>
      Connect Metamask
    </Button>}
    
  </Box>)
}
export default ConnectMetamask