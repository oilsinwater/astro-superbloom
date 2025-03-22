import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

// Configuration
const config = {
  sourceDir: '/Users/phil/Sites/Superbloom/website-superbloom/static/assets',
  targetDir: '/Users/phil/Sites/Superbloom/new-superbloom/media',
  breakpoints: {
    small: 480,
    medium: 768,
    large: 1080,
    xlarge: 1920
  },
  formats: ['webp', 'original'],
  quality: {
    webp: 80,
    jpeg: 85,
    png: 90
  },
  folders: ['blog', 'people', 'projects', 'resources', 'events', 'site', 'legacy']
};

// Create target directories if they don't exist
async function createDirectories() {
  if (!fs.existsSync(config.targetDir)) {
    fs.mkdirSync(config.targetDir);
  }

  for (const folder of config.folders) {
    const folderPath = path.join(config.targetDir, folder);
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
    }
  }
}

// Process a single image
async function processImage(sourcePath, targetDir, filename) {
  const ext = path.extname(filename).toLowerCase();
  const name = path.basename(filename, ext);
  const image = sharp(sourcePath);
  const metadata = await image.metadata();
  
  // Original format detection
  const originalFormat = metadata.format;
  
  // For each breakpoint, create a resized version
  for (const [size, width] of Object.entries(config.breakpoints)) {
    // Skip if original is smaller than this breakpoint
    if (metadata.width <= width) continue;
    
    // Resize to this breakpoint width
    const resized = image.clone().resize({ width, withoutEnlargement: true });
    
    // Output in original format
    await resized.toFile(path.join(
      targetDir,
      `${name}-${size}${ext}`
    ));
    
    // Output in WebP format
    await resized.webp({ quality: config.quality.webp }).toFile(path.join(
      targetDir,
      `${name}-${size}.webp`
    ));
  }
  
  // Save an optimized original (no resizing)
  if (originalFormat === 'jpeg' || originalFormat === 'jpg') {
    await image.jpeg({ quality: config.quality.jpeg }).toFile(path.join(
      targetDir,
      filename
    ));
  } else if (originalFormat === 'png') {
    await image.png({ quality: config.quality.png }).toFile(path.join(
      targetDir,
      filename
    ));
  } else {
    // For other formats, just copy the file
    fs.copyFileSync(sourcePath, path.join(targetDir, filename));
  }
  
  // Always create a WebP version of the original
  await image.webp({ quality: config.quality.webp }).toFile(path.join(
    targetDir,
    `${name}.webp`
  ));
  
  console.log(`Processed: ${filename}`);
}

// Walk through the source directory and process all images
async function processDirectory(directory, targetSubDir = 'legacy') {
  const targetDir = path.join(config.targetDir, targetSubDir);
  
  const files = fs.readdirSync(directory);
  
  for (const file of files) {
    const sourcePath = path.join(directory, file);
    const stats = fs.statSync(sourcePath);
    
    if (stats.isDirectory()) {
      // Process subdirectory
      await processDirectory(sourcePath, targetSubDir);
    } else {
      // Check if it's an image
      const ext = path.extname(file).toLowerCase();
      if (['.jpg', '.jpeg', '.png', '.gif'].includes(ext)) {
        await processImage(sourcePath, targetDir, file);
      }
    }
  }
}

// Main function
async function main() {
  try {
    console.log('Creating directories...');
    await createDirectories();
    
    console.log('Processing images...');
    await processDirectory(config.sourceDir);
    
    console.log('Image processing completed successfully!');
  } catch (error) {
    console.error('Error processing images:', error);
  }
}

main();
