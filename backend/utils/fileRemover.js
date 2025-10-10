const fs = require('fs');
const path = require('path');

const removeFile = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.unlink(filePath, (err) => {
      if (err) return reject(err);
      resolve();
    });
  });
};


module.exports = removeFile
