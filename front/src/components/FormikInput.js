import React from 'react';
import { useField } from 'formik';
import TextBox from 'components/TextBox';

export default function Input(props) {
  const [, meta, helpers] = useField(props.name);
  return <TextBox {...props} error={meta.error} onChange={e => helpers.setValue(e.target.value)} />;
}
