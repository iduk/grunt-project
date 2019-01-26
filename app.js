'use strict';

var express = require('express');
var hbs = require('express-hbs');
var path = require('path');
var fs = require('fs');

var app = express();




// view engine setup
app.engine('hbs', hbs.express4({
	partialsDir: __dirname + '/src/views/partials',
	// override the default compile
	onCompile: function (exhbs, source, filename) {
		var options;
		if (filename && filename.indexOf('partials') > -1) {
			options = {
				preventIndent: true
			};
		}
		return exhbs.handlebars.compile(source, options);
	}
}));
app.set('view engine', 'hbs');
app.set('views', __dirname + '/src/views');
app.use('/components', express.static(__dirname + '/components'));
app.use('/src', express.static(__dirname + '/src'));


// use


// index
app.get('/', (req, res) => {
	res.render('index');
});

// pages...
app.get('/login', (req, res) => {
	res.render('login');
});


// Open
app.listen(8000, () => {
	console.log('Start! localhost:8000');
});

app.set('view cache', true);