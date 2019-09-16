//  Dependencies
const express = require('express');
const morgan = require('morgan');
const path = require('path');

//  App
const app = express();

//  Settings
app.set('port', process.env.PORT || 3000);

//  Middleware
app.use(morgan('dev'));
app.use(express.json());

//  Statics Files
app.use(express.static(path.join(__dirname, '../dist')));

app.listen(app.get('port'), () => {
  console.log(`Sever On Port ${app.get('port')}`);
});
