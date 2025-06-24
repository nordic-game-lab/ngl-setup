const { exec } = require('child_process');

// Helper to run commands
function runCommand(command) {
  return new Promise((resolve, reject) => {
    const process = exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Command error: ${stderr || error.message}`);
        reject(new Error(stderr || error.message));
        return;
      }
      if (stderr) {
        console.warn(`Command stderr: ${stderr}`); // Log stderr as warning
      }
      if (stdout) {
        console.log(`Command stdout: ${stdout}`);
      }
      resolve(stdout);
    });
  });
}

async function runProject(targetConfig: object, targetName: string) {
  console.log(`Using ${targetName}`);
    for (let key in targetConfig) {
        if (key == targetName){
            targetConfig[key].forEach((a: string) => {
              runCommand(a);
            });
        }
    }
}

module.exports = {
  runProject,
};