import { useState } from 'react';

export const useClientCreatedFilter = () => {

  const initialMinDate = new Date();
  initialMinDate.setMonth(initialMinDate.getMonth() - 1);
  const [createdDateMin, setCreatedDateMin] = useState<Date | null>(initialMinDate);
  const [createdDateMax, setCreatedDateMax] = useState<Date | null>(new Date());

  const onCreatedDateMinChange = (value: Date | null) => {
    setCreatedDateMin(value);
  };

  const onCreatedDateMaxChange = (value: Date | null) => {
    setCreatedDateMax(value);
  };

  return {
    createdDateMin,
    createdDateMax,
    onCreatedDateMinChange,
    onCreatedDateMaxChange,
  };
};
