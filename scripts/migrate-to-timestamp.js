const fs = require('fs');
const path = require('path');

const directory = 'src/content/photos';

if (!fs.existsSync(directory)) {
    console.error(`Directory not found: ${directory}`);
    process.exit(1);
}

// Helper to format date for filename (slug-like)
// Keystatic datetime slug usually looks like: 2024-02-09t16-00-00-000z
// We will mimic an ISO string slug.
function getTimestampSlug(index) {
    const date = new Date();
    date.setMinutes(date.getMinutes() - index); // Stagger times so they are unique
    return date.toISOString()
        .replace(/[:.]/g, '-')
        .toLowerCase();
}

console.log(`Scanning ${directory}...`);

const files = fs.readdirSync(directory).filter(f => path.extname(f) === '.json');
let index = files.length;

files.forEach(file => {
    const filePath = path.join(directory, file);
    try {
        const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));

        // Generate new slug (timestamp)
        // We use the current date minus index to ensure order/uniqueness roughly preserved or just unique
        const date = new Date();
        date.setMinutes(date.getMinutes() - index);
        index--;

        const timestampValue = date.toISOString(); // For the content field
        const newSlug = timestampValue.replace(/[:.]/g, '-').toLowerCase(); // For the filename

        // Check if already migrated (if filename looks like timestamp)
        // Simple check: starts with 202
        if (file.match(/^20\d\d-/)) {
            console.log(`Skipping ${file}: Already looks like a timestamp.`);
            return;
        }

        // Update content
        content.createdDate = timestampValue;

        // Write new file
        const newFilePath = path.join(directory, `${newSlug}.json`);
        fs.writeFileSync(newFilePath, JSON.stringify(content, null, 2));

        // Delete old file
        fs.unlinkSync(filePath);

        console.log(`Migrated ${file} -> ${newSlug}.json`);

    } catch (err) {
        console.error(`Error processing ${file}:`, err);
    }
});

console.log('Migration complete.');
