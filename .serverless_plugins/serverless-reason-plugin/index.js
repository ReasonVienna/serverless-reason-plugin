'use strict';

const execSync = require('child_process').execSync

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
    execSync('eval $(dependencyEnv) && nopam && rebuild -use-ocamlfind -cflag -w -cflag -40 -I src ./src/Test.native 2>&1 | berror.native --path-to-refmttype refmttype', { stdio:[0,1,2] });
  }
}

module.exports = ServerlessPlugin;
