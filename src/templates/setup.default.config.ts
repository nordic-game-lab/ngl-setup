// SPDX-FileCopyrightText: Andrew Ball <andrew@aball.dev>
// SPDX-License-Identifier: MPL-2.0
// nglBuild.config.default.cjs

module.exports = {
  startup:  [
    "npm i",
    "npm run build",
    "npx ngl-setup run startup"
  ]
};
