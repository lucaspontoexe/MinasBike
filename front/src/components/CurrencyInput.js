import React, { useState, useEffect } from 'react';

function CurrencyInput(props) {
  const { value = 0, onChange, ...rest } = props;
  const [val, setVal] = useState(value);
  const [isBlurred, setIsBlurred] = useState(true);

  useEffect(() => {
    setVal(props.value);
  }, [props.value]);

  function handleChange(e) {
    const result = Math.round(e.target.value * 100);
    setVal(result);
    onChange(result);
  }

  function fixIfNeeded(n) {
    const a = Math.round(n * 100);
    if (a % 10 === 0 && !Number.isInteger(n)) return n.toFixed(2);
    return n;
  }

  return (
    <input
      {...rest}
      type="number"
      step="0.01"
      value={isBlurred ? fixIfNeeded(Number(val / 100)) : Number(val / 100)}
      onChange={handleChange}
      onFocus={() => setIsBlurred(false)}
      onBlur={() => setIsBlurred(true)}
    />
  );
}

export default CurrencyInput;
