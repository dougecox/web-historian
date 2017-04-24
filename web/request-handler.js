var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var urlParser = require('url');
var utils = require('./http-helpers')

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};



// require more modules/folders here!


var actions = {
  'GET': function(request, response) {
    var parts = urlParser.parse(request.url);
    var urlPath = parts.pathname === '/' ? '/index.html' : parts.pathname;
    utils.serveAssets(response, urlPath, function() {
      // is it in sites.txt
      archive.isUrlInList(urlPath.slice(1), function(found) {
        console.log('found', found)
        if(found) { // if yes -> loading  
          utils.sendRedirect(response, '/loading.html');
        } else {
        // if no -> 404
          utils.send404(response);
        }  
      });
    });

  },
  'POST': function(request, response) {
    utils.collectData(request, function(data) {
      var url = data.split("=")[1];
      console.log(url);
      // in sites.txt?
      archive.isUrlInList(url, function(found) {
        if(found) { // if yes
          // is it archived?
          archive.isUrlArchived(url, function(exists){
            if(exists) { // if yes
              // display page
              utils.sendRedirect(response, url);
            } else { // if no
              // display loading
              utils.sendRedirect(response, '/loading.html');
            }
          })
        } else { // if no
          // append to sites.txt
          archive.addUrlToList(url, function(){
            // redirect loading
            utils.sendRedirect(response, '/loading.html');
          });
        }
      })
    });
  }
};

exports.handleRequest = function (req, res) {
  var handler = actions[req.method];
  if (handler) {
    handler(req, res);
  } else {
    helpers.send404(response);
  }
};



// exports.handleRequest = function (req, res) {
	
//   if (req.method === 'GET') {
//   var indexPage;
//   fs.readFile(exports.paths.siteAssets + '/index.html', 'utf8', (err, data) => {
// 		if (err) {
// 			throw err;
// 		}
//     indexPage = data; 
// 		res.end(indexPage);
// 	});
    
//   }
  
// };