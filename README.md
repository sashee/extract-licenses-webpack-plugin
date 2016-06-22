# Extract Licenses Webpack Plugin

This plugin adds support to extract the license comments to a file

## Usage

Add it as a devDependency to your package.json:

```
devDependencies: {
  ...
  "extract-licenses-webpack-plugin": "https://github.com/sashee/extract-licenses-webpack-plugin",
  ...
},
```

Then add it to the webpack config:

```
const ExtractLicensesPlugin = require("extract-licenses-webpack-plugin");

...
plugins: [
  ...
  new ExtractLicensesPlugin({
    filename: "LICENSES"
  }),
  ...
]
...
```
