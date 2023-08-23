import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal, useWeb3Modal } from '@web3modal/react'
import { configureChains, createConfig, useSignMessage, WagmiConfig } from 'wagmi'
import { arbitrum, mainnet, polygon } from 'wagmi/chains'
import Sign from './Sign'

const chains = [arbitrum, mainnet, polygon]
const projectId = 'bdfef7e974855718253ae017a7be89b6'

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })])
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient
})
const ethereumClient = new EthereumClient(wagmiConfig, chains)

function App() {
  return (
    <>
      <WagmiConfig config={wagmiConfig}>
        <Sign ethereumClient={ethereumClient}/>
      </WagmiConfig>

      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
      <div style={{ position: 'absolute', bottom: 12, left: 12 }}>
        <a href='https://madhavanmalolan.xyz'>Madhavan Malolan</a>
        &nbsp;|&nbsp;
        <a href='https://github.com/madhavanmalolan/ethsignmessage'>GitHub</a>
      </div>
    </>
  )
}

export default App;
