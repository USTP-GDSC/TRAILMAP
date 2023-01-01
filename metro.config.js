const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

config.resolver.assetExts.push(
	// Adds support for asset file types
	'css',
	'jsr'
);

module.exports = config;
