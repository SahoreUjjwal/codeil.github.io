module.exports.chatSockets = function(socketServer){
    let io = require('socket.io')(socketServer);
    io.sockets.on('çonnection',function(socket){
        console.log('new connection received',socket.id);
        socket.on('disconnect', function(){
            console.log('Socket disconnected!');
        })
        
        socket.on('join_room',function(data){
            console.log('joining request received.',data);
            socket.join(data.chatRoom);


            io.in(data.charRoom).emit('user_joined',data);
        })
    })



}