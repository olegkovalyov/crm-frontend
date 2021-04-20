import { useState } from 'react';

export const useDateFilter = () => {

  const initialMinDate = new Date();
  initialMinDate.setMonth(initialMinDate.getMonth() - 1);
  const [createdDateMin, setCreatedDateMin] = useState<Date | null>(initialMinDate);
  const [createdDateMax, setCreatedDateMax] = useState<Date | null>(new Date());

  const handleCreatedDateMinChange = (value: Date | null) => {
    setCreatedDateMin(value);
  };

  const handleCreatedDateMaxChange = (value: Date | null) => {
    setCreatedDateMax(value);
  };

  return {
    createdDateMin,
    createdDateMax,
    handleCreatedDateMinChange,
    handleCreatedDateMaxChange,
  };
};
