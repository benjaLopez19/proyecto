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
server.set('token',config.token);

server.listen(port,()=>{
    console.log("Server listening on: http://localhost:" + port);
});

//-----------------------------BASE DE DATOS---------------------------------
let connection = mysql.createConnection({
    host    : 'localhost',
    user    : 'root',
    port    : 3306,
    password: '',
    database: 'tienda'
});

connection.connect((error:any)=>{
    if(error){
        console.log("error al conectar");
    }else{
    console.log('conectado a mysql');
    }
});

//---------------------------access-control-----------------------------------
//server.use(cors);
server.use(function(req:any, res:any, next:any) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//----------------------------JWT--VERIFY-------------------------------------

const rutasSegura = express.Router(); 
rutasSegura.use((req:any, res:any, next:any) => {
    const token = req.headers['access-token'];
    if (token) {
      jwt.verify(token, server.get('token'), (err:any, decoded:any) => {      
        if (err) {
            return res.json({ mensaje: 'Token inválida' });    
        } else {
          req.decoded = decoded;    
          req.authentificated= true;
          next();
        }
      });
    } else {
    res.send({ 
        mensaje: 'Token no proveída.' 
    });
    }
 });

//-----------------------------PRODUCTOS--------------------------------------

server.get('/getProductos',(req:any,res:any)=>{
    connection.query("SELECT * FROM productos",(req1:any,resultados:any)=>{
        //res.send(resultados);
        res.status(201).send(resultados);
    });
});

server.get('/getProductosByNombre/:nombre',(req:any,res:any)=>{
    if(req.params.nombre === "NoUnObjeto"){
        res.send({"message":"Introduzca busqueda"});
        return;
    }else if(req.params.nombre === "undefined"){
        console.log("entro if undefined");
        res.send({"message":"Introduzca busqueda"});
        return;
    }
    let nombre="%"+req.params.nombre+"%";
    //connection.query("SELECT * FROM productos WHERE nombre contains '?'",nombre,(req1:any,resultados:any)=>{
    connection.query("SELECT * FROM productos WHERE nombre LIKE ?",nombre,(req1:any,resultados:any)=>{
        if(resultados.toString()===""){
            res.send({"message":"Busqueda sin resultados"});
            return;
        }
        res.status(201).send(resultados);
    });
});

server.post('/crearProducto',rutasSegura,(req:any,res:any)=>{
    let stock = req.body.stock;
    let calificacion = req.body.calificacion;
    let nombre=req.body.nombre;
    let descripcion = req.body.descripcion;
    let categoria = req.body.categoria;
    let precio = req.body.precio;
    let imagen = req.body.imagen;
 
    console.log(nombre);
    if(calificacion==null || nombre==null || descripcion==null || categoria==null || stock==null || precio ==null){
        console.log("No se puede insertar, datos no completos");
        res.status(401).send("No se han insertado todos los campos");
    }else{

        connection.query("INSERT INTO productos(id,stock,calificacion,nombre,descripcion,categoria,precio,imagen)VALUES('"+null+"','"+stock+"','"+calificacion+"','"+nombre+"','"+descripcion+"','"+categoria+"','"+precio+"','"+imagen+"')",(req1:any,resultados:any)=>{
            //console.log(resultados);
            res.status(201).send(`Producto creado con el id:${resultados.insertId}`);
        });
    }
});

server.delete('/borrarProductoById/:id', (req:any,res:any)=>{
    let id = req.params.id;
    connection.query('DELETE FROM productos WHERE id=?',id,(res1:any,resultados:any)=>{
        res.status(200).send("dato eliminado");
    });
});

server.put('/modificarProducto',(req:any,res:any)=>{
    let id=req.body.id;
    let nombre = req.body.nombre;
    let stock = req.body.stock;
    let calificacion = req.body.calificacion;
    let descripcion = req.body.descripcion;
    let categoria = req.body.categoria;
    let precio = req.body.precio;

    console.log(id + nombre);

    connection.query("UPDATE productos SET nombre = '"+nombre+"', stock = '"+stock+"', calificacion = '"+calificacion+"', descripcion = '"+descripcion+"', categoria = '"+categoria+"', precio = '"+precio+"' WHERE productos.id = '"+id+"'",(req1:any,resultados:any)=>{
        console.log(resultados);
        res.status(200).send("dato modificado con id:"+resultados.insertId);
    });
});

//--------------------------USUARIOS-----------------------------------------

server.get('/getUsuarios',(req:any,res:any)=>{
    connection.query("SELECT * FROM usuarios",(req1:any,resultados:any)=>{
        console.log(resultados);
        res.send(resultados);
    });
});

server.post('/crearUsuario',(req:any,res:any)=>{
    let nombre = req.body.nombre;
    let apellido = req.body.apellido;
    let rut = req.body.rut;
    let email = req.body.email;
    let clave=req.body.clave;
    let direccion = req.body.direccion;
    let region = req.body.region;
    let comuna = req.body.comuna;
 
    connection.query("INSERT INTO usuarios(email,nombre,apellido,clave,region,comuna,rut,direccion)VALUES('"+email+"','"+nombre+"','"+apellido+"',MD5('"+clave+"'),'"+region+"','"+comuna+"','"+rut+"','"+direccion+"')",(req1:any,resultados:any)=>{
        console.log(resultados);
        if(resultados == undefined){
            res.status(401).send({"message":"ERROR, email ya existente?"});
        }else{
              res.status(201).send({"message":"usuarioCreado"});
        }
           //res.status(201).send(`Usuario creado con el id:${resultados.insertId}`);
    });    
});

server.delete('/borrarUsuarioByEmail/:email', (req:any,res:any)=>{
    let email = req.params.email;
    connection.query('DELETE FROM usuarios WHERE email=?',email,(res1:any,resultados:any)=>{
        res.status(200).send("dato eliminado");
    });
});

server.put('/editarUsuario', (req:any,res:any)=>{
    let email  = req.body.email;
    let nombre = req.body.nombre;
    let region = req.body.region;
    let comuna = req.body.comuna;
    let rut = req.body.rut;
    console.log(req.body);
    //UPDATE `usuarios` SET `nombre` = 'gato', `region` = 'valparais', `comuna` = 'limach' WHERE `usuarios`.`email` = 'donwea@live.cl';
    connection.query("UPDATE usuarios SET nombre = '"+nombre+"', region = '"+region+"', comuna = '"+comuna+"', rut = '"+rut+"' WHERE usuarios.email = '"+email+"'", (req1:any,resultados:any)=>{
        console.log(resultados);
        res.status(200).send(resultados);
    });
});

server.post('/inicioSesion', (req:any,res:any)=>{
    let email = req.body.email;
    let clave = req.body.clave;
    console.log(req.body);
    
    connection.query("SELECT * FROM usuarios where email=? and clave=md5(?)",[email,clave],(error:any,resultados:any,fields:any)=>{
        if(resultados.length == 0){
            res.json({ mensaje: "Usuario o contraseña incorrectos"});
        }else{
            let admin = resultados[0]["admin"];
            const payload = {
                check:  true
            };
            const token = jwt.sign(payload, server.get('token')/*, {
                expiresIn: 1440
            }*/);
            
            res.json({
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

server.get('/getCategorias',(req:any,res:any)=>{
    connection.query("SELECT * FROM categoria",(req1:any,resultados:any)=>{
        res.send(resultados);
    });
});

server.post('/crearCategoria',(req:any,res:any)=>{
    let nombre = req.body.nombre;

    connection.query("INSERT INTO categoria(id,nombre)VALUES('"+null+"','"+nombre+"')",(req1:any,resultados:any)=>{
        res.status(200).send(resultados);
    });
});

server.put('/editarCategoria',(req:any,res:any)=>{
    let id = req.body.id;
    let nombre = req.body.nombre;

    connection.query("UPDATE categoria SET nombre=? WHERE id=?",[nombre,id],(req1:any,resultados:any)=>{
        res.send(resultados);
    });
});

server.delete('/borrarCategoria',(req:any,res:any)=>{
    let id = req.body.id;

    connection.query("DELETE FROM categoria WHERE id=?",id,(req1:any,resultados:any)=>{
        res.send(resultados);
    });
});

//-------------------------------comentario-------------------------------

server.get('/getComentarios',(req:any,res:any)=>{
    connection.query("SELECT * FROM comentario",(req1:any,resultados:any)=>{
        res.send(resultados);
    });
});

server.get('/getComentariosByProduct',(req:any,res:any)=>{
    let producto = req.body.prodKey;
    connection.query("SELECT contenido,nombreUsuario FROM comentario WHERE productoKey=?",producto,(req1:any,resultado:any)=>{
        console.log(resultado);
        res.send(resultado);
    });
});

server.post('/crearComentario',(req:any,res:any)=>{
    let productoKey = req.body.productoKey;
    let usuarioKey = req.body.usuarioKey;
    let contenido = req.body.contenido;
    let nombre = req.body.nombreUsuario;

    console.log(req.body);
    connection.query("INSERT INTO comentario(productoKey,usuarioKey,contenido,nombreUsuario)VALUES('"+productoKey+"','"+usuarioKey+"','"+contenido+"','"+nombre+"')",(req1:any,resultados:any)=>{
        console.log(resultados)
        res.send(resultados);  
    });
});

server.delete('/borrarComentario',(req:any,res:any)=>{
    let id = req.body.id;

    connection.query("DELETE FROM comentario WHERE id=?",id,(req1:any,resultados:any)=>{
        console.log(resultados);
        res.send(resultados);
    });
});

//---------------PEDIDOS-------------------
server.get('/getPedidos',(req:any,res:any)=>{
    connection.query("SELECT * FROM pedidos",(req1:any,resultados:any)=>{
        console.log(resultados);
        let aux = resultados;
        console.log(aux[0].idProductos);
        res.send(resultados);
    });
});

server.post('/generarPedido',(req:any,res:any)=>{
    let idProductos = req.body.productos;
    let idUsuario = req.body.usuario;
    connection.query("INSERT INTO pedidos(idProductos,idUsuario)VALUES('"+idProductos+"','"+idUsuario+"')",(req1:any,resultados:any)=>{
        res.send(resultados);
    });
});




