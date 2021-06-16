"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let mysql = require('mysql');
const hostname = '127.0.0.1';
const port = 3023;
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: '',
    database: 'tienda'
});
exports.default = { connection };
