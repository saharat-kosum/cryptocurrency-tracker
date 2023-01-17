import React from 'react'
import './Coins.css'

const Coins = (Data) => {
  return (
    <div className='Container'>
        <div className='Row'>
            <div className='Coin'>
                <img className='CoinImg' src={Data.element.image}/>
                <h3>{Data.element.name}</h3>
                <p>{Data.element.symbol}</p> 
            </div>
            <div className='CoinData'>
                <p className='price'>$ {Data.element.current_price.toLocaleString()}</p>
                <p className='volume'>$ {Data.element.total_volume.toLocaleString()} </p>
                {Data.element.price_change_percentage_24h < 0 ? 
                (<p className='hrChange red'>{Data.element.price_change_percentage_24h.toFixed(2)}%</p>):
                (<p className='hrChange green'>{Data.element.price_change_percentage_24h.toFixed(2)}%</p>)}
                <p className='MarketCap'>$ {Data.element.market_cap.toLocaleString()}</p>
            </div>
        </div>
    </div>
  )
}

export default Coins