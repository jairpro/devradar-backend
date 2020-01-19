const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');

const routes = require('./routes');
const { setupWebsocket } = require('./websocket');

const app = express();
const server = http.Server(app);

setupWebsocket(server);

mongoose.connect('mongodb+srv://jair:tmr3Ogg74mUauVsH@cluster0-6ymuq.mongodb.net/week10?retryWrites=true&w=majority', {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
});

// cors libera acesso, pois pois por padrão o nodeJS só permite acesso dele mesmo
// libera acesso apenas para a aplicação reactJS local
app.use(cors({ origin:  'http://localhost:3000' }));
// libera acesso externo para todo tipo de aplicação
//app.use(cors());

app.use(express.json());
app.use(routes);

//app.listen(3333);
server.listen(3333);
