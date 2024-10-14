import React, { useState, useEffect } from "react";
import CurrencyInput from "react-currency-input-field";
import './App.css';
import logo from './logo.svg';

const App = () => {
  const [rates, setRates] = useState({});
  const [amount, setAmount] = useState(0);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("UAH");
  const [output, setOutput] = useState(0);

  useEffect(() => {
    const fetchRates = async () => {
      const response = await fetch("https://v6.exchangerate-api.com/v6/0c0ca4461926c150043cb44e/latest/USD");
      const data = await response.json();
      if (data.result === "success") setRates(data.conversion_rates);
    };
    fetchRates();
  }, []);

  const calculateOutput = async () => {
    const response = await fetch(`https://v6.exchangerate-api.com/v6/0c0ca4461926c150043cb44e/latest/${fromCurrency}`);
    const { conversion_rates } = await response.json();
    setOutput(amount * conversion_rates[toCurrency]);
  };

  return (
    <div className="container">
      <div className="flex">
        <div className="input-from">
          <label>From:</label>
          <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
            {Object.keys(rates).length ? (
              Object.keys(rates).map((currency) => (
                <option key={currency} value={currency}>{currency}</option>
              ))
            ) : <option value="USD">USD</option>}
          </select>
        </div>

        <div className="input-amount">
          <label>Amount:</label>
          <CurrencyInput
            value={amount}
            onValueChange={setAmount}
            intlConfig={{ locale: "en-US", currency: fromCurrency }}
            allowDecimals
            allowNegativeValue={false}
          />
        </div>
      </div>

      <div className="flex">
        <div className="input-to">
          <label>To:</label>
          <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
            {Object.keys(rates).length ? (
              Object.keys(rates).map((currency) => (
                <option key={currency} value={currency}>{currency}</option>
              ))
            ) : <option value="EUR">EUR</option>}
          </select>
        </div>

        <div className="output">
          <label>Output: <span id="outputAmount">{output}</span></label>
        </div>
      </div>

      <button className="btn" onClick={calculateOutput}>
        Calculate
      </button>
    </div>
  );
};

export default App;
