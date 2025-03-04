const festivoRepo = require('../repositorio/festivo.repositorio');
const servicioFechas = require('../servicios/servicioFechas');

exports.validarFecha = async (req, res) => {
    const { anio, mes, dia } = req.params;

    // Convertir las fechas a numero
    const añoNum = parseInt(anio);
    const mesNum = parseInt(mes);
    const diaNum = parseInt(dia);

    // Validar fecha
    const fechaValida = new Date(`${añoNum}-${mesNum}-${diaNum}`);
    if (isNaN(fechaValida.getTime()) || mesNum < 1 || mesNum > 12 || diaNum < 1 || diaNum > 31) {
        return res.status(200).send("Fecha no Válida");
    }

    try {
        // Obtenemos los festivos desde la base de datos
        const { festivosFijos, festivosPuente } = await festivoRepo.obtenerFestivos();

    
        if (festivosFijos.some(f => f.dia === diaNum && f.mes === mesNum)) {
            return res.status(200).send("Es Festivo");
        }

        const domingoRamos = servicioFechas.obtenerSemanaSanta(añoNum);
        const domingoPascua = servicioFechas.agregarDias(domingoRamos, 7);
    

        const juevesSanto = servicioFechas.agregarDias(domingoPascua, -3);
        const viernesSanto = servicioFechas.agregarDias(domingoPascua, -2);
        const ascensionSenor =servicioFechas.siguienteLunes(servicioFechas.agregarDias(domingoPascua, 40));
        const corpusChristi = servicioFechas.siguienteLunes(servicioFechas.agregarDias(domingoPascua, 61));
        const sagradoCorazon = servicioFechas.siguienteLunes(servicioFechas.agregarDias(domingoPascua, 68));

        //Verificacmos si la fecha coincide con alguno de los festivos calculados
        if (
            (diaNum === juevesSanto.getDate() && mesNum === juevesSanto.getMonth() + 1) ||
            (diaNum === viernesSanto.getDate() && mesNum === viernesSanto.getMonth() + 1) ||
            (diaNum === ascensionSenor.getDate() && mesNum === ascensionSenor.getMonth() + 1) ||
            (diaNum === corpusChristi.getDate() && mesNum === corpusChristi.getMonth() + 1) ||
            (diaNum === sagradoCorazon.getDate() && mesNum === sagradoCorazon.getMonth() + 1)
        ) {
            return res.status(200).send("Es Festivo");
        }
        for (let f of festivosPuente) {
            let fechaFestivo = new Date(añoNum, f.mes-1, f.dia);
            
            let fechaTrasladada = servicioFechas.siguienteLunes(fechaFestivo);
        
            if (diaNum === fechaTrasladada.getDate() && mesNum === fechaTrasladada.getMonth() + 1) {
                return res.status(200).send("Es Festivo");
            }
        }        
        return res.status(200).send("No Es Festivo");
        
    } catch (error) {
        console.error("Error en la validación:", error);
        return res.status(500).send("Error interno del servidor");
    }
}