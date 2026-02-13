const fs = require('fs');
const path = require('path');

const directory = 'src/content/photos';

if (!fs.existsSync(directory)) {
    console.error(`Directory not found: ${directory}`);
    process.exit(1);
}

console.log(`Scanning ${directory}...`);

const files = fs.readdirSync(directory).filter(f => path.extname(f) === '.json');

function slugify(text) {
    return text.toString().toLowerCase()
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
        .replace(/\-\-+/g, '-')         // Replace multiple - with single -
        .replace(/^-+/, '')             // Trim - from start of text
        .replace(/-+$/, '');            // Trim - from end of text
}

files.forEach(file => {
    const filePath = path.join(directory, file);
    try {
        const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));

        if (content.slug && typeof content.slug === 'object') {
            const originalName = content.slug.name;
            const trimmedName = originalName.trim();
            const filenameSlug = path.basename(file, '.json');

            // Check if name needs trimming
            if (originalName !== trimmedName) {
                console.log(`Fixing ${file}: Trimming name "${originalName}" -> "${trimmedName}"`);
                content.slug.name = trimmedName;

                // If trimming name changes slug, we might have a mismatch, 
                // but let's assume filename is already correct or we should verify it matches
                // For now, just update content.

                fs.writeFileSync(filePath, JSON.stringify(content, null, 2));
            }

            // Verify slug consistency
            // If internal slug != filename, fix internal slug
            if (content.slug.slug !== filenameSlug) {
                console.log(`Fixing ${file}: Slug mismatch "${content.slug.slug}" -> "${filenameSlug}"`);
                content.slug.slug = filenameSlug;
                fs.writeFileSync(filePath, JSON.stringify(content, null, 2));
            }
        }

    } catch (err) {
        console.error(`Error processing ${file}:`, err);
    }
});

console.log('Fix complete.');
