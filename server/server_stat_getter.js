var http  = require('http');
var url   = require('url');

var headers = {};

headers['Content-Type'] = "text/xml";

var stats = function(request, response) {
	var id = url.parse(request.url, true).query.playerID;
  var data = '';
  var year = cainStarts[i].year;
  var month = cainStarts[i].month;
  var day = cainStarts[i].day;
  var path = '/components/game/mlb/year_' + year + '/month_' + month + '/day_' + day + '/gid_' + year + '_' + month + '_' + day + '_sfnmlb_lanmlb_1/inning/inning_all.xml';
  var options = {
    host: 'gd2.mlb.com',
    path: '/components/game/mlb/year_2012/month_08/day_22/gid_2012_08_22_sfnmlb_lanmlb_1/inning/inning_all.xml'
  };

  http.get(options, function(result) {
    result.on("data", function(chunk) {
      data += chunk;
    });
    result.on('end', function() {
      response.writeHead(200, headers);
      response.end(data);
    });
  }).on('error', function(e) {
      console.log("Error: " + options.host + "\n" + e.message); 
      console.log( e.stack );
  });
};

exports.stats = stats;
var cainStarts = ["04/02/2011", "04/09/2011", "04/15/2011", "04/20/2011", "04/26/2011", "05/01/2011", "05/06/2011", "05/12/2011", "05/18/2011", "05/24/2011", "05/29/2011", "06/03/2011", "06/08/2011", "06/10/2011", "06/14/2011", "06/19/2011", "06/25/2011", "06/30/2011", "07/04/2011", "07/05/2011", "07/10/2011", "07/17/2011", "07/22/2011", "07/27/2011", "08/01/2011", "08/06/2011", "08/12/2011", "08/17/2011", "08/23/2011", "08/28/2011", "09/02/2011", "09/07/2011", "09/13/2011", "09/18/2011", "09/23/2011", "4/8/2012", "4/13/2012", "4/18/2012", "4/20/2012", "4/24/2012", "5/1/2012", "5/6/2012", "5/12/2012", "5/17/2012", "5/22/2012", "5/27/2012", "6/2/2012", "6/7/2012", "6/13/2012", "6/18/2012", "6/24/2012", "6/29/2012", "7/5/2012", "7/15/2012", "7/18/2012", "7/21/2012", "7/27/2012", "7/30/2012", "8/1/2012", "8/6/2012", "8/11/2012", "8/17/2012", "8/22/2012", "8/28/2012", "9/2/2012", "9/8/2012", "9/14/2012", "9/19/2012", "9/26/2012", "10/1/2012", "4/12/2013", "4/18/2013", "4/23/2013", "4/29/2013", "5/5/2013", "5/10/2013", "5/16/2013", "5/21/2013", "5/26/2013", "6/1/2013", "6/7/2013", "6/13/2013", "6/18/2013", "6/23/2013", "6/29/2013", "7/5/2013", "7/10/2013", "7/20/2013", "7/26/2013", "8/1/2013", "8/6/2013", "8/11/2013", "8/17/2013", "8/22/2013", "9/7/2013", "9/12/2013", "9/18/2013", "9/24/2013"];
for (var i = 0; i< cainStarts.length; i++) {
	var temp = cainStarts[i].split('/');
	cainStarts[i] = {};
	cainStarts[i].day = temp[0];
	cainStarts[i].month = temp[1];
	cainStarts[i].year = temp[2];
}


 

var hello = 'at lanmlb  slnmlb  at arimlb  at colmlb  at pitmlb  at wasmlb  colmlb  arimlb  at lanmlb  flomlb  at milmlb  colmlb  wasmlb  cinmlb  at arimlb  at oakmlb  clemlb  at chnmlb  sdnmlb  sdnmlb  nynmlb  at sdnmlb  milmlb  at phimlb  arimlb  phimlb  at flomlb  at atlmlb  sdnmlb  houmlb  arimlb  at sdnmlb  sdnmlb  at colmlb  at arimlb  at arimlb  pitmlb  phimlb  at nynmlb  at cinmlb  miamlb  milmlb  at arimlb  slnmlb  at milmlb  at miamlb  chnmlb  at sdnmlb  houmlb  at anamlb  at oakmlb  cinmlb  at wasmlb  houmlb  at atlmlb  at phimlb  lanmlb  nynmlb  nynmlb  at slnmlb  colmlb  at sdnmlb  at lanmlb  at houmlb  at chnmlb  lanmlb  at arimlb  colmlb  arimlb  at lanmlb  at chnmlb  at milmlb  arimlb  at arimlb  lanmlb  atlmlb  at colmlb  wasmlb  colmlb  at slnmlb  at arimlb  at pitmlb  miamlb  at colmlb  lanmlb  nynmlb  arimlb  chnmlb  at phimlb  milmlb  balmlb  at miamlb  pitmlb  arimlb  at lanmlb  at nynmlb  lanmlb'


var dates = [];
