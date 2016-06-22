"use strict";
const extract = require("esprima-extract-comments");
const ModuleFilenameHelpers = require("webpack/lib/ModuleFilenameHelpers.js");

function ExtractCommentsPlugin(options) {
	this.options = options;
}

ExtractCommentsPlugin.prototype.apply = function(compiler) {
	const options = this.options;
	options.test = options.test || /\.js($|\?)/i;
	const filename = options.filename;

	compiler.plugin("compilation", (compilation) => {
		compilation.plugin('optimize-chunk-assets', (chunks, callback) => {
			var files = [];
			chunks.forEach(function(chunk) {
				chunk.files.forEach(function(file) {
					files.push(file);
				});
			});
			compilation.additionalChunkAssets.forEach(function(file) {
				files.push(file);
			});
			files = files.filter(ModuleFilenameHelpers.matchObject.bind(undefined, options));

			for (let basename of files) {
				const asset = compilation.assets[basename];
				const comments = extract(asset.source());
				const licenseComments = comments.filter((comment) => {
					return comment.value.indexOf("!") === 0 ||
						comment.value.indexOf("@license") !== -1 ||
						comment.value.indexOf("@preserve") !== -1;
				}).map((comment) => comment.value);
				const licenses = licenseComments.map((comment) => `/**${comment}*/\n`).join("");

				compilation.assets[filename] = {
					source: () => licenses,
					size: () => licenses.length
				};
			}
			callback();
		});
	});
};

module.exports = ExtractCommentsPlugin;
