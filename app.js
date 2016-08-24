var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  	res.render('index.html');
});

//var data = [
//	{dimension: "10", value: 23206},
//	{dimension: "11", value: 25274},
//	{dimension: "12", value: 19899},
//	{dimension: "13", value: 23021},
//	{dimension: "14", value: 24238},
//	{dimension: "15", value: 24032},
//	{dimension: "16", value: 24478}
//];
//elastic.indexExists()
//	.then(function (exists) {
//		if (exists) {
//			return elastic.deleteIndex();
//		}
//	});
//_.each(data, function (obj) {
//	elastic.addDocument(obj).then(function (result) { console.log(result)});
//});
//console.log('docs added successfully');
//
//elastic.getAll().then(function () {
//	console.log('hello world');
//});

app.set('port', process.env.PORT || '3000');
//var httpsServer = https.createServer(credentials, app);
//httpsServer.listen(process.env.PORT || '3000');
app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
	console.log('Analytics Server is up and listening on port number: ' + process.env.PORT || 3000);
});