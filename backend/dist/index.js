"use strict";
const express = require("express");
const jwt = require("jsonwebtoken");
const clave = jwt.sign({ foo: 'bar' }, 'contra');
console.log(clave);
const server = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');
const port = 4000;
server.use(bodyParser.urlencoded({ extended: false }));
server.listen(port, () => {
    console.log("Server listening on: http://localhost:" + port);
});
//-----------------------------BASE DE DATOS---------------------------------
let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: '',
    database: 'tienda'
});
connection.connect((error) => {
    if (error) {
        console.log("error al conectar");
    }
    else {
        console.log('conectado a mysql');
    }
});
//-----------------------------PRODUCTOS--------------------------------------
server.get('/getProductos', (req, res) => {
    connection.query("SELECT * FROM productos", (req1, resultados) => {
        console.log(resultados);
        //res.send(resultados);
        res.send(resultados);
    });
});
server.get('/getProductosByNombre/:nombre', (req, res) => {
    let nombre = "%" + req.params.nombre + "%";
    //connection.query("SELECT * FROM productos WHERE nombre contains '?'",nombre,(req1:any,resultados:any)=>{
    connection.query("SELECT * FROM productos WHERE nombre LIKE ?", nombre, (req1, resultados) => {
        //console.log(resultados);
        console.log(req1);
        console.log(resultados);
        res.status(201).send(resultados);
    });
});
server.post('/crearProducto', (req, res) => {
    let stock = req.body.stock;
    let calificacion = req.body.calificacion;
    let nombre = req.body.nombre;
    let descripcion = req.body.descripcion;
    let categoria = req.body.categoria;
    console.log(nombre);
    if (calificacion == null || nombre == null || descripcion == null || categoria == null || stock == null) {
        console.log("No se puede insertar, datos no completos");
        res.status(401).send("No se han insertado todos los campos");
    }
    else {
        connection.query("INSERT INTO productos(id,stock,calificacion,nombre,descripcion,categoria)VALUES('" + null + "','" + stock + "','" + calificacion + "','" + nombre + "','" + descripcion + "','" + categoria + "')", (req1, resultados) => {
            //console.log(resultados);
            res.status(201).send(`Producto creado con el id:${resultados.insertId}`);
        });
    }
});
server.delete('/borrarProductoById/:id', (req, res) => {
    let id = req.params.id;
    connection.query('DELETE FROM productos WHERE id=?', id, (res1, resultados) => {
        res.status(200).send("dato eliminado");
    });
});
server.put('/modificarProducto', (req, res) => {
    let id = req.body.id;
    let nombre = req.body.nombre;
    let stock = req.body.stock;
    let calificacion = req.body.calificacion;
    let descripcion = req.body.descripcion;
    let categoria = req.body.categoria;
    console.log(id + nombre);
    connection.query("UPDATE productos SET nombre = '" + nombre + "', stock = '" + stock + "', calificacion = '" + calificacion + "', descripcion = '" + descripcion + "', categoria = '" + categoria + "' WHERE productos.id = '" + id + "'", (req1, resultados) => {
        console.log(resultados);
        res.status(200).send("dato modificado con id:" + resultados.insertId);
    });
});
//--------------------------USUARIOS-----------------------------------------
server.get('/getUsuarios', (req, res) => {
    connection.query("SELECT * FROM usuarios", (req1, resultados) => {
        console.log(resultados);
        res.send(resultados);
    });
});
server.post('/crearUsuario', (req, res) => {
    let email = req.body.email;
    let nombre = req.body.nombre;
    let clave = req.body.clave;
    let region = req.body.region;
    let comuna = req.body.comuna;
    if (email == null || nombre == null || clave == null || region == null || comuna == null) {
        console.log("No se puede insertar, datos no completos");
        res.status(401).send("No se han completado todos los campos");
    }
    else {
        connection.query("INSERT INTO usuarios(email,nombre,clave,region,comuna)VALUES('" + email + "','" + nombre + "','" + clave + "','" + region + "','" + comuna + "')", (req1, resultados) => {
            console.log(resultados);
            if (resultados == undefined) {
                res.status(401).send("correo ya existente");
            }
            else {
                res.status(201).send("usuario creado");
            }
            //res.status(201).send(`Usuario creado con el id:${resultados.insertId}`);
        });
    }
});
server.delete('/borrarUsuarioByEmail/:email', (req, res) => {
    let email = req.params.email;
    connection.query('DELETE FROM usuarios WHERE email=?', email, (res1, resultados) => {
        res.status(200).send("dato eliminado");
    });
});
server.put('/editarUsuario', (req, res) => {
    let email = req.body.email;
    let nombre = req.body.nombre;
    let region = req.body.region;
    let comuna = req.body.comuna;
    console.log(req.body);
    //UPDATE `usuarios` SET `nombre` = 'gato', `region` = 'valparais', `comuna` = 'limach' WHERE `usuarios`.`email` = 'donwea@live.cl';
    connection.query("UPDATE usuarios SET nombre = '" + nombre + "', region = '" + region + "', comuna = '" + comuna + "' WHERE usuarios.email = '" + email + "'", (req1, resultados) => {
        console.log(resultados);
        res.status(200).send(resultados);
    });
});
