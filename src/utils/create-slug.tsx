export function createSlug(username: string): string {
    return username
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
        .replace(/[^a-zA-Z0-9]\s-]/g, '-') // Replace non-alphanumeric characters with hyphens
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .toLowerCase()
        .trim();
}