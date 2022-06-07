import logo from './logo.svg';
import './App.css';
import {
  useConnect,
  useAccount,
  InjectedConnector,
  chain,
  useBalance,
  useContractRead,
  useContractWrite
} from "wagmi";
import { useState } from "react";
import { contractAddress, hrABI } from './ABI/contractABI';

const metamaskConnector = new InjectedConnector({
  chains: [chain.kovan],
})

function App() {
  const [connectResult, connect] = useConnect();
  const [accountResult, disconnect] = useAccount();
 
  const [etherBalance] = useBalance({
    addressOrName: accountResult.data?.address
  });
  const [tokenBalance] = useBalance({
    addressOrName: accountResult.data?.address,
    token: "0xD4298f2d452931e848a7d002Ab4c912f432b12bE"
  });

  const [invPencilResult, getInvPencil] = useContractRead({
    addressOrName: contractAddress,
    contractInterface: hrABI
  }, 'getMyPencil')

  const [invPenResult, getInvPen] = useContractRead({
    addressOrName: contractAddress,
    contractInterface: hrABI
  }, 'getMyPen')
  
  const [error, setError] = useState("");

  const [jumlahPensil, setJumlahPensil] = useState();

  const [jumlahPulpen, setJumlahPulpen] = useState();

  const [beliPensilResult, beliPensil] = useContractWrite({
    addressOrName: contractAddress,
    contractInterface: hrABI,
  }, 'buyPencil', {
    args: [
      jumlahPensil
    ]
  }
  )

  const [beliPulpenResult, beliPulpen] = useContractWrite({
    addressOrName: contractAddress,
    contractInterface: hrABI,
  }, 'buyPen', {
    args: [
      jumlahPulpen
    ]
  }
  )

  const connectMetamask = async() => {
    try{
      const result = await connect(metamaskConnector)
      if(result.data.chain.unsupported){
        throw new Error("Network is not supported!")
      }
    }
      catch (err) {
        setError(err.message)
      }
  };

  console.log(invPencilResult.data);
  console.log(invPenResult.data);
  return (
    <div>
      {connectResult.data.connected ? 
      <div className='content'>
        <h2 className='title'>Selamat Datang di Toko Alat Tulis Gary Writing!</h2>
          <div>
        <p className='subTitle'>Address Account Anda :</p> 
        <p>{accountResult.data.address}</p>
        <p className='subTitle'>Error : </p> 
        <p>{error ? error : "none"}</p>
        <p className='subTitle'>Balance ETH Anda :</p> 
        <p>{etherBalance.data?.formatted} {etherBalance.data?.symbol}</p>
        <p className='subTitle'>Balance GT Anda : </p>
        <p>{tokenBalance.data?.formatted} {tokenBalance.data?.symbol}</p>
        
        
        <div className='productCard'>
          <img className='productImage' src='https://www.jd.id/news/wp-content/uploads/2022/02/Pencils.jpg'/>
          <br />
          <input placeholder='Jumlah' type={'number'} onChange={e => setJumlahPensil(e.target.value)}/>
          <button onClick={async() => await beliPensil()}>Beli Pensil</button>
          <p>Pensil saya : 
            {/* {invPencilResult.data} */}
          </p>
          <button onClick={getInvPencil}>Update</button>
        </div>
        <div className='productCard'>
          <img className='productImage' src='https://www.tagar.id/Asset/uploads2019/1571137044040-pulpen.jpg'/>
          <br />
          <input placeholder='Jumlah' type={'number'} onChange={e => setJumlahPulpen(e.target.value)}/>
          <button onClick={async() => await beliPulpen()}>Beli Pulpen</button>
          <p>Pulpen saya : 
            {/* {invPenResult.data} */}
          </p>
          <button onClick={getInvPen}>Update</button>
        </div>
        <br />
        <br />
        <button onClick={disconnect}>Disconnect</button>
      </div>
    </div>
       : (
      <button onClick={connectMetamask}>Connect Wallet</button>
      )}
    </div>
  );
}

export default App;
