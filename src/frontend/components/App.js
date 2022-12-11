import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import React, { Component } from 'react';
import './App.css';
import { ethers } from "ethers";
import { useState } from "react";
import Navigation from "../components/Navbar";
import Home from "../components/Home";
import Create from "../components/Create";
import MyListedItems from "../components/MyListedItem";
import MyPurchases from "../components/MyPurchases";
import MarketplaceAbi from "../contractsData/Marketplace.json";
import MarketplaceAddress from "../contractsData/Marketplace-address.json";
import NFTAbi from "../contractsData/NFT.json";
import NFTAddress from "../contractsData/NFT-address.json";
import  { Spinner }  from "reactstrap"
import { WalletConnectProvider } from "@hashgraph/web3-provider";

function App() {

  // useState hook use to store values on the front end
  // pairing string for hashpack wallet connect
  
  const [loading, setLoading] = useState(true)
  const [accountid, setAccountId] = useState(null)
  const [nft, setNFT] = useState({})
  const [marketplace, setMarketplace] = useState({})

  //   hashpack wallet connect  
  const pairHashpack = async () => {

    // Query list of wallet addrs

    // Set the wallet account to the 1st addrs
    setAccountId(accountid[0])

    // Get provider from wallet address eg haspack/MM
    const provider = new WalletConnectProvider(window.ethereum);

    // Set signer
    const signer = provider.getSigner()

    // Load contract from the blockchain and sign
    loadContracts(signer)
  }

  const loadContracts = async (signer) => {
    // Get deployed copies of contract
    
    const marketplace = new ethers.Contract(MarketplaceAddress.address, MarketplaceAbi.abi, signer)
    setMarketplace(marketplace)
    const nft = new ethers.Contract(NFTAddress.address, NFTAbi.abi, signer)
    setNFT(nft)
    setLoading(false)
  }
  
  return (
    <BrowserRouter>
      <div className= "App">     
        <Navigation pairHashpack={pairHashpack} accountid={accountid} />   
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignitems: 'center', minHeight: '80vh' }}>
            <Spinner animation="border" style={{ display: 'flex' }} />
            <p className='mx-3 my-0'> Awaiting Hashpack Connection...</p>
          </div>
        ) : (
          <Routes>
            <Route path="/" element={<Home marketplace={marketplace} nft={nft}/>} />
            <Route path="/create" element={<Create marketplace={marketplace} nft={nft}/>} />
            <Route path="/my-listed-items" element={<MyListedItems marketplace={marketplace} nft={nft} account={accountid}/> } />
            <Route path="/my-purchases" element={<MyPurchases marketplace={marketplace} nft={nft} account={accountid}/>} />
          </Routes>
        )}

      </div>

    </BrowserRouter>
  );
}

export default App;
