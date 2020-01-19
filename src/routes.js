const { Router } = require('express');

const DevController = require('./controlers/DevController');
const SearchController = require('./controlers/SearchController');

const routes = Router();

// Métodos HTTP: GET, POST, PUT, DELETE

// Query Params: request.query (Filtros, ordenação, paginação, ...)
// Route Params: request.params (Identificar um recurso na alteração ou remoção)
// Body

/*
routes.get('/', (request, response) => {
    console.log(request.query);
    return response.json({ message: 'Olá mundo!'});
});
  
routes.get('/users/', (request, response) => {
    console.log(request.query);
    return response.json({ message: 'Lista usuários'});
});
  
routes.get('/', (request, response) => {
  console.log(request.query);
  return response.json({ message: 'Busca usuário ' + request.query.search});
});

routes.delete('/users/:id', (request, response) => {
  console.log(request.params);
  return response.json({ message: 'Deleta usuário ' + request.params.id});
});

routes.post('/users/', (request, response) => {
    console.log(request.body);
    return response.json({ message: 'Cadastra usuário ' + request.body.nome + " (" + request.body.email + ')'});
});
*/

routes.get('/devs', DevController.index);
routes.post('/devs', DevController.store);
routes.put('/devs', DevController.update);
routes.delete('/devs', DevController.destroy);

routes.get('/search', SearchController.index);

module.exports = routes;
