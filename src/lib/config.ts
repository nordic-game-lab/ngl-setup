// SPDX-FileCopyrightText: Andrew Ball <andrew@aball.dev>
// SPDX-License-Identifier: MPL-2.0
const fs = require('fs-extra');
const path = require('path');

const defaultConfigTemplatePath = path.join(
  __dirname,
  '..',
  'templates',
  'setup.default.config.js'
);

/**
 * @param {string} configPath Path to the config file
 * 
 */
async function generateDefaultConfig(targetPath: string) {
  if (await fs.pathExists(targetPath)) {
    // Potentially ask for confirmation before overwriting
    console.warn(
      `⚠️ Configuration file already exists at ${targetPath}. Overwriting.`
    );
  }
  await fs.copy(defaultConfigTemplatePath, targetPath);
}

/**
 * Loads the config from the file and returns as an object
 * 
 * Config file is expected to be in ".ngl/nglBuild.config.default.cjs"
 * @param {string} configPath Path to the config file
 * @throws {ReferenceError} if the config file does not exist
 * @returns {object}
 * @since v1.0.3
 */
async function loadConfig(configPath: string) {
  if (!(await fs.pathExists(configPath))) {
    throw new Error(`Could not find ${configPath}`);
  }
  try {
    // Using require allows for JS files with comments and logic
    const config = require(configPath); // require automatically handles .js
    return config;
  } catch (error) {
    console.error(`❌ Error loading configuration from ${configPath}:`);
    console.error(error);
    throw new Error(`Could not load or parse ${configPath}`);
  }
}

module.exports = {
  generateDefaultConfig,
  loadConfig,
};
