'use strict';

const fs = require('fs');
const os = require("os");
const child = require('child_process');
const byline = require('./byline');

process.env['PATH'] = process.env['PATH'] + ':' + process.env['LAMBDA_TASK_ROOT']

module.exports.run = (event, context, callback) => {
  console.log('event', event)
  const stat = fs.statSync('./Index.native');

  console.log('file stat:', stat);

  const proc = child.spawn('./Index.native', { stdio: ['pipe', 'pipe', process.stderr] });

  const out = byline(proc.stdout);

  const lines = [];

  out.on('data', (line) => {
    console.log('DATA: ' + line);
    lines.push(line);
  });

  proc.on('error', (err) => {
    console.log('ERROR: ' + err.message);
    callback(new Error(`Failed execution: ${err.message}`));
  });

  proc.on('exit', (code, signal) => {
    console.log('EXIT');
    console.log(code);
    console.log(signal);
    console.log(lines);
    // we need to use timeout here since exit happens before out.on('data')
    setTimeout(() => {
      const stdout = lines.join('\n');
      const final = stdout || '{}'
      console.log(final)

      callback(null, JSON.parse(final));
    }, 1)
  });

  proc.stdin.end(JSON.stringify(event)+'\n');
};
