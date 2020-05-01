# JsMin Extension for Nova

Automatically minify js files on save. Menu options to Compress, Mangle or Beautify current script.

## Requirements

Before using this extension, you must ensure that `uglifyjs` is installed on your system. 

## UglifyJS Install

1. Install [Node](https://nodejs.org).
	1. Via the [Node](https://nodejs.org) website
	2. or using [Homebrew](https://brew.sh/) `brew install node`
2. Via Terminal run `npm install uglify-es -g`

## Extension Installation

1. Open Nova.
2. Choose menu **Extensions** > **Extension Library...**
3. Search extension `NovaJsMin`
5. Click **Install**.

## Preferences 
**Minify on Save**<br/>
`Yes, No`<br/>
Automatically minify .js files on save 

**Mangle**<br/>
`Yes, No`<br/>
Mangle names

**Generate Source Map**<br/>
`Yes, No`<br/>
Enable source map file generation

**Executable Path**<br/>
`/path/to/uglifyjs`<br/>
Manually enter or select the uglifyjs binary location.