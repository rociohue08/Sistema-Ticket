    const express = require('express');
   const http = require('http');
   const socketIo = require('socket.io');
   
   const app = express();
   const server = http.createServer(app);
   const io = socketIo(server);
   
   app.use(express.static('public'));

   
   let ticketActual = 1;
   const ultimosTickets = [];
   const MAX_ULTIMOS_TICKETS = 3;
   
   io.on('connection', (socket) => {
       console.log('Nuevo cliente conectado');
   
       socket.on('solicitarNuevoTicket', () => {
           const nuevoTicket = `Ticket ${ticketActual}`;
           ultimosTickets.push(nuevoTicket);
           if (ultimosTickets.length > MAX_ULTIMOS_TICKETS) {
               ultimosTickets.shift();
           }
   
           io.emit('ticketLlamado', nuevoTicket);
           io.emit('ultimosTickets', ultimosTickets);
           io.emit('estadisticas', ` ${ticketActual}`);
   
           ticketActual++;
       });
   
       socket.on('disconnect', () => {
           console.log('Cliente desconectado');
       });
   });
   
   const PORT = process.env.PORT || 3000;
   server.listen(PORT, () => {
       console.log(`Servidor corriendo en http://localhost:${PORT}`);
   });
   

