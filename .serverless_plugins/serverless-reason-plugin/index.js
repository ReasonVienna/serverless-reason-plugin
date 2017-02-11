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
      build: {
        usage: 'Build the reason targets',
        lifecycleEvents: [
          'build',
        ],
      },
    };

    this.hooks = {
      'build:build': this.build.bind(this),
    };
  }

  build() {
    this.serverless.cli.log('Build Test.native');

    const nodeModulesBinPath = path.join(process.cwd(), 'node_modules', '.bin')
    const envPath = `${process.env.PATH}:${nodeModulesBinPath}`
    const env = Object.assign({}, process.env, { PATH: envPath })

    // replace with Rambda
    Object.keys(this.serverless.service.functions).map((key) => {
      const func = this.serverless.service.functions[key]
      if (func.compileReason === undefined || func.compileReason !== 'native') {
        return;
      }

      const filePath = `./${func.handler}.native`
      execSync(`eval $(dependencyEnv) && nopam && rebuild -use-ocamlfind -cflag -w -cflag -40 -I . ${filePath} 2>&1 | berror.native --path-to-refmttype refmttype`, { stdio:[0,1,2], env });

      func.handler = 'handler.run'
      func.artifact = path.join(process.cwd(), '.serverless', `${key}.zip`)

      const output = fs.createWriteStream(func.artifact)
      const archive = archiver('zip', {
        store: true // Sets the compression method to STORE.
      })
      archive.pipe(output)
      archive.append(fs.createReadStream(filePath), { name: 'Index.native' })
      const handlerPath = path.join(__dirname, 'handler.js')
      archive.append(fs.createReadStream(handlerPath), { name: 'handler.js' })
      archive.finalize()
    })
  }
}

module.exports = ServerlessPlugin;
