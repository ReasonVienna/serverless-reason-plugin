'use strict';

const fs = require('fs');
const child = require('child_process');
// TODO remove
process.env['PATH'] = process.env['PATH'] + ':' + process.env['LAMBDA_TASK_ROOT']

module.exports.run = (event, context, callback) => {

  // console.log(fs.readdirSync(__dirname))

  var proc = child.spawn('./Index.native')
  proc.on('exit', function(code, signal) {
    callback(null, { message: 'yay' })
  })

  // const response = {
  //   status: 200,
  //   body: JSON.stringify({
  //     message: stdout
  //   })
  // };
  //
  // callback(null, response);
};
