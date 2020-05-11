export default (input = '') => {
    const date = new Date(input)
    return `${date.toLocaleDateString()} ${input.split(' ')[1]}`;
}
