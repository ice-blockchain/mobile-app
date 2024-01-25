// SPDX-License-Identifier: ice License 1.0

const fs = require('fs');
const path = require('path');

function deletePropertyPath(obj, propPath) {
  if (!propPath) {
    return;
  }

  const props = propPath.split('.');
  for (let i = 0; i < props.length - 1; i++) {
    obj = obj[props[i]];
    if (typeof obj === 'undefined') {
      return;
    }
  }
  delete obj[props.pop()];
}

function deleteFromJsonFiles(propPath, jsonFilesDirectory) {
  if (
    !fs.existsSync(jsonFilesDirectory) ||
    !fs.statSync(jsonFilesDirectory).isDirectory()
  ) {
    console.error(`Error: Directory does not exist at ${jsonFilesDirectory}`);
    return;
  }

  fs.readdirSync(jsonFilesDirectory).forEach(file => {
    if (file.endsWith('.json')) {
      const jsonFilePath = path.join(jsonFilesDirectory, file);
      let jsonData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf8') || '{}');
      deletePropertyPath(jsonData, propPath);

      fs.writeFileSync(jsonFilePath, JSON.stringify(jsonData, null, 2) + '\n');
      console.log(`Updated ${file}`);
    }
  });

  console.log('JSON files updated successfully.');
}

// Example usage: node deleteLocalizations.js 'bsc_address.walletAction' <path_to_json_files_directory>
const args = process.argv.slice(2);

if (args.length !== 2) {
  console.log(
    'Usage: node deleteLocalizations.js <path_to_delete> <path_to_json_files_directory>',
  );
} else {
  const propPath = args[0];
  const jsonFilesDirectory = args[1];
  deleteFromJsonFiles(propPath, jsonFilesDirectory);
}
