export const CONNECT_WALLET = "CONNECT_WALLET";
export const DISCONNECT_WALLET = "DISCONNECT_WALLET";
export const UPDATE_WALLET = "UPDATE_WALLET";
export const SET_STATUS = "SET_STATUS";
export const SET_TX_STATUS = "SET_TX_STATUS";

export const connectWallet = (payload) => ({
  type: CONNECT_WALLET,
  payload
});

export const disconnectWallet = () => ({
  type: DISCONNECT_WALLET
});

export const updateWallet = (payload) => ({
  type: UPDATE_WALLET,
  payload
});

export const setStatus = (payload) => ({
  type: SET_STATUS,
  payload
});

export const setTxStatus = (payload) => ({
  type: SET_TX_STATUS,
  payload
});