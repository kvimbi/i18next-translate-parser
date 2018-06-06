# i18next-translate-parser

Simple script for extracting keys for translation from js sources.
Scripts itereates over sources extracts keys for translation and saves them to resource json file.

Usage:

## Install dependencies
yarn

## Run
- using node - node staticParser.js [options]
- using yarn - yarn start [options]
- using node - node start [options]

## Help
 yarn start -help

## Options:
```
  source_path                  Path to source file folder              [required]
  --version                    Show version number                     [boolean]
  --lang, -l                   Coma separated list of locales
                                                        [string] [default: "sk"]
  --out_path, -o, --outPath    Output path to store language file
                                                             [string] [required]
  --file_name, -f, --fileName  Filename for translation
                                          [string] [default: "translation.json"]
  --help                       Show help                               [boolean]
```
