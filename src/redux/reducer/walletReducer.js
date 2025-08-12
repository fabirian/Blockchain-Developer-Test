import {
  CONNECT_WALLET,
  DISCONNECT_WALLET,
  UPDATE_WALLET,
  SET_STATUS,
  SET_TX_STATUS
} from '../action/walletActions';

const initialState = {
  address: '',
  network: null,
  status: {
    state: 'disconnected', 
    message: ''
  },
  transaction: {
    state: 'idle',
    message: ''
  }
};

export default function walletReducer(state = initialState, action) {
  switch (action.type) {
    case CONNECT_WALLET:
      return {
        ...state,
        address: action.payload.address,
        network: action.payload.network
      };
      
    case DISCONNECT_WALLET:
      return initialState;
      
    case UPDATE_WALLET:
      return {
        ...state,
        ...action.payload
      };
      
    case SET_STATUS:
      return {
        ...state,
        status: action.payload
      };
      
    case SET_TX_STATUS:
      return {
        ...state,
        transaction: action.payload
      };
      
    default:
      return state;
  }
}