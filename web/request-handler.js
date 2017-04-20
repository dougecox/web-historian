var path = require('path');
var archive = require('../helpers/archive-helpers');
// var indexPage = require('./web/public/index');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  res.end(archive.paths.list);
};
