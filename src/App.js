import logo from './logo.svg';
import './App.css';
import MetaMaskOnboarding from '@metamask/onboarding';
import { useEffect, useState } from 'react';
import detectEthereumProvider from '@metamask/detect-provider';

function App() {
  const [onboarding, setOnboarding] = useState(
    new MetaMaskOnboarding()
  );
  const [provider, setProvider] = useState(null);

  useEffect(() => {
    detectEthereumProvider().then(setProvider)
    .catch(err => console.log(err));
  }, []);

  function startOnboarding() {
    console.log("start onboarding");
    onboarding.startOnboarding();
  }

  // mobile onboarding
  // metamask가 설치되어있는지 확인하기.

  // desktop onboarding

  console.log("metamask installed", MetaMaskOnboarding.isMetaMaskInstalled());

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Metamask test
        </p>
        <p>
          Metamask is installed: {"" + MetaMaskOnboarding.isMetaMaskInstalled()}
        </p>
        {MetaMaskOnboarding.isMetaMaskInstalled() === false && <button onClick={startOnboarding}>start onboarding</button>}
        <p>
          provider: {provider ? "exist" : "not exist"}
        </p>
        {provider && <p>
          connected: {"" + provider.isConnected()} <br/>
          isMetaMask: {"" + provider.isMetaMask}
          </p>}
        <p>metamask deeplink: 메타마스크가 설치되어있으면 메타마스크 안에서 DApp이 열립니다. 설치되어있지 않다면 metamask 설치 페이지로 이동됩니다. <a href="https://metamask.app.link/dapp/haechi-labs.github.io/metamask-test/">https://metamask.app.link/dapp/haechi-labs.github.io/metamask-test/</a></p>
      </header>
    </div>
  );
}

export default App;
