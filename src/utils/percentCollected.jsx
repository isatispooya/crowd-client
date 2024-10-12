/* eslint-disable no-unsafe-optional-chaining */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useGetPlan from "src/module/plan/service/use-plan";

const PercentageCollected = () => {
  const { traceCode } = useParams();
  const { data, isPending, error } = useGetPlan(traceCode);
  const [percentageCollected, setPercentageCollected] = useState(null);
  useEffect(() => {
    if (data) {
      const collected = Math.round((data?.information_complete?.amount_collected_now / data?.plan?.total_price) * 100);
      setPercentageCollected(collected);
    }
  }, [data]);

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>درصد مبلغ تامین شده</h1>
      <p>{percentageCollected}%</p>
    </div>
  );
};

export default PercentageCollected;
