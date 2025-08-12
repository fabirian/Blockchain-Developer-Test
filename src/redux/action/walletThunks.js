import { ethers } from 'ethers';
import {
  connectWallet,
  disconnectWallet as disconnectWalletAction, 
  updateWallet,
  setStatus,
  setTxStatus
} from './walletActions';

let provider;

export const initWallet = () => async (dispatch) => {
  try {
    dispatch(setStatus({ status: 'connecting', message: 'Connecting to wallet...' }));
    
    if (!window.ethereum) throw new Error('MetaMask not installed');
    
    provider = new ethers.providers.Web3Provider(window.ethereum);
    const accounts = await provider.send('eth_requestAccounts', []);
    
    if (!accounts.length) throw new Error('No accounts found');
    
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    const network = await provider.getNetwork();
    
    dispatch(connectWallet({ address, network }));
    dispatch(setStatus({ status: 'connected', message: 'Wallet connected' }));
    
    window.ethereum.on('accountsChanged', (newAccounts) => {
      if (newAccounts.length) {
        dispatch(updateWallet({ address: newAccounts[0] }));
      } else {
        dispatch(disconnectWallet());
      }
    });
    
    window.ethereum.on('chainChanged', async () => {
      const network = await provider.getNetwork();
      dispatch(updateWallet({ network }));
    });
    
  } catch (error) {
    dispatch(setStatus({ status: 'error', message: error.message }));
  }
};

export const sendTransaction = (txConfig) => async (dispatch) => {
  try {
    dispatch(setTxStatus({ status: 'pending', message: 'Confirm in wallet...' }));

    const signer = provider.getSigner();
    const tx = await signer.sendTransaction(txConfig);

    dispatch(setTxStatus({ status: 'pending', message: 'Transaction pending...' }));

    await tx.wait();

    dispatch(setTxStatus({
      status: 'success',
      message: `Minted! Tx hash: ${tx.hash}`
    }));

  } catch (error) {
    let errorMsg = '';

    if (error.code === 'ACTION_REJECTED') {
      errorMsg = 'Transaction rejected by user';
    } else if (
      error.message?.toLowerCase().includes('insufficient funds') ||
      error.code === 'INSUFFICIENT_FUNDS'
    ) {
      errorMsg = 'No hay fondos';
    } else {
      errorMsg = error.message;
    }

    dispatch(setTxStatus({ status: 'error', message: errorMsg }));
  }
};


export const disconnectWallet = () => (dispatch) => {
  if (window.ethereum && window.ethereum.removeAllListeners) {
    try {
      window.ethereum.removeAllListeners('accountsChanged');
      window.ethereum.removeAllListeners('chainChanged');
    } catch (error) {
      console.warn('Error removing listeners:', error);
    }
  }

  dispatch(disconnectWalletAction());
};