#!/usr/bin/env node
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const path = require('path');
const { generateDefaultConfig, loadConfig } = require('../lib/config');
const { runProject } = require('../lib/run');

yargs(hideBin(process.argv))
  .command(
    'init',
    'Generate a default setup.config.cjs file',
    () => {},
    async (argv) => {
      try {
        const configPath = path.resolve(process.cwd(), '.ngl/setup.config.cjs');
        await generateDefaultConfig(configPath);
        console.log(`✅ Default configuration file created at ${configPath}`);
      } catch (error) {
        console.error(`❌ Error generating config file: ${error.message}`);
        process.exit(1);
      }
    }
  )
  .command(
    'run [target]',
    'Runs the commands for a specific sequence or if none specified runs the startup commands',
    (yargs) => {
      return yargs.positional('target', {
        describe: 'The build target',
        type: 'string'
      });
    },
    async (argv) => {
      try {
        const configPath = path.resolve(process.cwd(), '.ngl/setup.config.cjs');
        const config = await loadConfig(configPath);
        if (!config) {
          console.error(
            '❌ No setup.config.js found. Run "ngl-setup init" to create one.'
          );
          process.exit(1);
        }

        console.log(`🚀 Running commands from target: ${argv.target}...`);

        if (argv.target) {
          console.log('Running startup');
          await runProject(config, 'startup');
          console.log('✅ Web build completed.');
        }

        console.log('🎉 Process finished.');
      } catch (error) {
        console.error(`❌ Build failed: ${error.message}`);
        console.error(error.stack); // For more detailed debugging
        process.exit(1);
      }
    }
  )
  .demandCommand(1, 'You need at least one command before moving on')
  .help()
  .alias('h', 'help')
  .strict()
  .parse();