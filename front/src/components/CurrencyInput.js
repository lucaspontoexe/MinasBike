import React, { useState, useEffect } from 'react';

function CurrencyInput(props) {
  const { value = 0, onChange, ...rest } = props;
  const [val, setVal] = useState(value);

  useEffect(() => {
    setVal(props.value);
  }, [props.value]);

  function handleChange(e) {
    const result = Math.round(e.target.value * 100);
    setVal(result);
    onChange(result);
  }

  return (
    <input
      {...rest}
      type="number"
      step="0.01"
      value={Number(val / 100).toFixed(2)}
      onChange={handleChange}
    />
  );
}

export default CurrencyInput;
