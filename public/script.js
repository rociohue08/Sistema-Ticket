// Conectar al servidor Socket.io
const socket = io();

// Elementos del DOM
const ticketLlamadoElemento = document.getElementById('ticket-llamado');
const ultimosTicketsElemento = document.getElementById('ultimos-tickets');
const estadisticasElemento = document.getElementById('estadisticas');
const btnSolicitarTicket = document.getElementById('btn-solicitar-ticket');

// Cargar el sonido
const ticketSound = new Audio('sonido-turno.mp3');

// Evento del botón para solicitar un nuevo ticket
btnSolicitarTicket.addEventListener('click', () => {
    // Enviar solicitud al servidor
    socket.emit('solicitarNuevoTicket');
});

// Eventos desde el servidor
socket.on('ticketLlamado', (ticket) => {
    // Actualizar el ticket llamado en la interfaz
    ticketLlamadoElemento.textContent = ticket;
    // Reproducir el sonido
    ticketSound.play();
});

socket.on('ultimosTickets', (ultimosTickets) => {
    // Limpiar la lista de últimos tickets
    ultimosTicketsElemento.innerHTML = '';

    // Mostrar los últimos 3 tickets en la interfaz
    ultimosTickets.slice(-3).forEach((ticket) => {
        const li = document.createElement('li');
        li.textContent = ticket;
        ultimosTicketsElemento.appendChild(li);
    });
});

socket.on('estadisticas', (estadisticas) => {
    // Mostrar estadísticas de tickets atendidos por día en la interfaz
    estadisticasElemento.textContent = estadisticas;
});
