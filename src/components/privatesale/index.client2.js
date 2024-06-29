'use client';
import React, { useState } from 'react';
import Web3 from 'web3';
import PrivateSaleABI from '../smart-contracts/NewPrivateSaleABI.json';
import Select from 'react-select';
import Breadcrumb from "../common/Breadcrumb"
import { useForm } from "react-hook-form";
import CountdownClockSmall from "@/ui/CountDownClockSmall";
import axios from 'axios';
import Link from "next/link";

const options = [
  { value: 'depositBNB', label: 'BNB' },
];

// Function to get the BNB to USD exchange rate
function getBNBtoUSDExchangeRate() {
    return axios.get('https://api.binance.com/api/v3/ticker/price?symbol=BNBUSDT')
        .then(response => parseFloat(response.data.price))
        .catch(error => {
            console.error('Error getting BNB to USD exchange rate:', error);
            return 0;
        });
}

const PrivateSale = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [account, setAccount] = useState(null);
    const [amount, setAmount] = useState('0.1');
    const [selectedFunction, setSelectedFunction] = useState('');
    const [selectedOption, setSelectedOption] = useState(null);
    const [connectionStatus, setConnectionStatus] = useState('');
    const web3 = typeof window !== 'undefined' && window.ethereum ? new Web3(window.ethereum) : null;
    const contractAddress = '0xc2E2F67d4802824A7093679cf1247CF3276349Ee';
    const contract = web3 ? new web3.eth.Contract(PrivateSaleABI, contractAddress) : null;

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
            const userId = localStorage.getItem('userId');
        
            try {
                const receipt = await contract.methods[selectedFunction]().send({ from: account, gasPrice: gasPrice, value: amountToSend });
                console.log('receipt', receipt);
    
                // Get the BNB to USD exchange rate
                const exchangeRate = await getBNBtoUSDExchangeRate();
    
                // Convert the BNB amount to USD
                const usdAmount = Number(web3.utils.fromWei(amountToSend, 'ether')) * exchangeRate;
    
                // Calculate the token amount based on a specified token price
                const tokenPrice = 0.0005; // Replace with your token price
                const tokenAmount = usdAmount / tokenPrice;
    
                // Prepare the data to send to the server
                const data = {
                    userId: userId, // Get the user's id from local storage
                    txid: receipt.transactionHash, // Use the transaction hash as the txid
                    amount: amountToSend,
                    coin: selectedOption.label, // Use the label of the selected option
                    senderAddress: receipt.from, // Get the sender's address from the transaction receipt
                    tokenAmount: tokenAmount.toString() // Convert the token amount to a string
                };

                // Get the JWT from wherever it's stored
                const jwt = localStorage.getItem('jwt');
                console.log('JWT from local storage:', jwt);

                if (!jwt) {
                    console.error('JWT not found in local storage.');
                    return;
                }

                // Send the data to the server
                axios.post('http://localhost:5000/private-sale', data, {
                    headers: {
                        Authorization: `Bearer ${jwt}`
                    }
                })
                .then(response => {
                    console.log('Server response:', response);
                })
                .catch(error => {
                    console.error('Error sending data to server:', error);
                });
            }
         catch (error) {
            console.log('Transaction has been denied.', error);
        }
    }
}

    const onSubmit = (data) => {
        sendTransaction();
    };

    return (
        <main>
            <Breadcrumb title="Private Sale" />
            <section className="eg-login__area pt-140 pb-140 p-relative z-index-1 fix">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xl-6 col-lg-8-inner-wrap">
                            <div className="eg-login__wrapper">
                                <div className="col-lg-12">
                                    <div className="section-title text-center mb-60">
                                        <h2 className="title">Private Sale</h2>
                                        <p className="text" style={{ paddingTop: '15px', paddingBottom: '15px' }}> Secure iQopy tokens at $1 = 2,000 IQO. Act fast before the countdown ends! Token price will double to $1 = 1,000 IQO. Ensure your Metamask wallet is connected to BNB Smart Chain network to transfer BNB.</p>
                                        <div className="banner-countdown-wrap">
                                            <div className="coming-time" data-countdown="2024/4/16">
                                            <CountdownClockSmall />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div>
                                        <div>
                                            <div className="form-grp">
                                                <button className="btn w-100" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} onClick={connectWallet}>Connect Wallet</button>
                                                <p className="form_error">{connectionStatus}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="eg-login__input-wrapper">
                                            <div className="eg-login__input-box">
                                                <div className="eg-login__input">
                                                    <div className="form-grp">
                                                        <label htmlFor="text">Select the Amount</label>
                                                        <input type="text" {...register("amount")} value={amount} onChange={e => setAmount(e.target.value)} placeholder="Enter amount" />
                                                        <p className="form_error">{errors.amount?.message}</p>
                                                    </div>
                                                </div>
                                            </div> 
                                        </div>
                                            <div className="eg-login__input-wrapper">
                                                <div className="eg-login__input-box">
                                                    <div className="eg-login__input">
                                                        <div className="form-grp">
                                                            <label htmlFor="text">Select the coin</label>
                                                            <Select
                                                                options={options}
                                                                onChange={e => { setSelectedFunction(e.value); setSelectedOption(e); }}
                                                                styles={{
                                                                    control: (provided) => ({
                                                                        ...provided,
                                                                        width: '100%',
                                                                        border: 'none',
                                                                        fontSize: '15px',
                                                                        fontWeight: '400',
                                                                        display: 'flex',
                                                                        alignItems: 'center', // Align items vertically
                                                                        padding: '0 20px', // Adjust the padding as needed
                                                                        color: 'var(--tg-white)',
                                                                        borderRadius: '5px',
                                                                        height: '60px', // Adjust the height as needed
                                                                        transition: '.3s linear',
                                                                        background: 'hsla(0,0%,100%,.07)',
                                                                    }),
                                                                    placeholder: (provided) => ({
                                                                        ...provided,
                                                                        color: 'var(--tg-white)', // Adjust the color as needed
                                                                    }),
                                                                    singleValue: (provided) => ({
                                                                        ...provided,
                                                                        color: 'var(--tg-white)', // Adjust the color as needed
                                                                    }),
                                                                    valueContainer: (provided) => ({
                                                                        ...provided,
                                                                        justifyContent: 'left', // Align the text to the left
                                                                        padding: '0', // Remove the padding
                                                                    }),
                                                                    indicatorsContainer: (provided) => ({
                                                                        ...provided,
                                                                        height: '60px', // Adjust the height as needed
                                                                        padding: '0', // Remove the padding
                                                                    }),
                                                                    menu: (provided) => ({
                                                                        ...provided,
                                                                        background: 'var(--tg-secondary-color)', // Adjust the background color as needed
                                                                    }),
                                                                }}
                                                            />
                                                            <p className="form_error">{errors.function?.message}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                    </div>
                                    <div>
                                        <div>
                                        <p style={{ textAlign: 'center' }}>Please make sure you are logged in. <span><Link href="/login">Sing In</Link></span></p>
                                            <div className="eg-login__bottom"></div>
                                            <button type="submit" className="btn w-100" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Send</button>
                                            </div>
                                    </div>
                                </form>
                            </div>  {/*eg-login__wrapper*/}
                        </div> {/*col-xl-6 col-lg-8-inner-wrap*/}
                    </div> {/*row justify-content-center*/}
                </div> {/*container*/} 
            </section>
        </main>
    );
}

export default PrivateSale;