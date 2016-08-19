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

app.listen(3000, function () {
	console.log('Analytics app listening on port 3000!');
});