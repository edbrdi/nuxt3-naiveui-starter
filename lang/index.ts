import * as fs from 'fs';
import * as path from 'path';
import yaml from 'js-yaml';

type Translations = { [key: string]: { [locale: string]: string } };
type Messages = { [locale: string]: { [key: string]: string } };
type AllImports = { [key: string]: unknown };

const allImports: AllImports = {};

fs.readdirSync(path.join(__dirname, 'translations'))
  .filter((file) => file.endsWith('.yml'))
  .forEach((file) => {
    const content = fs.readFileSync(
      path.join(__dirname, 'translations', file),
      'utf8',
    );

    const filename = file.replace('.yml', '');
    allImports[filename] = yaml.load(content);
  });

// prepend the file name to the key (e.g. api.unknown)
function scopedTranslations(translations: Translations, scope: string) {
  return Object.keys(translations).reduce((acc: Translations, key) => {
    if (scope === 'general') acc[key] = translations[key]; // except for general
    else acc[`${scope}.${key}`] = translations[key];
    return acc;
  }, {});
}

let translations: Translations = {};

for (const key in allImports) {
  translations = {
    ...translations,
    ...scopedTranslations(allImports[key] as Translations, key),
  };
}

export function getMessages() {
  const messages: Messages = {};

  for (const key in translations) {
    for (const locale in translations[key]) {
      if (!messages[locale]) messages[locale] = {};
      messages[locale][key] = translations[key][locale];
    }
  }

  return messages;
}
