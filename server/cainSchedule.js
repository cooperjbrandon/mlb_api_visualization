var cainStarts = ["04/02/2011", "04/09/2011", "04/15/2011", "04/20/2011", "04/26/2011", "05/01/2011", "05/06/2011", "05/12/2011", "05/18/2011", "05/24/2011", "05/29/2011", "06/03/2011", "06/08/2011", "06/10/2011", "06/14/2011", "06/19/2011", "06/25/2011", "06/30/2011", "07/04/2011", "07/05/2011", "07/10/2011", "07/17/2011", "07/22/2011", "07/27/2011", "08/01/2011", "08/06/2011", "08/12/2011", "08/17/2011", "08/23/2011", "08/28/2011", "09/02/2011", "09/07/2011", "09/13/2011", "09/18/2011", "09/23/2011", "04/08/2012", "04/13/2012", "04/18/2012", "04/20/2012", "04/24/2012", "05/01/2012", "05/06/2012", "05/12/2012", "05/17/2012", "05/22/2012", "05/27/2012", "06/02/2012", "06/07/2012", "06/13/2012", "06/18/2012", "06/24/2012", "06/29/2012", "07/05/2012", "07/15/2012", "07/18/2012", "07/21/2012", "07/27/2012", "07/30/2012", "08/01/2012", "08/06/2012", "08/11/2012", "08/17/2012", "08/22/2012", "08/28/2012", "09/02/2012", "09/08/2012", "09/14/2012", "09/19/2012", "09/26/2012", "10/01/2012", "04/12/2013", "04/18/2013", "04/23/2013", "04/29/2013", "05/05/2013", "05/10/2013", "05/16/2013", "05/21/2013", "05/26/2013", "06/01/2013", "06/07/2013", "06/13/2013", "06/18/2013", "06/23/2013", "06/29/2013", "07/05/2013", "07/10/2013", "07/20/2013", "07/26/2013", "08/01/2013", "08/06/2013", "08/11/2013", "08/17/2013", "08/22/2013", "09/07/2013", "09/12/2013", "09/18/2013", "09/24/2013"];
var teams = ["at lanmlb", "slnmlb", "at arimlb", "at colmlb", "at pitmlb", "at wasmlb", "colmlb", "arimlb", "at lanmlb", "flomlb", "at milmlb", "colmlb", "wasmlb", "cinmlb", "at arimlb", "at oakmlb", "clemlb", "at chnmlb", "sdnmlb", "sdnmlb", "nynmlb", "at sdnmlb", "milmlb", "at phimlb", "arimlb", "phimlb", "at flomlb", "at atlmlb", "sdnmlb", "houmlb", "arimlb", "at sdnmlb", "sdnmlb", "at colmlb", "at arimlb", "at arimlb", "pitmlb", "phimlb", "at nynmlb", "at cinmlb", "miamlb", "milmlb", "at arimlb", "slnmlb", "at milmlb", "at miamlb", "chnmlb", "at sdnmlb", "houmlb", "at anamlb", "at oakmlb", "cinmlb", "at wasmlb", "houmlb", "at atlmlb", "at phimlb", "lanmlb", "nynmlb", "nynmlb", "at slnmlb", "colmlb", "at sdnmlb", "at lanmlb", "at houmlb", "at chnmlb", "lanmlb", "at arimlb", "colmlb", "arimlb", "at lanmlb", "at chnmlb", "at milmlb", "arimlb", "at arimlb", "lanmlb", "atlmlb", "at colmlb", "wasmlb", "colmlb", "at slnmlb", "at arimlb", "at pitmlb", "sdnmlb", "miamlb", "at colmlb", "lanmlb", "nynmlb", "arimlb", "chnmlb", "at phimlb", "milmlb", "balmlb", "at miamlb", "pitmlb", "arimlb", "at lanmlb", "at nynmlb", "lanmlb"];

for (var i = 0; i< cainStarts.length; i++) {
	var temp = cainStarts[i].split('/');
	cainStarts[i] = {};
	cainStarts[i].month = temp[0];
	cainStarts[i].day = temp[1];
	cainStarts[i].year = temp[2];
	if (teams[i].slice(0,3) === 'at ') {
		cainStarts[i].awayTeam = 'sfnmlb';
		cainStarts[i].homeTeam = teams[i].slice(3);
		// console.log(cainStarts.homeTeam + '__' + i);
	} else {
		cainStarts[i].homeTeam = 'sfnmlb';
		cainStarts[i].awayTeam = teams[i];
		// console.log(cainStarts.homeTeam + '__' + i);
	}
}

exports.cainStarts = cainStarts;