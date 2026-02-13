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

        // We expect id to be an object { name: "Title", ... } from previous failed migration
        // We want id to be "Title" string.

        if (typeof content.id === 'object' && content.id !== null && content.id.name) {
            const title = content.id.name;
            content.id = title;
            fs.writeFileSync(filePath, JSON.stringify(content, null, 2));
            console.log(`Fixed ${file}: id="${title}"`);
        } else if (typeof content.id === 'string') {
            console.log(`Skipping ${file}: Already string.`);
        } else {
            console.log(`Warning ${file}: Unexpected id format`, content.id);
        }

    } catch (err) {
        console.error(`Error processing ${file}:`, err);
    }
});

console.log('Fix complete.');
