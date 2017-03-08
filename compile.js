'use strict';

const execSync = require('child_process').execSync
const fs = require('fs')
const path = require('path')

const nodeModulesBinPath = path.join(process.cwd(), 'node_modules', '.bin')
const envPath = `${process.env.PATH}:${nodeModulesBinPath}`
const env = Object.assign({}, process.env, { PATH: envPath })

const filePath = `./Function2.native`

execSync(`eval $(dependencyEnv) && nopam && rebuild -use-ocamlfind -cflag -w -cflag -40 -I . ${filePath}`, { stdio:[0,1,2], env });
