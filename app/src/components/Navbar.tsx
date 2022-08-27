import { useEffect, useState } from "react";
// import { connectWallet, getAccount } from "../utils/wallet";
import logo from "../assets/Quilt.png";
import {
  WalletMultiButton
} from '@solana/wallet-adapter-react-ui';

const Navbar = () => {
  return (
    <div className="navbar navbar-dark bg-dark fixed-top">
      <div className="container py-2">
        <a href="/" className="navbar-brand">
          <img src={logo} width="150px" alt="" />
        </a>
        <div className="d-flex">

          {/* TODO 4.b - Call connectWallet function onClick  */}
          <WalletMultiButton/>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
