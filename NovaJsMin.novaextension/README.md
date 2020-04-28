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

| Preference          | Options                 | Summary                                                                                                                                                                                                                  |
|---------------------|-------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Compile on Save     | On, Off                 | Automatically compile scss files on save                                                                                                                                                                                 |
| CSS Style           | Expanded, Compressed    | Controls the output style of the resulting CSS                                                                                                                                                                           |
| Error CSS           | On, Off                 | Tells Sass whether to emit a CSS file when an error occurs during compilation                                                                                                                                            |
| Generate Source Map | External, Internal, Off | Source maps are files that tell browsers or other tools that consume CSS how that CSS corresponds to the Sass files from which it was generated. They make it possible to see and even edit your Sass files in browsers. |