function generateSlug(title) {
    let slug = title.toLowerCase();
    let newSlug = '';
    for (let i = 0; i < slug.length; i++) {
        const char = slug[i];
        if (/[^a-z0-9]/.test(char)) {
            newSlug += '-';
        } else {
            newSlug += char;
        }
    }
    newSlug = newSlug.replace(/^-+|-+$/g, '');
    newSlug = newSlug.replace(/-+/g, '-');
    return newSlug;
}
export default generateSlug;