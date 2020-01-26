const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');

const { REACT_URL, CONNECTION_STR, SELF_PORT } = require('./.env.json');
const routes = require('./routes');
const { setupWebsocket } = require('./websocket');

const app = express();
const server = http.Server(app);

setupWebsocket(server);

mongoose.connect(CONNECTION_STR, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
});

// cors libera acesso, pois pois por padrão o nodeJS só permite acesso dele mesmo
// libera acesso apenas para a aplicação reactJS local
//app.use(cors({ origin:  'http://localhost:3000' }));
//app.use(cors({ origin:  'http://localhost:5000' }));
app.use(cors({ origin:  REACT_URL }));
// libera acesso externo para todo tipo de aplicação
//app.use(cors());

app.use(express.json());
app.use(routes);

//app.listen(SELF_PORT);
server.listen(SELF_PORT);
