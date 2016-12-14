var express = require('express');  
var request = require('request');
var yaml_config = require('node-yaml-config');
var config = yaml_config.load(__dirname + '/config.yml',process.argv[2]);
console.log(config); 

console.log("environment:"+process.argv[2]);

var app = express();  
app.use(cors);
app.use('/', function(req, res) {  

	var destHost = config.expense.host; 	
  var url = destHost+req.url;
  console.log(url);
  req.pipe(request(url)).pipe(res);
});

app.listen(process.env.PORT || 8899); 

function cors(req, res, next){
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
  res.set('Access-Control-Allow-Headers', '*');
  res.set('Access-Control-Allow-Credentials', false);

  // Respond OK if the method is OPTIONS
  if(req.method === 'OPTIONS') {
    return res.send(200);
  } else {
    return next();
  }
}