import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [theGoods, setGoods] = useState([])
  const [loaded, setLoaded] = useState(false)
  const [button, setButton] = useState(['A-Z', <i className="fas fa-sort-up"></i>])
  const [order, setOrder] = useState(['ASC', <i className="fas fa-sort-up"></i>])

  // BROUGHT THIS IN TO HELP LOAD THE STATE
  useEffect(() => {
    settingState()
    if (!theGoods) {
      setLoaded(false)
    }
    setLoaded(true)
  }, []);


  // ==========CALL TO GET ALL THE EXCHANGE RATES FOR CRYPTO=============
  // // Use this function to utilizes API calls, to use Json files comment this function out.

  const settingState = async () => {
    let response;
    try {
      response =
        await fetch("https://api.coincap.io/v2/rates", {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept-Encoding': 'gzip',
          }
        })
    } catch (error) { console.error(error) }
    let cryptoData = []
    if (response) {
      let data = await response.json()
      for (let i = 0; i < data.data.length; i++) {
        if (data.data[i].type === 'crypto') {
          cryptoData.push({ ...data.data[i] })
        }
        continue;
      }
      let result = await settingExhangeInfo(cryptoData)
      return setGoods(result)
    }
  }


  // // Use this function to utilizes Json files, to use API comment this function out.

  // const settingState = async () => {
  //   let response;
  //   try {
  //     response =
  //       await fetch("./data.json")
  //   } catch (error) { console.error(error) }
  //   let cryptoData = []
  //   if (response) {
  //     let data = await response.json()
  //     for (let i = 0; i < data.data.length; i++) {
  //       if (data.data[i].type === 'crypto') {
  //         let result = await settingExhangeInfo(data.data[i])
  //         cryptoData.push({ ...result })
  //       }
  //       continue;
  //     }
  //     return setGoods(cryptoData)
  //   }
  // }


  // =============GRAB THE INC. DES. IN 24 HOURS===============
  // // Use this function to utilizes API calls, to use Json files comment this function out.

  const settingExhangeInfo = async (coins) => {
    for (let i = 0; i < coins.length; i++) {
      let asset = coins[i]
      let response;

      try {
        response = await fetch(`https://api.coincap.io/v2/assets/${asset.id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept-Encoding': 'gzip',
          }
        })
      } catch (error) { console.error("RIGHT HERE, THIS RIGHT HERE, IS YOU ERROR", error) }

      if (response) {
        let data = await response.json();
        asset["price"] = parseFloat(data.data.priceUsd).toFixed(2)
        asset["daily"] = parseFloat(data.data.changePercent24Hr).toFixed(2)
      }
    }
    return coins
  }


  // Comment this code in to use json file
  // // Use this function to utilizes Json files, to use API comment this function out.

  // const settingExhangeInfo = async (coins) => {
  //   let response;
  //   try {
  //     response = await fetch(`./exchange.json`)
  //   } catch (error) { console.error("RIGHT HERE, THIS RIGHT HERE, IS YOU ERROR", error) }
  //   if (response) {
  //     let data = await response.json();
  //     coins["price"] = parseFloat(data[coins.id].data.priceUsd).toFixed(2)
  //     coins["daily"] = parseFloat(data[coins.id].data.changePercent24Hr).toFixed(2)
  //   }
  //   return coins
  // }



  // SORTS THE STATE IN ALPHA ORDER, FORWARD AND BACK
  const handleAlphabet = (e) => {
    let holdingSort
    if (e.target.parentNode.value === "A-Z") {
      holdingSort = theGoods.sort(function (a, b) {
        var textA = a.id.toUpperCase();
        var textB = b.id.toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      })
      setButton(["Z-A", <i className="fas fa-sort-down"></i>])
    } else {
      holdingSort = theGoods.sort(function (a, b) {
        var textA = a.id.toUpperCase();
        var textB = b.id.toUpperCase();
        return (textA < textB) ? 1 : (textA > textB) ? -1 : 0;
      })
      setButton(["A-Z", <i className="fas fa-sort-up"></i>])
    }
    return setGoods(holdingSort)
  }


  // SORTS THE STATE IN ALPHA ORDER, FORWARD AND BACK
  const handleRateSort = (e) => {
    let ordering;
    if (e.target.parentNode.value === "ASC") {
      setOrder(["DESC", <i className="fas fa-sort-down"></i>])
      ordering = theGoods.sort((a, b) => a.daily - b.daily)
      return setGoods(ordering)
    } else {
      setOrder(["ASC", <i className="fas fa-sort-up"></i>])
      ordering = theGoods.sort((a, b) => b.daily - a.daily)
      return setGoods(ordering)
    }
  }



  // IF STATE IS NOT LOADED, PAGE WILL RETURN NULL UNTIL STATE IS LOADED
  if (!loaded) {
    return null;
  }

  return (
    <div className="Home">
      <h1>Simple Currency Exchange App</h1>
      <h3>By Yours Truly: Kerri Gant</h3>
      <table>
        <thead>
          <tr>
            <th scope="col">Currency<button value={button[0]} onClick={handleAlphabet}>{button[1]}</button></th>
            <th scope="col">Symbol</th>
            <th scope="col" className="price">Type</th>
            <th scope="col" className="price">Rate USD</th>
            <th scope="col">24 Hour Difference<button value={order[0]} onClick={handleRateSort}>{order[1]}</button></th>
          </tr>
        </thead>
        <tbody >
          {theGoods.map(row => {
            return (
              <tr className="rows" key={row.id}>
                <td>{row.id}</td>
                <td>{row.symbol}</td>
                <td>{row.type}</td>
                <td>{row.price}</td>
                {row.daily < 0 ? (<td className='down'>{row.daily}</td>) : (< td className='up'>{row.daily}</td>)}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div >
  );
}

export default App;
