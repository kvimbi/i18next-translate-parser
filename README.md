# i18next-translate-parser

Simple script for extracting keys for translation from js sources.
Scripts itereates over sources extracts keys for translation and saves them to resource json file.

## Download
Using git:

`git clone https://github.com/kvimbi/i18next-translate-parser.git .`

Or download and unpack zip file

## Install dependencies
yarn

## Run
- using node - node index.js source_path [options]
- using yarn - yarn start source_path [options]
- using node - node start source_path [options]

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
