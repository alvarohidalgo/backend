var fs = require('fs');
var express = require('express');
var path = require('path');
var Router = express.Router();
var viewsPath = path.join(__dirname, '../') + 'public/';
var dataPath =  path.join(__dirname, '../') + 'public/data.json';

Router.get('/ajax', function(req, res){
  let datosJSON = fs.readFileSync('./public/data.json');
  datosJSON = JSON.parse(datosJSON);
  res.json({datosJSON});
});

Router.all('*', function(req, res) {
  res.send('No se encontró el recurso solicitado');
  res.end();
});

module.exports = Router;
