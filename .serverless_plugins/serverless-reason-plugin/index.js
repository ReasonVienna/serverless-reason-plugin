'use strict';

const execSync = require('child_process').execSync
const fs = require('fs')
const path = require('path')
const archiver = require('archiver')

class ServerlessPlugin {
  constructor(serverless, options) {
    this.serverless = serverless;
    this.options = options;

    this.commands = {
      reasonBuild: {
        usage: 'Build the reason targets (also done on deploy)',
        lifecycleEvents: [
          'build',
        ],
      },
    };

    this.hooks = {
      'reasonBuild:build': this.build.bind(this),
      'after:deploy:initialize': this.build.bind(this),
    };
  }

  build() {
    const nodeModulesBinPath = path.join(process.cwd(), 'node_modules', '.bin')
    const envPath = `${process.env.PATH}:${nodeModulesBinPath}`
    const env = Object.assign({}, process.env, { PATH: envPath })

    const promises = []
    Object.keys(this.serverless.service.functions).map((key) => {
      const func = this.serverless.service.functions[key]
      if (func.compileReason === undefined || func.compileReason !== 'native') {
        return;
      }

      // Compile the Reason file for this specific function
      this.serverless.cli.log(`Compile ${func.handler}.re for the function '${key}'...`);
      const filePath = `./${func.handler}.native`
      execSync(`eval $(dependencyEnv) && nopam && rebuild -use-ocamlfind -cflag -w -cflag -40 -I . ${filePath} 2>&1 | berror.native --path-to-refmttype refmttype`, { stdio:[0,1,2], env });

      const serverlessDir = path.join(process.cwd(), '.serverless')
      func.handler = 'handler.run'
      func.package = {
        artifact: path.join(serverlessDir, `${key}.zip`)
      }

      // Create the .serverless directory if necessary
      if (!fs.existsSync(serverlessDir)){
        fs.mkdirSync(serverlessDir)
      }

      // Package the function
      const output = fs.createWriteStream(func.package.artifact)
      const archive = archiver('zip', {
        store: true // Sets the compression method to STORE.
      })
      archive.pipe(output)
      // Add the Binary to the zip and make it executable
      archive.append(fs.createReadStream(filePath), { name: 'Index.native', mode: 777 })
      // Add the JS shim to the zip
      const handlerPath = path.join(__dirname, 'handler.js')
      archive.append(fs.createReadStream(handlerPath), { name: 'handler.js' })
      archive.finalize()

      const promise = new Promise((zipResolve, zipReject) => {
        output.on('close', () => zipResolve());
        archive.on('error', (err) => zipReject(err));
      })
      promises.push(promise)
    })

    return Promise.all(promises)
  }
}

module.exports = ServerlessPlugin;
