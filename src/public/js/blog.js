function generateSlug(title) {
    let slug = title.toLowerCase();
    slug = slug.replace(/[^a-z0-9-]/g, '-');
    slug = slug.replace(/^-+|-+$/g, '');
    slug = slug.replace(/-+/g, '-');
    return slug;
}
export default generateSlug;