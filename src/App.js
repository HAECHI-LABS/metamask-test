import logo from './logo.svg';
import './App.css';
import MetaMaskOnboarding from '@metamask/onboarding';
import { useEffect, useState } from 'react';
import { providers } from 'ethers';
import detectEthereumProvider from '@metamask/detect-provider';

function App() {
  const [onboarding, setOnboarding] = useState(
    new MetaMaskOnboarding()
  );
  const [provider, setProvider] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [balance, setBalance] = useState(null);
  
  async function detectLoggedIn() {
    try {
      const ethersProvider = new providers.Web3Provider(provider, 'any');
      const signer = await ethersProvider.getSigner();
      await signer.getAddress();
      return true;
    } catch (e) {
      return false;
    }
  }

  useEffect(() => {
    detectEthereumProvider().then(provider => {
      setProvider(provider);
      detectLoggedIn().then(setLoggedIn);
      provider.on("accountsChanged", accounts => {
        if (accounts.length === 0) {
          setLoggedIn(false);
        } else {
          setLoggedIn(true);
        }
      })
    })
    .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    async function doWork() {
      if (loggedIn === false) {
        return;
      }
      const ethersProvider = new providers.Web3Provider(provider, 'any');
      const signer = await ethersProvider.getSigner();

      // const accounts = await provider.request({ method: 'eth_requestAccounts' });
      const address = await signer.getAddress();
      setAccounts([address]);
      const balance = await signer.getBalance();
      setBalance(balance.toString());  
    }
    doWork();
  }, [loggedIn])

  function startOnboarding() {
    console.log("start onboarding");
    onboarding.startOnboarding();
  }

  function connect() {
    provider
      .request({ method: 'eth_requestAccounts' })
      .then(() => {
        setLoggedIn(true);
      })
      .catch((err) => {
        if (err.code === 4001) {
          // EIP-1193 userRejectedRequest error
          // If this happens, the user rejected the connection request.
          console.log('Please connect to MetaMask.');
        } else {
          console.error(err);
        }
      });
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Metamask test
        </p>
        <p>
          Metamask is installed: {"" + MetaMaskOnboarding.isMetaMaskInstalled()}
        </p>
        {MetaMaskOnboarding.isMetaMaskInstalled() === false && <button onClick={startOnboarding}>start install in Desktop</button>}
        {MetaMaskOnboarding.isMetaMaskInstalled() === false && <a href={"https://metamask.app.link/dapp/haechi-labs.github.io/metamask-test/"}>install metamask in mobile</a>}
  
        {provider && <p>
          isMetaMask: {"" + provider.isMetaMask} <br />
          loggedIn: {"" + loggedIn} <br />
          {loggedIn === false && <button onClick={connect}>connect metamask</button>}
<br/>
          {loggedIn && <span>accounts: {accounts.join(', ')}</span>}
          <br/>
          {loggedIn && <span>balance: {balance}</span>}
          </p>}
        
      </header>
    </div>
  );
}

export default App;
