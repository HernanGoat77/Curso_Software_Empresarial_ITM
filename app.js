const express=require('express');
const app=express();

app.use(express.json());

const bd = require('./repositorio/bd');
bd.conectar();

const puerto = 8080;

require('./rutas/festivo.rutas')(app);

app.listen(puerto, ()=> {
 console.log(`Servicio iniciado a través de la url
http://localhost:${puerto}`)
})