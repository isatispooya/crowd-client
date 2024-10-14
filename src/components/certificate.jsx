import React from 'react';
import { useParams } from 'react-router-dom';

import Usecertificate from '../hooks/use-certificate';

const Certificate = () => {
  const { traceCode } = useParams();
  const { data } = Usecertificate(traceCode);
  console.log(data, 'cer');

  return <button type="button">asdfghf</button>;
};

export default Certificate;
