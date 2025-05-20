import React from 'react';

const PrintStyles = () => {
  const printStyles = `
   @media print {
  .page-break-before {
    page-break-before: always;
  }
  
  @page {
    size: A4;
    margin: 0.5cm;
  }
  
  body {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
}

  `;

  return <style>{printStyles}</style>;
};

export default PrintStyles;
