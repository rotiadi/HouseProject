import React, { useState } from "react";

const InvoiceSection = ({ useTranslation }) => {
  const [amountToPay, setAmountToPay] = useState(500);
  const [totalInvoices, setTGotalInvoices] = useState(5000);
  return (
    <div className="IndexSection">
      <div>
        {useTranslation("amountToPay")}: {amountToPay}
      </div>
      <div>
        {useTranslation("invoiceYear")}: {totalInvoices}
      </div>
    </div>
  );
};

export default InvoiceSection;
