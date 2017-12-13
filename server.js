var express = require('express');
var path = require('path');

let port = process.env.PORT || 8080

var app = express();

app.use('/static', express.static(path.join(__dirname, 'dist', 'static')));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'dist', 'index.html')))

app.listen(port, () => console.log(`App listening on port ${port}`))
