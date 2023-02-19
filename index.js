"use strict";
exports.__esModule = true;
var express_1 = require("express");
var app = (0, express_1["default"])();
var PORT = 3033;
app.get('/', function (req, res) {
    res.send('texasjkee');
});
app.get('/users', function (req, res) {
    res.send('hello friends');
});
app.post('/users', function (req, res) {
    res.send('Goodbye friends');
});
app.listen(PORT, function () {
    console.log("Starting app at port ".concat(PORT, " "));
});
