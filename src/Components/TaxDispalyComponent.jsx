import React, { useContext, useEffect, useState } from "react";
import { IncomeContext } from './InputComponent';
import "./TaxDispalyComponent.css";


function TaxDispalyComponent() {
  const income = useContext(IncomeContext);
  const [tax1, setTax1] = useState(0);
  const [tax2, setTax2] = useState(0);
  const [tax3, setTax3] = useState(0);
  const [tax4, setTax4] = useState(0);
  const [tax5, setTax5] = useState(0);

  useEffect(() => {
    let t1 = 0, t2 = 0, t3 = 0, t4 = 0 ,t5=0;

    if (income > 150000) {
      const bracket1 = Math.min(income, 233333.34) - 150000;
      t1 = bracket1 * 0.06;
    }

    if (income > 233333.34) {
      const bracket2 = Math.min(income, 275000) - 233333.34;
      t2 = bracket2 * 0.18;
    }

    if (income > 275000) {
      const bracket3 = Math.min(income, 316666.67) - 275000;
      t3 = bracket3 * 0.24;
    }

    if (income > 316666.67) {
      const bracket4 = Math.min(income, 358333.34) - 316666.67;
      t4 = bracket4 * 0.30;
    }

    if(income>358333.34){
        const bracket5 = income- 358333.34 ;
        t5 = bracket5 * 0.36;
    }

    setTax1(t1);
    setTax2(t2);
    setTax3(t3);
    setTax4(t4);
    setTax5(t5);
  }, [income]);

  return (
    <div className="text-bracket-breakdown">
      <h2>Tax Bracket Breakdown</h2>
      <table className="taxt-table" border={1}>
        <thead>
          <tr>
            <th>Tax Rate</th>
            <th>Income Range</th>
            <th>Tax Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>0%</td>
            <td>Rs. 0.00 - Rs. 150,000.00</td>
            <td>Rs. 0.00</td>
          </tr>
          <tr>
            <td>6%</td>
            <td>Rs. 150,000.01 - Rs. 233,333.34</td>
            <td>Rs. {tax1.toFixed(2)}</td>
          </tr>
          <tr>
            <td>18%</td>
            <td>Rs. 233,333.35 - Rs. 275,000.00</td>
            <td>Rs. {tax2.toFixed(2)}</td>
          </tr>
          <tr>
            <td>24%</td>
            <td>Rs. 275,000.01 - Rs. 316,666.67</td>
            <td>Rs. {tax3.toFixed(2)}</td>
          </tr>
          <tr>
            <td>30%</td>
            <td>Rs. 316,666.68 - Rs. 358,333.34</td>
            <td>Rs. {tax4.toFixed(2)}</td>
            </tr>
            <tr>
                <td>36%</td>
                <td>Rs. 358333.34 Above</td>
                <td>Rs. {tax5.toFixed(2)}</td>
         
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default TaxDispalyComponent;
