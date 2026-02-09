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

        if (content.slug && !content.title) {
            console.log(`Migrating ${file}: slug -> title`);
            content.title = content.slug;
            delete content.slug;
            fs.writeFileSync(filePath, JSON.stringify(content, null, 2));
        }

    } catch (err) {
        console.error(`Error processing ${file}:`, err);
    }
});

console.log('Migration complete.');
