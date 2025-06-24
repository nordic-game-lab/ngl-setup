// nglBuild.config.default.cjs
const path = require('path');

module.exports = {
  common: {
    // Common settings for both web and server if any
    // e.g., sourceRoot: 'src',
    // tsconfig: 'tsconfig.json', // Path to your tsconfig.json
  },
  server: {
    entryPoints: [path.resolve(process.cwd(), 'src/bin/setup-cli.ts'), path.resolve(process.cwd(), 'src/templates/setup.default.config.ts'), path.resolve(process.cwd(), 'src/lib/config.ts'), path.resolve(process.cwd(), 'src/lib/run.ts')], // Entry point for server
    outdir: path.resolve(process.cwd(), 'dist/'),        // Output directory for server
    // outfile: path.resolve(process.cwd(), 'dist/server/server.js'), // Use outdir for multiple files or outfile for a single bundle
    target: 'node24', // esbuild target (Node.js version)
    format: 'cjs',    // esbuild format (CommonJS for Node.js, or 'esm' if using Node.js ESM)
    bundle: false,     // Set to false if you want to keep separate files, true to bundle
    minify: false,    // Usually not minified for server-side
    sourcemap: false,
    platform: 'node', // esbuild option
    //tsconfig: 'tsconfig.server.json', // Optional: specific tsconfig for server
    // external: ['pg', 'express'], // Example: node_modules that shouldn't be bundled
    // copyAssets: [
    //   { from: '.env.example', to: 'dist/server/.env.example' }
    // ]
  },
};
