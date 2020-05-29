export default function formatFieldErrors(data) {
  return data.fields.map(field => {
    return { [field]: data.message };
  });
}


export function formatErrorsSingleObject(data) {
  const tempObj = {};
  data.fields.forEach(field => {
     tempObj[field] = data.message;
  });
  return tempObj;
}
