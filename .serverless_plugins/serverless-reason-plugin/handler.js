'use strict';

const fs = require('fs');
const child = require('child_process');
const byline = require('./byline');

process.env['PATH'] = process.env['PATH'] + ':' + process.env['LAMBDA_TASK_ROOT']

module.exports.run = (event, context, callback) => {
  const stat = fs.statSync('./Index.native');

  console.log('file stat:');
  console.log(stat);

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
    const stdout = lines.join('\n');

    callback(null, { message: stdout });
  });

  // const response = {
  //   status: 200,
  //   body: JSON.stringify({
  //     message: stdout
  //   })
  // };
  //
  // callback(null, response);
};
