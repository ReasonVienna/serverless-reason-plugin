'use strict';

const fs = require('fs');
const child = require('child_process');

module.exports.run = (event, context, callback) => {
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
