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

// Default styles that can be overridden by your app
require('@solana/wallet-adapter-react-ui/styles.css');

const App = ()=>{
  return(
    <>
    <nav className='container-fluid bg-black'>
      <div className='flex flex-row'>
        <div className='flex flex-1 py-1'>
        <h1>Quilt</h1>
        </div>
        <div className='flex float-right py-2'>
        <WalletMultiButton/>
        </div>
      </div>
    </nav>

    {/* main content will go here*/}
    <div className='flex justify-center'>
      <div className='flex flex-row my-52'>
      <input type="text" id="wallet_address" className="bg-gray-50 border
       border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500
       focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600
       dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      placeholder="Enter the wallet address" required/>
    
      <button type = "button" className='text-white hover:bg-blue-800
        focus:right-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2.5
      ml-2 bg-blue-500'>Submit</button>
    </div>

    </div>

    </>
  )
}
export default App;
