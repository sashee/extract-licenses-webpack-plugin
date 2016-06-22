const webpack = require("webpack");
const ExtractCommentsPlugin = require("..");

module.exports = {
	entry: "./sample.js",
	output: {
		filename: "bundle.js"
	},
	plugins: [
		new ExtractCommentsPlugin({
			filename: "test.txt"
		})
	],
	debug: true
};
