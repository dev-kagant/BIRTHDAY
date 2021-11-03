import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [state, setState] = useState([])
  const [loaded, setLoaded] = useState(false)
  const [button, setButton] = useState('A-Z')

  // BROUGHT THIS IN TO HELP LOAD THE STATE
  useEffect(() => {
    settingState()
    if (!state) {
      setLoaded(false)
    }
    setLoaded(true)
  }, []);


  // CALL TO GET ALL THE EXCHANGE RATES FOR CRYPTO
  const settingState = () => {
    fetch('./data.json').then(response => {     // Would be a call to the API GET/RATES "https://api.coincap.io/v2/rates"
      return response.json();
    }).then(data => {
      let cryptoData = []
      for (let i = 0; i < data.data.length; i++) {
        if (data.data[i].type === 'crypto') {
          cryptoData.push(data.data[i])
        }
        continue;
      }
      setState(cryptoData);
      console.log("XXXXXXXXXXXXXXXX", state);
      return
    }).catch(err => {
      console.log("Error Reading data " + err);
    });
  }

  // WAST SETTING THIS UP TO GRAB THE INC. DES. IN 24 HOURS
  // WOULD ALSO NEED TO TAKE VALUES FROM STATE OBJ TO GRAB INFORMATION BY ID ON STATE AND IN ORDER
  const settingExhangeInfo = (id) => {
    fetch(`https://api.coincap.io/v2/exchanges/${id}`).then(response => {
      return response.json();
    }).then(data => {
      console.log("EXCHANGE", data)
      return
    }).catch(err => {
      console.log("Error Reading data " + err);
    });
  }


  // SORTS THE STATE IN ALPHA ORDER, FORWARD AND BACK
  const handleAlphabet = (e) => {
    console.log(e.target.value)
    let holdingSort
    if (e.target.value === "A-Z") {
      holdingSort = state.sort(function (a, b) {
        var textA = a.id.toUpperCase();
        var textB = b.id.toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      })
      setButton('Z-A')
    } else {
      holdingSort = state.sort(function (a, b) {
        var textA = a.id.toUpperCase();
        var textB = b.id.toUpperCase();
        return (textA < textB) ? 1 : (textA > textB) ? -1 : 0;
      })
      setButton('A-Z')
    }
    console.log("SORTED", holdingSort)
    return setState(holdingSort)
  }

  // IF STATE IS NOT LOADED, PAGE WILL RETURN NULL UNTIL STATE IS LOADED
  if (!loaded) {
    return null;
  }

  return (
    <div className="App">
      <h1>Simple Currency Exchange App</h1>
      <h3>By Yours Truly: Kerri Gant</h3>
      <button value={button} onClick={handleAlphabet}>Sort Alphabetically</button>
      <table>
        <thead>
          <tr>
            <th scope="col">Currency</th>
            <th scope="col">Symbol</th>
            <th scope="col">Type</th>
            <th scope="col">Rate USD</th>
            {/* <th scope="col">24 Hour Dif</th> */}
          </tr>
        </thead>
        {state.map(row =>
          <tbody key={row.id}>
            <td>{row.id}</td>
            <td>{row.symbol}</td>
            <td>{row.type}</td>
            <td>{row.rateUsd}</td>
            {/* // This will be las field
            <td>{settingExhangeInfo(row.id)}</td>  */}
          </tbody>
        )}

        <tr>
          <th scope="row"></th>
          <td>
          </td>
        </tr>
      </table>
    </div>
  );
}

export default App;
