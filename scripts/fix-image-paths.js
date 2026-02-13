const fs = require('fs');
const path = require('path');

const directory = 'src/content/photos';

if (!fs.existsSync(directory)) {
    console.error(`Directory not found: ${directory}`);
    process.exit(1);
}

console.log(`Scanning ${directory}...`);

const files = fs.readdirSync(directory).filter(f => path.extname(f) === '.json');
const prefix = '/images/photography/';

files.forEach(file => {
    const filePath = path.join(directory, file);
    try {
        const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));

        if (content.image && content.image.startsWith(prefix)) {
            const relativePath = content.image.replace(prefix, '');
            console.log(`Fixing ${file}: Image "${content.image}" -> "${relativePath}"`);
            content.image = relativePath;
            fs.writeFileSync(filePath, JSON.stringify(content, null, 2));
        } else if (content.image && content.image.startsWith('/')) {
            // Handle other absolute paths if any
            // But be careful not to break non-photography images if logic differs
        }

    } catch (err) {
        console.error(`Error processing ${file}:`, err);
    }
});

console.log('Fix complete.');
