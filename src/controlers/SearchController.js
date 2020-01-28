const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');
//const { REACT_URL } = require('../.env.json');

module.exports = {
  async index(request, response) {
    response.setHeader("Access-Control-Allow-Origin", "*");
    //response.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
    //response.setHeader('Access-Control-Allow-Origin', REACT_URL);

    const {latitude, longitude, techs} = request.query;

    const techsArray = parseStringAsArray(techs);

    const devs = await Dev.find({
      techs: {
        $in: techsArray,
      },
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [longitude, latitude],
          },
          $maxDistance: 10000,
        },
      },
    });

    //console.log(techsArray);

    //console.log(request.query);
    // Buscar todos os devs num raio de 10km
    // Filtrar por tecnologias
    return response.json({ devs: [devs] })
  }
}