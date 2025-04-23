import React, { useEffect, useState, createContext } from "react";
import './InputComponent.css';
import TaxDispalyComponent from "./TaxDispalyComponent";

// Context should be capitalized when used in JSX
export const IncomeContext = createContext();

function InputComponent() {
  const [mode, setMode] = useState("monthly");
  const [income, setIncome] = useState(120000.00);

  useEffect(() => {
    if (mode === "monthly") {
      setIncome(120000);
    } else {
      setIncome(18000000);
    }
  }, [mode]);

  function handleChange(event) {
    setMode(event.target.value);
  }

  function handleIncome(event) {
    setIncome(event.target.value);
  }

  return (
    <>
    <div className="input-container">
      <h2>Calculate Your Tax</h2>
      <div className="input-details">
        <p>
          This calculator is designed to help you estimate your personal income
          tax based on the official tax rates published by the Inland Revenue
          Department (IRD) of Sri Lanka.
          <br />
          The calculations are based on the official APIT tax tables published
          by IRD, which you can access here.
          <br />
          <strong>Disclaimer:</strong> This calculator is for informational
          purposes only. Please consult with a tax professional or the IRD for
          specific advice regarding your tax obligations.
        </p>
      </div>

      <h3>Income details</h3>
      <div className="mode">
        <label>
          <input
            type="radio"
            name="mode"
            value="monthly"
            checked={mode === "monthly"}
            onChange={handleChange}
          />
          Monthly
        </label>
        <label>
          <input
            type="radio"
            name="mode"
            value="annual"
            checked={mode === "annual"}
            onChange={handleChange}
          />
          Annual
        </label>
      </div>

      <div className="text-box">
        <input
          type="number"
          value={income}
          onChange={handleIncome}
          step="any"
        />
      </div>
    </div>
          {/* Correct Provider usage */}
          <IncomeContext.Provider value={income}>
        <TaxDispalyComponent />
      </IncomeContext.Provider>
    </>
  );
}

export default InputComponent;
