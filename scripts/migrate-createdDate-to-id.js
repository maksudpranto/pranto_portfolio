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

        // We want 'id' field to match the slug
        // If 'createdDate' exists, it might be the source, but the slug is the truth.

        content.id = slug; // Set ID to filename (timestamp)

        // Remove createdDate if it exists to clean up
        if (content.createdDate) {
            delete content.createdDate;
        }

        // We kept 'title' from previous migration, so it persists.

        fs.writeFileSync(filePath, JSON.stringify(content, null, 2));
        console.log(`Updated ${file}: Set id="${slug}"`);

    } catch (err) {
        console.error(`Error processing ${file}:`, err);
    }
});

console.log('Migration complete.');
