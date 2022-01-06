const { spawn } = require('child_process')

let apiServer = null;
module.exports = () => {
  if (apiServer) {
    apiServer.kill(9)
    return Promise.resolve(true)
  }
  else {
    let localResolve = null
    const promise = new Promise((resolve) => { localResolve = resolve })
    apiServer = spawn('yarn', ['watch:server'])
    apiServer.stdout.on('data', (data) => {
      console.log('[API SERVER][stdout]', data.toString())
      localResolve()
    })

    return promise;
  }
};