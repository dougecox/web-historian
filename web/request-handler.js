var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};



// require more modules/folders here!

exports.handleRequest = function (req, res) {
	
  if (req.method === 'GET') {
  var indexPage;
  fs.readFile(exports.paths.siteAssets + '/index.html', 'utf8', (err, data) => {
		if (err) {
			throw err;
		}
    indexPage = data; 
		res.end(indexPage);
	});
    
  }
  
};
