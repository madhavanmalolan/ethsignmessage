import { Web3Modal, useWeb3Modal } from '@web3modal/react'
import { useState, useEffect, useRef } from 'react';
import { configureChains, createConfig, useSignMessage, WagmiConfig, useConnect } from 'wagmi'
import { arbitrum, mainnet, polygon } from 'wagmi/chains'
import { recoverMessageAddress } from 'viem'
import './App.css';
export default function(props) {
    const { open , close } = useWeb3Modal();
    const { connect,  } = useConnect();
    const [message, setMessage] = useState("");
    const recoveredAddress = useRef();
    const [signedObject, setSignedObject] = useState();
    const { data, error, isLoading, signMessageAsync, variables } = useSignMessage()
    const onSubmit = async () => {
        const account = props.ethereumClient.getAccount();
        if(account.isConnected === false && account.isConnecting === false && account.isReconnecting === false) {
            await open();
        }
        const timeout = setInterval(async () => {
            if(account.isConnected) {
                console.log(account)
                clearInterval(timeout);
                console.log("signing message", message)
                const timestamp = Date.now();
                const m = "x19Ethereum Signed Message:\n"+message+" at timestamp: "+timestamp;
                const signature = await signMessageAsync({message : m}, console.error, console.log); 
                setSignedObject({
                    message: m,
                    signature,
                    timestamp : Date(timestamp).toString(),
                    address: account.address,
                    source: "https://signethmessage.org"
                })
                clearInterval(timeout);
            }
        }, 500);
    }
  
    return <>
        <h1>Sign Eth Message</h1>
        <input type="text" placeholder="Enter text you want to sign" value={message} onChange={e => setMessage(e.target.value)}/>
        <input type="button" value="Sign Message" onClick={onSubmit}/>
        {signedObject && <>
            <br />
            <pre>
                {JSON.stringify(signedObject, null, 2)}
            </pre>
        </>}
    </>
}