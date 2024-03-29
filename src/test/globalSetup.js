const { spawn } = require('child_process');
const { kill } = require('process');

let apiServer = null;
module.exports = () => {
  if (apiServer) {
    kill(`-${apiServer.pid}`, 'SIGKILL');
    return Promise.resolve();
  } else {
    let localResolve = null;
    const promise = new Promise((resolve) => {
      localResolve = resolve;
    });
    apiServer = spawn('yarn', ['dev:api'], { detached: true });
    apiServer.stdout.on('data', (data) => {
      console.log('[API SERVER][stdout]', data.toString());
      localResolve();
    });

    return promise;
  }
};
