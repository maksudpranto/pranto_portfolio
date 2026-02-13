const fs = require('fs');
const path = require('path');

const directory = 'src/content/photos';

// Check if directory exists
if (!fs.existsSync(directory)) {
    console.error(`Directory not found: ${directory}`);
    process.exit(1);
}

console.log(`Scanning ${directory}...`);

fs.readdirSync(directory).forEach(file => {
    if (path.extname(file) === '.json') {
        const filePath = path.join(directory, file);
        try {
            const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
            const slug = path.basename(file, '.json');

            // If title matches filename (implicit) or is missing, ensure it's explicit
            // We want to force 'title' to be present because we are decoupling it from the slug
            if (!content.title) {
                console.log(`Migrating ${file}: Adding title "${slug}"`);
                content.title = slug;
                fs.writeFileSync(filePath, JSON.stringify(content, null, 2));
            } else {
                console.log(`Skipping ${file}: Title already exists ("${content.title}")`);
            }
        } catch (err) {
            console.error(`Error processing ${file}:`, err);
        }
    }
});

console.log('Migration complete.');
