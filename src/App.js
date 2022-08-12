import logo from './logo.svg';
import './App.css';
import MetaMaskOnboarding from '@metamask/onboarding';
import { useState } from 'react';

function App() {
  const [onboarding, setOnboarding] = useState(
    new MetaMaskOnboarding()
  );

  function startOnboarding() {
    console.log("start onboarding");
    onboarding.startOnboarding();

  }

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Metamask test
        </p>
        <button onClick={startOnboarding}>start onboarding</button>
      </header>
    </div>
  );
}

export default App;
