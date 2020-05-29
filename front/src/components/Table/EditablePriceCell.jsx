import React from 'react';
import CurrencyInput from 'components/CurrencyInput';

const EditablePriceCell = ({
  cell: { value: initialValue },
  row: { index },
  column: { id },
  updateData, // This is a custom function that we supplied to our table instance
}) => {
  // We need to keep and update the state of the cell normally
  const [value, setValue] = React.useState(initialValue);

  // We'll only update the external data when the input is blurred
  const onBlur = () => {
    updateData(index, id, value);
  };

  // If the initialValue is changed external, sync it up with our state
  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return <CurrencyInput value={value} onChange={setValue} onBlur={onBlur} className="editable-price-cell" />;
};
export default EditablePriceCell;
