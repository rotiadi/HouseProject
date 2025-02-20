import React, { useState } from "react";
import Utility from "../utilities/Utility";

const InvoiceSection = ({ useTranslation }) => {
  const [amountToPay, setAmountToPay] = useState(500);
  const [totalInvoices, setTGotalInvoices] = useState(5000);
  const [graphDate, setGraphDate] = useState([
    { name: "Jan", value: 100 },
    { name: "Feb", value: 125 },
    { name: "Mar", value: 195 },
    { name: "Apr", value: 745 },
    { name: "May", value: 815 },
    { name: "Jun", value: 123 },
    { name: "Jul", value: 234 },
    { name: "Aug", value: 567 },
    { name: "Sep", value: 789 },
    { name: "Oct", value: 345 },
    { name: "Nov", value: 123 },
    { name: "Dec", value: 678 },
  ]);

  return (
    <div className="ValuesSection">
      <div>
        <div>
          {useTranslation("amountToPay")}: {amountToPay}
        </div>
        <div>
          {useTranslation("invoiceYear")}: {totalInvoices}
        </div>
      </div>
      <Utility
        useTranslation={useTranslation}
        graphType="Line"
        graphDate={graphDate}
      />
    </div>
  );
};

export default InvoiceSection;
