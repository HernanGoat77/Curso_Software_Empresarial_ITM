module.exports = (app) => {
    const controlFestivo = require('../controladores/festivo.controlador');

    app.get("/festivo/verificar/:anio/:mes/:dia", controlFestivo.validarFecha);
}

