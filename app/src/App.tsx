import logo from './logo.svg';
import './App.css';
import React, { FC, useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import {
    WalletModalProvider,
    WalletDisconnectButton,
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from "./components/Navbar";
// Default styles that can be overridden by your app
require('@solana/wallet-adapter-react-ui/styles.css');

const App = ()=>{
  return(
    <>
    {/* <nav className='container-fluid bg-black'>
      <div className='flex flex-row'>
        <div className='text-white flex flex-1 py-1'>
        <h1>Quilt</h1>
        </div>
        <div className='flex float-right py-2'>
        <WalletMultiButton/>
        </div>
      </div>
    </nav> */}
  <NavBar/>
    </>
  )
}
export default App;
