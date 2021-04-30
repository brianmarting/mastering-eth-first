import React, { Component, useEffect, useState } from "react";
import web3 from 'web3';
import Account from './account';
import Music from './music';
import getWeb3 from "./getWeb3";
import SocialMusic from "./contracts/SocialMusic.json";
import Following from './following';

const App = () => {

  const [isLoading, setLoading] = useState(true);
  const [account, setAccount] = useState(null);
  const [socialMusicInstance, setSocialMusicInstance] = useState(null);

  useEffect(() => {
    const init = async () => {
      const web3 = await getWeb3();
      const [account] = await web3.eth.getAccounts();
      const networkId = await web3.eth.net.getId();

      const socialMusicContract = await new web3.eth.Contract(
        SocialMusic.abi,
        SocialMusic.networks[networkId] && SocialMusic.networks[networkId].address
      );

      console.log(socialMusicContract)

      setAccount(account);
      setSocialMusicInstance(socialMusicContract);
      setLoading(false);
    }

    init();
  }, []);

  return (
    <div className='App'>
        {isLoading ? 
        <>
          Loading...
        </> : 
        <div className='d-flex flex-column'>
          <Account account={account} socialMusicInstance={socialMusicInstance}></Account>
          <Music account={account} socialMusicInstance={socialMusicInstance}></Music>
          <Following account={account} socialMusicInstance={socialMusicInstance}></Following>  
        </div>
        }
    </div>
  );
}

export default App;
