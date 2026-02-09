const fs = require('fs');
const path = require('path');

const imagesDir = 'public/images/photography';
const contentDir = 'src/content/photos';

if (!fs.existsSync(imagesDir)) {
    console.error(`Images directory not found: ${imagesDir}`);
    process.exit(1);
}

if (!fs.existsSync(contentDir)) {
    fs.mkdirSync(contentDir, { recursive: true });
}

console.log(`Scanning ${imagesDir}...`);

const folders = fs.readdirSync(imagesDir).filter(f => fs.lstatSync(path.join(imagesDir, f)).isDirectory());

function slugify(text) {
    return text.toString().toLowerCase()
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
        .replace(/\-\-+/g, '-')         // Replace multiple - with single -
        .replace(/^-+/, '')             // Trim - from start of text
        .replace(/-+$/, '');            // Trim - from end of text
}

function titleCase(str) {
    return str.replace(/-/g, ' ').replace(/\b\w/g, s => s.toUpperCase());
}

folders.forEach(folder => {
    // Derive Title from folder name
    const title = titleCase(folder);
    const slug = slugify(title);

    // Check if image exists
    const imagePathRelative = `${folder}/image.jpg`;
    const imagePathAbsolute = path.join(imagesDir, imagePathRelative);

    if (fs.existsSync(imagePathAbsolute)) {
        const content = {
            title: title,
            slug: slug,
            location: "Unknown Location",
            category: "nature", // Default safe category
            image: imagePathRelative,
            showOnHomepage: false,
            aspect: "aspect-video"
        };

        const filePath = path.join(contentDir, `${slug}.json`);
        // We overwrite existing to ensure format update
        fs.writeFileSync(filePath, JSON.stringify(content, null, 2));
        console.log(`Created/Updated ${slug}.json`);
    } else {
        console.warn(`No image.jpg found in ${folder}, skipping.`);
    }
});

console.log('Reconstruction complete.');
