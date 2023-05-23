const fs = require('fs');
const path = require('path');

function incrementVersion(version, increment) {
  const parts = version.split('.');
  const major = parseInt(parts[0]);
  const minor = parseInt(parts[1]);
  const patch = parseInt(parts[2]);

  if (increment === 'major') {
    return `${major + 1}.0.0`;
  } else if (increment === 'minor') {
    return `${major}.${minor + 1}.0`;
  } else if (increment === 'patch') {
    return `${major}.${minor}.${patch + 1}`;
  } else {
    throw new Error(`Invalid increment: ${increment}`);
  }
}

function updatePackageJsonVersion(filePath, increment) {
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const packageJson = JSON.parse(fileContents);

  if (!packageJson.version) {
    throw new Error(`No 'version' key found in ${filePath}`);
  }

  const newVersion = incrementVersion(packageJson.version, increment);
  packageJson.version = newVersion;

  fs.writeFileSync(filePath, JSON.stringify(packageJson, null, 2));

  console.log(`Updated version in ${filePath} to ${newVersion}`);
}

function processDirectory(dirPath, increment) {
  fs.readdir(dirPath, (err, files) => {
    if (err) {
      console.error(`Error reading directory: ${err}`);
      return;
    }

    files.forEach((file) => {
      const filePath = path.join(dirPath, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        processDirectory(filePath, increment);
      } else if (file === 'package.json') {
        try {
          updatePackageJsonVersion(filePath, increment);
        } catch (error) {
          console.error(`Error updating version in ${filePath}: ${error}`);
        }
      }
    });
  });
}

// Usage: node updateVersion.js <directoryPath> <increment>
const directoryPath = process.argv[2];
const increment = process.argv[3];

if (!directoryPath || !increment) {
  console.error('Usage: node updateVersion.js <directoryPath> <increment>');
  process.exit(1);
}

processDirectory(directoryPath, increment);
