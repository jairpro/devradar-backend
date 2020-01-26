# devradar-backend
Semana Omnistack 10 - Devradar Backend

Ajustes:
--------
Para funcionar no servidor web necessitou alterar ./node_modules/react-dev-utils/webpackHotDevClient.js (linha 60)

substituir:
protocol: 'ws',"

por:
protocol: window.location.protocol === 'https:' ? 'wss' : 'ws',

// Connect to WebpackDevServer via a socket.
var connection = new WebSocket(
   url.format({
   protocol: window.location.protocol === 'https:' ? 'wss' : 'ws', //    protocol: 'ws', // <---
   hostname: window.location.hostname,
   port: window.location.port,
   // Hardcoded in WebpackDevServer
   pathname: '/sockjs-node',
 })
);

Ou, se o restante do conteúdo do arquivo ainda for o mesmo, pode-se substituir o arquivo:
./node_modules/react-dev-utils/webpackHotDevClient.js

por:
./node_modules.replace/recat-dev-utils/webpackHotDevClient.js
