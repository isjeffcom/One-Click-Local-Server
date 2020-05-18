const express = require('express')
const fs = require('fs')
const path = require('path')
const bodyParser = require('body-parser')
let app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// 访问静态资源
app.use(express.static(path.join('.','dist')))

// 访问单页
app.get('*', function (req, res) {
    var html = fs.readFileSync(path.join('.', 'dist', 'index.html'), 'utf-8')
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