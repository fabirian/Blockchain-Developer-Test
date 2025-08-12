import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ethers } from 'ethers';
import {
  initWallet,
  disconnectWallet,
  sendTransaction,
} from '../redux/action/walletThunks';

const WalletConnector = () => {
  const dispatch = useDispatch();
  const { address, network, status, transaction } = useSelector(
    (state) => state.wallet
  );


  useEffect(() => {
    const handleAccountsChanged = (accounts) => {
      if (accounts.length === 0) {
        dispatch(disconnectWallet());
      } else {
        dispatch(initWallet('metamask'));
      }
    };

    const handleChainChanged = () => {
      dispatch(initWallet('metamask'));
    };

    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);
    }

    return () => {
      if (window.ethereum?.removeListener) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      }
    };
  }, [dispatch]);

  const connectWallet = () => {
    dispatch(initWallet('metamask'));
  };

  const handleMint = () => {
    dispatch(
      sendTransaction({
        to: '0x1234567890abcdef1234567890abcdef12345678',
        value: ethers.utils.parseEther('0.01'),
      })
    );
  };

  const btnClass = "btn btn-outline-dark m-2 d-flex align-items-center";

  return (
    <div className="max-w-md mx-auto font-sans p-4">
      {!address ? (
        <div className="text-center">
          <button
            onClick={connectWallet}
            disabled={status.status === 'connecting'}
            className={btnClass}
          >
            <i className="fa fa-sign-in-alt mr-1"></i>
            {status.status === 'connecting' ? 'Connecting...' : 'Connect Wallet'}
          </button>
          {status.message && (
            <p className="text-danger mt-2">{status.message}</p>
          )}
        </div>
      ) : (
        <div className="text-center space-y-4">
          <p>
            <strong>Connected:</strong>{' '}
            <span className="font-mono break-all">{address}</span>
          </p>
          <p>
            <strong>Network:</strong> {network?.name || 'Unknown'}
          </p>

          <div className="d-flex justify-content-center gap-3">
            <button
              onClick={handleMint}
              disabled={transaction.status === 'pending'}
              className={btnClass}
            >
              {transaction.status === 'pending' ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm mr-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  {transaction.message || 'Processing...'}
                </>
              ) : (
                <>
                  <i className="fa fa-plus mr-2" aria-hidden="true"></i>
                  Mint NFT
                </>
              )}
            </button>

            <button
              onClick={() => dispatch(disconnectWallet())}
              className="btn btn-outline-danger m-2 d-flex align-items-center"
            >
              <i className="fa fa-sign-out-alt mr-2" aria-hidden="true"></i>
              Disconnect
            </button>
          </div>

          {(transaction.status === 'success' || transaction.status === 'error') && (
            <p
              className={`mt-4 font-weight-bold ${
                transaction.status === 'success'
                  ? 'text-success'
                  : 'text-danger'
              }`}
            >
              {transaction.message}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default WalletConnector;
