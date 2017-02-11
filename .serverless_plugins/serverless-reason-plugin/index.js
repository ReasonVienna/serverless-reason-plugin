'use strict';

const execSync = require('child_process').execSync
const path = require('path')

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
    this.serverless.cli.log('Hello from Serverless!');
    // TODO add node_modules
    const nodeModulesBinPath = path.join(process.cwd(), 'node_modules', '.bin')
    // Note: only for local development
    const serverlessPluginBinPath = path.join(__dirname, 'node_modules', '.bin')
    const envPath = `${process.env.PATH}:${serverlessPluginBinPath}:${nodeModulesBinPath}`
    const env = Object.assign({}, process.env, { PATH: envPath })
    const rootPath = process.cwd()
    // const filePath = path.resolve(rootPath, 'Test.native')
    const filePath = './Test.native'
    execSync(`eval $(dependencyEnv) && nopam && rebuild -use-ocamlfind -cflag -w -cflag -40 -I . ${filePath} 2>&1 | berror.native --path-to-refmttype refmttype`, { stdio:[0,1,2], env });
    // execSync('eval $(dependencyEnv) && nopam && rebuild -use-ocamlfind -cflag -w -cflag -40 -I src ./Test.native 2>&1 | berror.native --path-to-refmttype refmttype', { stdio:[0,1,2] });
  }
}

module.exports = ServerlessPlugin;
