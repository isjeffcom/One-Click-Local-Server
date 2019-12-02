var express = require('express')
var fs = require('fs')
var bodyParser = require('body-parser')
var app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// 访问静态资源
app.use(express.static('./dist'))

// 访问单页
app.get('*', function (req, res) {
    var html = fs.readFileSync('./dist/index.html', 'utf-8')
    res.send(html)
});

// 监听
app.listen(8081, function () {
    console.log('Project Running At：' + 'http://localhost:8081')
});

var exec = require('child_process').exec;
var url= "http://localhost:8081/"
switch (process.platform) {
  case "darwin":
    exec('open ' + url);
    break;
  case "win32":
    exec('start ' + url);
    break;
  default:
    exec('xdg-open', [url]);
}