// SPDX-License-Identifier: ice License 1.0

import fs from 'fs';
import {buildFlatTranslationsType} from './utils/buildFlatTranslationsType.mjs';
import {PARAMS_TYPE, COUNT_TYPE} from './utils/buildParamsType.mjs';

const translationsPath = process.argv[2];

if (!translationsPath) {
  throw new Error('Path to translations.json is not specified');
}

const translations = JSON.parse(fs.readFileSync(translationsPath));

const flatTranslationsType = buildFlatTranslationsType(translations);

fs.writeFileSync(
  `${translationsPath}.d.ts`,
  `export type Translations = ${JSON.stringify(flatTranslationsType)
    .replaceAll(`"${PARAMS_TYPE}"`, PARAMS_TYPE)
    .replaceAll(`"${COUNT_TYPE}"`, COUNT_TYPE)}`,
);
