var fs = require('fs');

var codeMap = new Map();
var nameMap = new Map();

function readUCDLines (cb) {
  fs.readFile('UnicodeData.txt', 'ascii', function (err, data) {
    if (err) {
      cb(err);
    } else {
      cb(null, data.split('\n'));
    }
  });
}

function loadIndexes(cb) {
  readUCDLines(function (err, data) {
    if (err) {
      cb(err);
    } else {
      data.forEach(function (line) {
        var parts = line.split(';');
        if (parts[1] && !parts[1].startsWith('<')) {
          codeMap.set(parts[0], parts[1]);
          parts[1].split(' ').forEach(function(word) {
            nameMap.set(word, (nameMap.get(word) || new Set()).add(parts[0]));
          });
        }
      });
      cb();
    }
  });
}

module.exports = {
  readUCDLines: readUCDLines,
  loadIndexes: loadIndexes,
  codeMap: codeMap,
  nameMap: nameMap,
};
