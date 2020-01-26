# devradar-backend
Semana Omnistack 10 - Devradar Backend

Ajustes:
--------
Para funcionar no servidor web necessitou alterar ./node_modules/rect-dev-utils/webpackHotDevClient.js (linha 60)

57 // Connect to WebpackDevServer via a socket.
58 var connection = new WebSocket(
59  url.format({
60    protocol: window.location.protocol === 'https:' ? 'wss' : 'ws', //    protocol: 'ws',
61    hostname: window.location.hostname,
62    port: window.location.port,
63    // Hardcoded in WebpackDevServer
64    pathname: '/sockjs-node',
65  })
66 );

Pode-se substituir por:
./node_modules.replace/rect-dev-utils/webpackHotDevClient.js
