const fs = require('fs');
const path = require('path');

const directory = 'src/content/photos';

if (!fs.existsSync(directory)) {
    console.error(`Directory not found: ${directory}`);
    process.exit(1);
}

console.log(`Scanning ${directory}...`);

const files = fs.readdirSync(directory).filter(f => path.extname(f) === '.json');

files.forEach(file => {
    const filePath = path.join(directory, file);
    try {
        const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        const slug = path.basename(file, '.json');

        // Current state: id might be a string (timestamp), title is "Display Title"
        // Target state: id is object { name: "Display Title", slug: "timestamp" }
        // title field should be removed.

        let title = content.title;
        let idSlug = content.id;

        // If id is already an object, skip or fix
        if (typeof content.id === 'object' && content.id !== null) {
            console.log(`Skipping ${file}: id is already an object.`);
            return;
        }

        // If title is missing, use slug as fallback name
        if (!title) {
            title = slug;
        }

        // If id is missing or not matching slug, use slug
        if (!idSlug) {
            idSlug = slug;
        }

        // Create new structure
        content.id = {
            name: title,
            slug: idSlug
        };

        // Remove old title field
        delete content.title;

        fs.writeFileSync(filePath, JSON.stringify(content, null, 2));
        console.log(`Migrated ${file}: id="{ name: '${title}', slug: ... }"`);

    } catch (err) {
        console.error(`Error processing ${file}:`, err);
    }
});

console.log('Migration complete.');
