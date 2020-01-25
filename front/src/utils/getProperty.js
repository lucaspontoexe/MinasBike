export function getProperty(objects, id, property) {
    const matches = objects.filter(obj => obj.id === id);
    if (matches.length === 0) return undefined;
    return matches[0][property];
}

export function getNestedProperty(objects, id, level1, level2) {
    const matches = objects.filter(obj => obj.id === id);
    if (matches.length === 0) return undefined;
    return matches[0][level1][level2];
}