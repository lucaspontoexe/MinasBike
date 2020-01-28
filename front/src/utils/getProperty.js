export function getProperty(objects, id, property) {
    const matches = objects.filter(obj => obj.id === id);
    if (matches.length === 0) return undefined;
    return matches[0][property];
}

export function queryObject(objects, rule, path) {
    const matches = objects.filter(rule);
    if (matches.length === 0) return undefined;
    return getObjectPath(matches[0], path);
}

function getObjectPath(obj, path) {
    path = path
        .replace(/\[/g, '.')
        .replace(/]/g, '')
        .split('.');

    path.forEach(function(level) {
        obj = obj[level];
    });

    return obj;
}
