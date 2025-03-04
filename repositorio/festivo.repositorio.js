const bd = require('./bd');

const FestivoRepositorio = () => {};

FestivoRepositorio.obtenerFestivos = async () => {
    const basedatos = bd.obtenerBD();
    try {
        const tiposFestivos = await basedatos.collection("tipos").find().toArray();

        let festivosFijos = [];
        let festivosPuente = [];

        for (const tipo of tiposFestivos) {
            if (tipo.tipo === 'Fijo') {
                festivosFijos.push(...tipo.festivos);
            } else if (tipo.tipo === 'Ley de Puente festivo') {
                festivosPuente.push(...tipo.festivos);
            }
        }

        return { festivosFijos, festivosPuente };
    } catch (error) {
        console.error("Error consultando festivos:", error);
        return { festivosFijos: [], festivosPuente: [] };
    }
}

module.exports = FestivoRepositorio;