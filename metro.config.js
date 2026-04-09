const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

// Add MP3 files to asset extensions
config.resolver.assetExts.push("mp3");

module.exports = config;
