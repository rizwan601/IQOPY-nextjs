'use client';
import React, { useState } from 'react';
import Web3 from 'web3';
import PrivateSaleABI from '../smart-contracts/PrivateSaleABI.json';
import Select from 'react-select';
import Breadcrumb from "../common/Breadcrumb"

const options = [
  { value: 'depositBNB', label: 'BNB' },
  { value: 'depositUSDT', label: 'USDT' },
  { value: 'depositUSDC', label: 'USDC' },
  { value: 'depositETH', label: 'ETH' },
];

const PrivateSale = () => {
    const [account, setAccount] = useState(null);
    const [amount, setAmount] = useState('0.1');
    const [selectedFunction, setSelectedFunction] = useState('');
    const [connectionStatus, setConnectionStatus] = useState('');
    const web3 = new Web3(window.ethereum);
    const contractAddress = '0xa475C37a649690417049d99dbe51C285FDc7a85e';
    const contract = new web3.eth.Contract(PrivateSaleABI, contractAddress);

    const connectWallet = async () => {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            setAccount(accounts[0]);
            setConnectionStatus('Wallet connected successfully.');
        } catch (error) {
            setConnectionStatus('Failed to connect wallet.');
        }
    }

    const sendTransaction = async () => {
        if (selectedFunction) {
            const gasPrice = await web3.eth.getGasPrice();
            const amountToSend = web3.utils.toWei(amount, 'ether');

            try {
                await contract.methods[selectedFunction]().send({ from: account, gasPrice: gasPrice, value: amountToSend })
                    .on('transactionHash', function(hash){
                        console.log('transactionHash', hash);
                    })
                    .on('receipt', function(receipt){
                        console.log('receipt', receipt);
                    });
            } catch (error) {
                console.log('Transaction has been denied.', error);
            }
        }
    }

    return (
      <main>
        <Breadcrumb title="Private Sale"/>
        <div className="features-inner-wrap">
        <div className="contact-form-wrap">
        <div className="row g-0">
                  <div className="col-57 order-0 order-lg-2">
                     <div className="contact-form">
            <h1>Private Sale</h1>
            <button className="btn" onClick={connectWallet}>Connect Wallet</button>
            <p>{connectionStatus}</p>
            <div style={{ display: 'flex', gap: '10px' }}>
            <input type="text" value={amount} onChange={e => setAmount(e.target.value)} />
                <Select options={options} onChange={e => setSelectedFunction(e.value)} />
              </div>
            <button className="btn" onClick={sendTransaction}>Send</button>
        </div>
        </div>
        </div>
        </div>
        </div>
      </main>
    );  
}

export default PrivateSale;