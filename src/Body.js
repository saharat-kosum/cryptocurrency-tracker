import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import './Body.css'
import Coins from './Coins'

function Body() {
    const [coins,Setcoins] = useState([]);
    const [search,Setsearch] = useState('');
    const inputsearch = (e)=>Setsearch(e.target.value);
    const filterCoins = coins.filter(coin=>coin.name.toLowerCase().includes(search.toLowerCase()));
    const [isSticky, setSticky] = useState(false);
    const myRef = useRef(null);

    const handleScroll = () => {
        if (window.scrollY>myRef.current.offsetTop) {
          setSticky(true);
        }
        else{
            setSticky(false);
        }
      };

    useEffect(()=>{
        axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
        .then((res)=>{
            Setcoins(res.data);
            console.log('ServerOnline!!')
        }).catch((err)=>console.log(err))
    }, []);

    
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
        window.removeEventListener("scroll", handleScroll);
        };
    }, []);

  return (
    <div>
        <div className='Header'>
            <p>Today's Cryptocurrency Prices</p>
            <div className='searchbar'>
                <input type="search" onChange={inputsearch} placeholder='Search name...'/>
            </div>
        </div>
        <div ref={myRef} className={`Container ${isSticky ? 'fix' : ''}`}>
            <div className='Row'>
                <div className='Coin center'>
                    <div className='CoinImg'></div>
                    <h3>Coin</h3>
                </div>
                <div className='CoinData'>
                    <p className='price'>Price</p>
                    <p className='volume'>Volume</p>
                    <p className='hrChange'>24H Change</p>
                    <p className='MarketCap'>Market Cap</p>
                </div>
            </div>
        </div>
        <div style={{marginBottom:'80px'}}>
            {filterCoins.map(element=><Coins key={element.id} element={element}/>)}
        </div>
    </div>
  )
}

export default Body