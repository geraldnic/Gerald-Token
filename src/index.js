import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider, chain } from 'wagmi';
import { ethers } from 'ethers';

const myProvider = new ethers.providers.JsonRpcProvider(
  'https://speedy-nodes-nyc.moralis.io/0f6aa643f70545beebc8e4f9/eth/kovan', 
  chain.kovan.id)

ReactDOM.render(
  <React.StrictMode>
    <Provider provider={myProvider}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
