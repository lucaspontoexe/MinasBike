export default function formatFieldErrors(data) {
    return data.fields.map(field => {
        return { [field]: data.message };
    });
}
