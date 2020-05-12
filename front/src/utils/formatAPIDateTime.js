export default (input = '') => {
    // append z to convert to local time
    const date = new Date(`${input}Z`)
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
}
