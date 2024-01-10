// SPDX-License-Identifier: ice License 1.0

const fs = require('fs');
const path = require('path');

function deepMerge(target, source) {
  for (const key in source) {
    if (source.hasOwnProperty(key)) {
      if (
        target[key] &&
        typeof target[key] === 'object' &&
        typeof source[key] === 'object'
      ) {
        deepMerge(target[key], source[key]);
      } else {
        target[key] = source[key];
      }
    }
  }
}

function ensureValidJsonFile(filePath) {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, '{}');
  }
}

function checkAndAddNewline(filePath) {
  const fileContents = fs.readFileSync(filePath, 'utf8');
  if (!fileContents.endsWith('\n')) {
    fs.appendFileSync(filePath, '\n');
  }
}

function updateJsonFiles(newJsonPath, jsonFilesDirectory) {
  if (!fs.existsSync(newJsonPath)) {
    console.error(`Error: new.json does not exist at ${newJsonPath}`);
    return;
  }

  if (!fs.statSync(jsonFilesDirectory).isDirectory()) {
    console.error(`Error: Directory does not exist at ${jsonFilesDirectory}`);
    return;
  }

  const newJson = JSON.parse(fs.readFileSync(newJsonPath, 'utf8'));

  fs.readdirSync(jsonFilesDirectory).forEach(file => {
    if (file.endsWith('.json')) {
      const jsonFilePath = path.join(jsonFilesDirectory, file);
      const languageCode = path.basename(file, '.json');
      ensureValidJsonFile(jsonFilePath);
      const value =
        newJson[languageCode] || newJson[`${newJson[languageCode]}.json`];
      if (value) {
        let existingJson = JSON.parse(
          fs.readFileSync(jsonFilePath, 'utf8') || '{}',
        );
        deepMerge(existingJson, value);

        fs.writeFileSync(
          jsonFilePath,
          JSON.stringify(existingJson, null, 2) + '\n',
        );
        checkAndAddNewline(jsonFilePath);
      }
    }
  });

  console.log('JSON files updated successfully.');
}

// Example usage: node syncLocalizations.js <path_to_new.json> <path_to_json_files_directory>
const args = process.argv.slice(2);

if (args.length !== 2) {
  console.log(
    'Usage: node syncLocalizations.js <path_to_new.json> <path_to_json_files_directory>',
  );
} else {
  const newJsonPath = args[0];
  const jsonFilesDirectory = args[1];
  updateJsonFiles(newJsonPath, jsonFilesDirectory);
}
