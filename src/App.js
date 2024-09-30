import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from "react";
import CurrencyInput from "react-currency-input-field";


function App() {
  const [rates, setRates] = useState();
  const [ratesFetched, setRatesFetched] = useState(false);
  const [amount, setAmount] = useState(0);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("USD");
  const [output, setOutput] = useState();

  const getRates = async () => {
    // fetch the data from API
    const response = await fetch(
      "https://v6.exchangerate-api.com/v6/0c0ca4461926c150043cb44e/latest/USD"
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

  const calculateOutput = async () => {
    // fetch the selected from currency rates
    const response = await fetch(
      `https://v6.exchangerate-api.com/v6/0c0ca4461926c150043cb44e/latest/${fromCurrency}`
    ).then((response) => response.json());
    const fetchedRates = response.conversion_rates;
    const CurrencyRate = fetchedRates[toCurrency];
    const output = amount * CurrencyRate;
    setOutput(output);
  };

  return (
    <div className="container">
      
      <div className="flex">
        <div className="input-from">
          <label>From:</label>
          <select
            id="from"
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
          >
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
        <div className="input-amount">
          <label>Amount:</label>
          <CurrencyInput
            value={amount}
            onValueChange={(amount) => setAmount(amount)}
            intlConfig={{ locale: "en-US", currency: fromCurrency }}
            allowDecimals={true}
            allowNegativeValue={false}
          />
        </div>

      </div>

      <div className='flex'>
        <div className="input-to">
          <label>To:</label>
          <select
            id="to"
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
          >
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

        <div className="output ">
          <label>Output: <span  id="outputAmount">{output}</span></label>
        </div>
      </div>
      <button className="btn" onClick={() => calculateOutput()}>
          Calculate
        </button>
      </div>
  );
}

export default App;
