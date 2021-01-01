module.exports = (io) => {
    let users = {}
    io.of('/test').on('connection', (socket) => {
        console.log('Connected', socket.id);
        socket.on('join', (data) => {
            socket.join(data.room);
            
            users[socket.id] = data;

            io.of('/test').to(data.room).emit('message', `${data.name} joined ${data.room} room!`);
        })
        
        socket.on('disconnect', (data) => {
            io.of('/test').emit('message', 'user disconnected ' + users[socket.id].name);
            delete users[socket.id];
            console.log('Disonnected', socket.id);
        })
    })
}