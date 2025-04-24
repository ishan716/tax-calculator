import React, { useContext, useEffect, useState } from "react";
import { IncomeContext } from './InputComponent';
import "./TaxDisplayComponent.css";

function TaxDisplayComponent() {
  const { income, mode } = useContext(IncomeContext);

  const [brackets, setBrackets] = useState([]);
  const [taxes, setTaxes] = useState([]);

  useEffect(() => {
    let newBrackets = [];
    let calculatedTaxes = [];

    if (mode === "monthly") {
      newBrackets = [
        { limit: 150000, rate: 0.00 },
        { limit: 233333.34, rate: 0.06 },
        { limit: 275000, rate: 0.18 },
        { limit: 316666.67, rate: 0.24 },
        { limit: 358333.34, rate: 0.30 },
        { limit: Infinity, rate: 0.36 }
      ];
    } else {
      newBrackets = [
        { limit: 1800000, rate: 0.00 },
        { limit: 2800000, rate: 0.06 },
        { limit: 3300000, rate: 0.12 },
        { limit: 3800000, rate: 0.18 },
        { limit: 4300000, rate: 0.24 },
        { limit: Infinity, rate: 0.30 }
      ];
    }

    let taxes = [];
    let previousLimit = 0;

    for (let i = 0; i < newBrackets.length; i++) {
      const bracket = newBrackets[i];
      const taxableIncome = Math.max(0, Math.min(income, bracket.limit) - previousLimit);
      taxes.push(taxableIncome * bracket.rate);
      previousLimit = bracket.limit;
    }

    setBrackets(newBrackets);
    setTaxes(taxes);
  }, [income, mode]);

  const formatCurrency = (val) =>
    new Intl.NumberFormat("en-LK", {
      style: "currency",
      currency: "LKR"
    }).format(val);

  const formatRange = (i) => {
    const lower = i === 0 ? 0 : brackets[i - 1].limit + 0.01;
    const upper = brackets[i].limit !== Infinity ? brackets[i].limit : "and above";
    return brackets[i].limit !== Infinity
      ? `Rs. ${formatCurrency(lower).replace("LKR", "")} - Rs. ${formatCurrency(upper).replace("LKR", "")}`
      : `Rs. ${formatCurrency(lower).replace("LKR", "")} and above`;
  };

  const totalTax = taxes.reduce((sum, t) => sum + t, 0);

  return (
    <div className="text-bracket-breakdown">
      <h2>Tax Bracket Breakdown ({mode === "monthly" ? "Monthly" : "Annual"})</h2>
      <table className="taxt-table" border={1}>
        <thead>
          <tr>
            <th>Tax Rate</th>
            <th>Income Range</th>
            <th>Tax Amount</th>
          </tr>
        </thead>
        <tbody>
          {brackets.map((bracket, i) => (
            <tr key={i}>
              <td>{(bracket.rate * 100).toFixed(0)}%</td>
              <td>{formatRange(i)}</td>
              <td>{formatCurrency(taxes[i])}</td>
            </tr>
          ))}
          <tr className="total-row">
            <td colSpan="2"><strong>Total Tax Payable</strong></td>
            <td><strong>{formatCurrency(totalTax)}</strong></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default TaxDisplayComponent;
