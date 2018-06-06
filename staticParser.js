const fs = require('fs');
const glob = require('glob');
const mkdirp = require('mkdirp');
const yargs = require('yargs')
  .usage('node $0 [source_path]')
  .option('lang', {
    describe: 'coma separated list of locales',
    alias: 'l',
    type: 'string',
    default: 'sk',
  })
  .option('out_path', {
    describe: 'output path to store language file',
    alias: ['o', 'outPath'],
    type: 'string',
    required: true,
  })
  .option('file_name', {
    describe: 'filename for translation',
    alias: ['f', 'fileName'],
    type: 'string',
    default: 'translation.json',
  })
  .demandOption(['out_path'])
  .help();

const argv = yargs.argv;

if (!argv._ || !argv._.length) {
  yargs.showHelp();
  console.error('Missing path to source directories [source_path]!');
  console.error('');
  process.exit(1);
}

const [searchPath] = argv._;
const { l, o, f } = argv;

const langList = l.split(',');
const outPath = o.endsWith('/') ? o.substr(0, o.length - 1) : o;
const fileName = f.startsWith('/') ? f.substring(1) : f;

// load translation files

function loadTranslations(langList, path, fileName) {
  let translations = {};
  langList.forEach(lang => {
    const filePath = `${path}/${lang}/${fileName}`;
    if (fs.existsSync(filePath)) {
      translations[lang] = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    } else {
      translations[lang] = {};
    }
  });
  return translations;
}

function writeTranslations(translations, path, fileName) {
  console.log('');
  console.log('Writing files');
  Object.keys(translations).forEach(lang => {
    const folderPath = `${path}/${lang}`;
    const filePath = `${folderPath}/${fileName}`;
    console.log(filePath);

    if (!fs.existsSync(folderPath)) {
      mkdirp.sync(folderPath);
    }
    fs.writeFileSync(filePath, JSON.stringify(translations[lang], null, 2));
  });
}

function parseFile(file) {
  console.log(file);
  const translateRegexp = /[^\w]t\( *[\['"](.+?)[\]'"]( *, *\{.+?\})? *\)/gm;
  const fileContent = fs.readFileSync(file, 'utf8');
  let result;
  let ret = [];
  while ((result = translateRegexp.exec(fileContent)) !== null) {
    const [full, key] = result;
    console.log(full.trim(), key, result.index);
    ret.push({ full: full.trim(), key, index: result.index });
  }
  return ret;
}

let translations = loadTranslations(langList, outPath, fileName);

const files = glob.sync(
  searchPath + (searchPath.endsWith('/') ? '' : '/') + '**/*.@(js|jsx)'
);

files.forEach(file => {
  if (fs.lstatSync(file).isDirectory()) {
    return;
  }

  const resList = parseFile(file);
  resList.forEach(res => {
    const { full, key, index } = res;
    langList.forEach(lang => {
      if (!translations[lang][key]) {
        translations[lang][key] = key;
      }
    });
  });
});

writeTranslations(translations, outPath, fileName);

console.log('');
console.log('Done!');
console.log('');
