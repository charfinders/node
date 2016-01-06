var fs = require('fs');

function readUCDLines (cb) {
  fs.readFile('UnicodeData.txt', 'ascii', function (err, data) {
    if (err) {
      cb(err);
    } else {
      cb(null, data.split('\n'));
    }
  });
}

module.exports = {
  readUCDLines: readUCDLines
};
