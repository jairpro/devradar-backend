const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');
const parse2dsphereAsLocation = require('../utils/parse2dsphereAsLocation');
const { findConnections, sendMessage } = require('../websocket');
//const { REACT_URL } = require('../.env.json');

// controlers tem 5 funções no máximo:
// index (mostrar uma lista),
// show (mostrar um único),
// store (criar),
// update (alterar),
// destroy (deletar)

module.exports = {
  async index(request, response) {
    response.setHeader("Access-Control-Allow-Origin", "*");
    //response.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
    //response.setHeader('Access-Control-Allow-Origin', REACT_URL);

    const devs = await Dev.find();

    return response.json(devs.reverse());
  },

  async store(request, response) {
    response.setHeader("Access-Control-Allow-Origin", "*");

    //console.log(request.body);
    const { github_username, techs, latitude, longitude } = request.body;

    let dev = await Dev.findOne({ github_username });

    if (!dev) {
      const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
  
      const { name = login, avatar_url, bio } = apiResponse.data;
  
      /*let { name, avatar_url, bio } = api.apiResponse.data;
      if (!name) {
        name = apiResponse.data.login;
      }*/
  
      const techsArray = parseStringAsArray(techs);
  
      const location = {
        type: 'Point',
        coordinates: [longitude, latitude],
      };
  
      dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: techsArray,    
        location,
      })
  
      // Filtrar as conexões que estão há no máximo 10km de distância
      // e que o novo dev tenha pelo menos uma das tecnologias filtradas

      const sendSocketMessageTo = findConnections(
        { latitude, longitude },
        techsArray,
      )
            
      //console.log('sendSocketMessageTo:');
      //console.log(sendSocketMessageTo);
      sendMessage(sendSocketMessageTo, 'new-dev', dev);

      //console.log(apiResponse.data);
      //console.log(name, avatar_url, bio, github_username);
  
      //return response.json({ message: 'Cadastra usuário ' + request.body.nome + " (" + request.body.email + ')'});
    }

    return response.json(dev);
  },

  async update(request, response) {
    response.setHeader("Access-Control-Allow-Origin", "*");

    // name, avatar, bio, localization, techs
    const {github_username} = request.body;
    
    let dev = await Dev.findOne({ github_username });

    let campos = {};
    if (request.body.techs!==undefined) {
      campos.techs = parseStringAsArray(request.body.techs);
    }
    let latitude = dev.location.coordinates[1];
    if (request.body.latitude!==undefined) {
      latitude = request.body.latitude;
    }
    let longitude = dev.location.coordinates[0];
    if (request.body.longitude!==undefined) {
      longitude = request.body.longitude;
    }
    campos.location = parse2dsphereAsLocation(latitude, longitude);
    if (request.body.avatar_url!==undefined) {
      campos.avatar_url = request.body.avatar_url;
    }
    if (request.body.bio!==undefined) {
      campos.bio = request.body.bio;
    }
    if (request.body.name!==undefined) {
      campos.name = request.body.name;
    }

    dev = await Dev.findOneAndUpdate({ github_username }, campos);

    if (dev) {
      dev = await Dev.findOne({ github_username });
    }
    let ok = dev!==null;

    return response.json({ ok: ok, dev });
  },

  async destroy(request, response) {
    response.setHeader("Access-Control-Allow-Origin", "*");
    const { github_username } = request.body;

    let dev = await Dev.findOne({ github_username });

    let r = null;
    if (dev) {
      r = await Dev.deleteMany(dev);
    }
    return response.json({ ok: r!==null && r.ok===1 });
  },

};