"use strict";
const express = require("express");
const jwt = require("jsonwebtoken");
//const cors = require("cors");
const config = require("../configs/configs");
const server = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');
const port = 4000;
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.set('token', config.token);
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
//---------------------------access-control-----------------------------------
//server.use(cors);
server.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next();
});
//----------------------------JWT--VERIFY-------------------------------------
const rutasSegura = express.Router();
rutasSegura.use((req, res, next) => {
    const token = req.headers['access-token'];
    if (token) {
        jwt.verify(token, server.get('token'), (err, decoded) => {
            if (err) {
                return res.json({ mensaje: 'Token inválida' });
            }
            else {
                req.decoded = decoded;
                req.authentificated = true;
                next();
            }
        });
    }
    else {
        res.send({
            mensaje: 'Token no proveída.'
        });
    }
});
//-----------------------------PRODUCTOS--------------------------------------
server.get('/getProductos', (req, res) => {
    connection.query("SELECT * FROM productos", (req1, resultados) => {
        //res.send(resultados);
        res.status(201).send(resultados);
    });
});
server.get('/getProductosById/:id', (req, res) => {
    let id = req.params.id;
    connection.query("SELECT * FROM productos where id=?", id, (req1, resultados) => {
        if (resultados.length == 0) {
            res.status(404).send({ "message": "NotFound" });
        }
        else {
            res.status(201).send(resultados);
        }
    });
});
server.get('/getProductosByNombre/:nombre', (req, res) => {
    if (req.params.nombre === "NoUnObjeto") {
        res.send({ "message": "Introduzca busqueda" });
        return;
    }
    else if (req.params.nombre === "undefined") {
        console.log("entro if undefined");
        res.send({ "message": "Introduzca busqueda" });
        return;
    }
    let nombre = "%" + req.params.nombre + "%";
    //connection.query("SELECT * FROM productos WHERE nombre contains '?'",nombre,(req1:any,resultados:any)=>{
    connection.query("SELECT * FROM productos WHERE nombre LIKE ?", nombre, (req1, resultados) => {
        if (resultados.toString() === "") {
            res.send({ "message": "Busqueda sin resultados" });
            return;
        }
        res.status(201).send(resultados);
    });
});
server.post('/crearProducto', rutasSegura, (req, res) => {
    let stock = req.body.stock;
    let calificacion = req.body.calificacion;
    let nombre = req.body.nombre;
    let descripcion = req.body.descripcion;
    let categoria = req.body.categoria;
    let precio = req.body.precio;
    let imagen = req.body.imagen;
    console.log(nombre);
    if (calificacion == null || nombre == null || descripcion == null || categoria == null || stock == null || precio == null) {
        console.log("No se puede insertar, datos no completos");
        res.status(401).send("No se han insertado todos los campos");
    }
    else {
        connection.query("INSERT INTO productos(id,stock,calificacion,nombre,descripcion,categoria,precio,imagen)VALUES('" + null + "','" + stock + "','" + calificacion + "','" + nombre + "','" + descripcion + "','" + categoria + "','" + precio + "','" + imagen + "')", (req1, resultados) => {
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
    let precio = req.body.precio;
    console.log(id + nombre);
    connection.query("UPDATE productos SET nombre = '" + nombre + "', stock = '" + stock + "', calificacion = '" + calificacion + "', descripcion = '" + descripcion + "', categoria = '" + categoria + "', precio = '" + precio + "' WHERE productos.id = '" + id + "'", (req1, resultados) => {
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
    let nombre = req.body.nombre;
    let apellido = req.body.apellido;
    let rut = req.body.rut;
    let email = req.body.email;
    let clave = req.body.clave;
    let direccion = req.body.direccion;
    let region = req.body.region;
    let comuna = req.body.comuna;
    connection.query("INSERT INTO usuarios(email,nombre,apellido,clave,region,comuna,rut,direccion)VALUES('" + email + "','" + nombre + "','" + apellido + "',MD5('" + clave + "'),'" + region + "','" + comuna + "','" + rut + "','" + direccion + "')", (req1, resultados) => {
        console.log(resultados);
        if (resultados == undefined) {
            res.status(401).send({ "message": "ERROR, email ya existente?" });
        }
        else {
            res.status(201).send({ "message": "usuarioCreado" });
        }
        //res.status(201).send(`Usuario creado con el id:${resultados.insertId}`);
    });
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
    let rut = req.body.rut;
    console.log(req.body);
    //UPDATE `usuarios` SET `nombre` = 'gato', `region` = 'valparais', `comuna` = 'limach' WHERE `usuarios`.`email` = 'donwea@live.cl';
    connection.query("UPDATE usuarios SET nombre = '" + nombre + "', region = '" + region + "', comuna = '" + comuna + "', rut = '" + rut + "' WHERE usuarios.email = '" + email + "'", (req1, resultados) => {
        console.log(resultados);
        res.status(200).send(resultados);
    });
});
server.post('/inicioSesion', (req, res) => {
    let email = req.body.email;
    let clave = req.body.clave;
    console.log(req.body);
    connection.query("SELECT * FROM usuarios where email=? and clave=md5(?)", [email, clave], (error, resultados, fields) => {
        if (resultados.length == 0) {
            res.status(404).json({ mensaje: "Usuario o contraseña incorrectos" });
        }
        else {
            let admin = resultados[0]["admin"];
            const payload = {
                check: true
            };
            const token = jwt.sign(payload, server.get('token') /*, {
                expiresIn: 1440
            }*/);
            res.status(201).json({
                mensaje: 'Autenticación correcta',
                token: token,
                admin: admin //devuelve admin para verificar si el usuario que inicia sesion es adminstrador
            });
            //res.send(resultados);
        }
    });
    /*
    //console.log(req.body.usuario+" "+req.body.contrasena);
    if(req.body.usuario === "asfo" && req.body.contrasena === "holamundo") {
        const payload = {
            check:  true
        };
        const token = jwt.sign(payload, server.get('token'), {
            expiresIn: 1440
        });
        res.json({
            mensaje: 'Autenticación correcta',
            token: token
        });
    } else {
        res.json({ mensaje: "Usuario o contraseña incorrectos"})
    } */
});
//---------------CATEGORIA--------------------------
server.get('/getCategorias', (req, res) => {
    connection.query("SELECT * FROM categoria", (req1, resultados) => {
        res.send(resultados);
    });
});
server.post('/crearCategoria', (req, res) => {
    let nombre = req.body.nombre;
    connection.query("INSERT INTO categoria(id,nombre)VALUES('" + null + "','" + nombre + "')", (req1, resultados) => {
        res.status(200).send(resultados);
    });
});
server.put('/editarCategoria', (req, res) => {
    let id = req.body.id;
    let nombre = req.body.nombre;
    connection.query("UPDATE categoria SET nombre=? WHERE id=?", [nombre, id], (req1, resultados) => {
        res.send(resultados);
    });
});
server.delete('/borrarCategoria', (req, res) => {
    let id = req.body.id;
    connection.query("DELETE FROM categoria WHERE id=?", id, (req1, resultados) => {
        res.send(resultados);
    });
});
//-------------------------------comentario-------------------------------
server.get('/getComentarios', (req, res) => {
    connection.query("SELECT * FROM comentario", (req1, resultados) => {
        res.send(resultados);
    });
});
server.get('/getComentariosByProduct', (req, res) => {
    let producto = req.body.prodKey;
    connection.query("SELECT contenido,nombreUsuario FROM comentario WHERE productoKey=?", producto, (req1, resultado) => {
        console.log(resultado);
        res.send(resultado);
    });
});
server.post('/crearComentario', (req, res) => {
    let productoKey = req.body.productoKey;
    let usuarioKey = req.body.usuarioKey;
    let contenido = req.body.contenido;
    let nombre = req.body.nombreUsuario;
    console.log(req.body);
    connection.query("INSERT INTO comentario(productoKey,usuarioKey,contenido,nombreUsuario)VALUES('" + productoKey + "','" + usuarioKey + "','" + contenido + "','" + nombre + "')", (req1, resultados) => {
        console.log(resultados);
        res.send(resultados);
    });
});
server.delete('/borrarComentario', (req, res) => {
    let id = req.body.id;
    connection.query("DELETE FROM comentario WHERE id=?", id, (req1, resultados) => {
        console.log(resultados);
        res.send(resultados);
    });
});
//---------------PEDIDOS-------------------
server.get('/getPedidos', (req, res) => {
    connection.query("SELECT * FROM pedidos", (req1, resultados) => {
        console.log(resultados);
        let aux = resultados;
        console.log(aux[0].idProductos);
        res.send(resultados);
    });
});
server.post('/generarPedido', rutasSegura, (req, res) => {
    let idProductos = req.body.productos;
    let idUsuario = req.body.usuario;
    connection.query("INSERT INTO pedidos(idProductos,idUsuario)VALUES('" + idProductos + "','" + idUsuario + "')", (req1, resultados) => {
        //INSERT INTO `pedidos` (`idPedido`, `idProductos`, `idUsuario`) VALUES (NULL, '[{\"id\":1,\"cantidad\":2},{\"id\":2,\"cantidad\":4}]', 'donwea@live.cl');
        //connection.query("INSERT INTO pedidos(idProductos,idUsuario)VALUES('{\"id\":2,\"cantidad\":2}','1')",(req1:any,resultados:any)=>{
        //{"id":1,"cantidad":2},{"id":2,"cantidad":4}
        if (resultados == undefined) {
            res.status(409).send({ "message": "error" });
        }
        else {
            res.status(201).send(resultados);
        }
    });
});
//------------CALIFICACION-----------------
server.post('/crearCalificacion', rutasSegura, (req, res) => {
    let idProducto = req.body.idProducto;
    let idUsuario = req.body.idUsuario;
    let calificacion = req.body.calificacion;
    connection.query("INSERT INTO calificacion(idUsuario,idProducto,calificacion)VALUES('" + idUsuario + "','" + idProducto + "','" + calificacion + "')", (req1, resultados) => {
        if (resultados == undefined) {
            res.status(409).send({ "mensaje": "Usuario ya califico este producto" });
        }
        res.send(resultados);
    });
});
server.post('/getCalificacionById', (req, res) => {
    let idProducto = req.body.idProducto;
    connection.query("SELECT * FROM calificacion WHERE idProducto='" + idProducto + "'", (req1, resultados) => {
        let aux = 0;
        for (let i = 0; i < resultados.length; i++) {
            aux = aux + resultados[i]["calificacion"];
        }
        aux = aux / (resultados.length);
        res.send({ "calificacion": aux });
    });
});
