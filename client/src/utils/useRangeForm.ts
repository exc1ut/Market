import Decimal from 'decimal.js';
import React, { useState } from 'react';

export const useRangeForm = (data: Record<string, number>, total: number) => {
  const [form, setForm] = useState(data);

  const currentTotal = React.useMemo(() => {
    let ctl = 0;

    for (const key in form) {
      ctl += form[key];
    }
    return ctl;
  }, [form]);

  const left = total - currentTotal;

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;

    const decimal = new Decimal(value).toFixed(2);
    console.log(+decimal);

    const newTotal = +decimal + (currentTotal - form[name]);
    const newLeft = total - newTotal;
    const maxNumberForCurrentField = total - (currentTotal - form[name]);

    console.log(currentTotal);
    console.log(maxNumberForCurrentField);

    if (total >= newTotal) {
      setForm((v) => ({ ...v, [name]: +value }));
    } else if (newLeft < 0) {
      setForm((v) => ({ ...v, [name]: maxNumberForCurrentField }));
    }
  };

  return { form, onChange };
};
