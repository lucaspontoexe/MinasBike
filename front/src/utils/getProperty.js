export default function getProperty(objects, id, property) {
    const matches = objects.filter(obj => obj.id === id)[0];
    if (matches.length === 0) return undefined;
    return matches[property];
}