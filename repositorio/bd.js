const { MongoClient } = require('mongodb');

const configBD = require('../configuracion/bd.config');

const url = `mongodb://${configBD.SERVIDOR}:${configBD.PUERTO}`;

const cliente = new MongoClient(url);

let basedatos;

module.exports={
    conectar: async () => {
        try {
            await cliente.connect();
            console.log("Se ha establecido conexion a la base de datos");
            basedatos = cliente.db(configBD.BASEDATOS);
            console.log("Base de datos festivos DISPONIBLE");
        } catch (error) {
            console.error("Error conectando a la base de datos", error);
        }
    },
    obtenerBD: ()=> basedatos
}