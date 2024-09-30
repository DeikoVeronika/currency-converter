import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from "react";

function App() {
  const [rates, setRates] = useState();
  const [ratesFetched, setRatesFetched] = useState(false);

  const getRates = async () => {
    // fetch the data from API
    const response = await fetch(
      "https://v6.exchangerate-api.com/v6/0c0ca4461926c150043cb44e/latest/USDD"
    ).then((response) => response.json());

    // save the rates in the state
    if (response.result === "success") {
      setRates(response.conversion_rates);
      setRatesFetched(true);
    }
  };

  useEffect(() => {
    getRates();
  }, []);

  return (
    <div className="container">
      <div class="input-amount">
        <label>Amount:</label>
        <input type="number" id="amount" />
      </div>
      <div class="input-from">
        <label>From:</label>
        <select id="from">
          {ratesFetched ? (
            Object.keys(rates).map((currency, index) => (
              <option key={index} value={currency}>
                {currency}
              </option>
            ))
          ) : (
            <option defaultValue>USD</option>
          )}
        </select>
      </div>
      <div class="input-to">
        <label>To:</label>
        <select id="to">
          {ratesFetched ? (
            Object.keys(rates).map((currency, index) => (
              <option key={index} value={currency}>
                {currency}
              </option>
            ))
          ) : (
            <option defaultValue>EUR</option>
          )}
        </select>
      </div>
      <button className="btn">Calculate</button>
      <div className="output">
        <label>Output:</label>
      </div>
    </div>
  );
}
export default App;