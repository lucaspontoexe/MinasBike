export function getProperty(objects, id, property) {
  const matches = objects.filter(obj => obj.id === id);
  if (matches.length === 0) return undefined;
  return matches[0][property];
}

export function queryObject(objects, where, path) {
  let matches;

  typeof where === 'function'
    ? (matches = objects.filter(where))
    : (matches = objects.filter(obj => obj.id === where));

  if (matches.length === 0) return undefined;
  return getObjectPath(matches[0], path);
}

function getObjectPath(obj, path) {
  if (!path) return obj;
  
  path = path
    .replace(/\[/g, '.')
    .replace(/]/g, '')
    .split('.');

  path.forEach(function(level) {
    obj = obj[level];
  });

  return obj;
}
