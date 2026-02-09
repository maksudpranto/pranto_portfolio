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

const existingSlugs = new Set();

files.forEach(file => {
    const filePath = path.join(directory, file);
    try {
        const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));

        // Extract Title
        // Priority: content.id (if string), content.title, content.id.name
        let title = '';
        if (typeof content.id === 'string') {
            title = content.id;
        } else if (content.title) {
            title = content.title;
        } else if (content.id && content.id.name) {
            title = content.id.name;
        } else {
            title = path.basename(file, '.json'); // Fallback to filename
        }

        if (!title) title = 'Untitled';

        // Generate Base Slug
        const baseSlug = slugify(title);
        let newSlug = baseSlug;
        let counter = 1;

        // Handle Duplicates
        while (existingSlugs.has(newSlug)) {
            newSlug = `${baseSlug}-${counter}`;
            counter++;
        }
        existingSlugs.add(newSlug);

        // Construct New Data
        // Schema: slugField: 'slug' (fields.slug)
        // json data: { slug: { name: "Title", slug: "slug" }, ... }

        const newContent = { ...content };

        // Remove old id and title fields
        delete newContent.id;
        delete newContent.title;

        // Add proper fields.slug structure
        // Note: Keystatic usually expects the slug field key to match config
        // If config is `slugField: 'slug'`, data is `slug: { name: "...", slug: "..." }`
        newContent.slug = {
            name: title,
            slug: newSlug
        };

        const newFilePath = path.join(directory, `${newSlug}.json`);

        // Write new file
        fs.writeFileSync(newFilePath, JSON.stringify(newContent, null, 2));

        // Delete old file if different
        if (filePath !== newFilePath) {
            fs.unlinkSync(filePath);
            console.log(`Renamed ${file} -> ${newSlug}.json`);
        } else {
            fs.writeFileSync(filePath, JSON.stringify(newContent, null, 2)); // Update content even if name same
            console.log(`Updated ${file}`);
        }

    } catch (err) {
        console.error(`Error processing ${file}:`, err);
    }
});

console.log('Migration complete.');
