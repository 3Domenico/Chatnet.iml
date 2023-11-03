const  io = require('socket.io')(4000,{
    cors: {
        origin: 'http://localhost:3000'
    }
});
let users=[];
const addNewUser= (userId,socketId)=>{
    !users.some(user=>userId=== user.userId) &&
        users.push({userId,socketId})

}
const removeUser=(socketId)=>{
    users=users.filter(user=>user.socketId !== socketId);
    // Invia agli utenti rimanenti l'elenco aggiornato degli utenti
    io.emit('getUsers', users);
}
const getUser= (userId)=>{
    return users.find(user=> user.userId === userId);
};
 io.on('connection', (socket)=>{
     console.log('un utente si è connesso');
     socket.on('addUser',userId=>{
         addNewUser(userId,socket.id);
         io.emit('getUsers',users);
     })
     //invia e ricevi messaggi
     socket.on('sendMessage', ({ senderId, receiverId, content, timestamp }) => {
         // Trova l'utente destinatario
         const user = getUser(receiverId);
         user && io.to(user.socketId).emit('getMessage', {
             receiverId,
             senderId,
             content,
             timestamp
         });
     });


     socket.on('disconnect',()=>{
         console.log('un utente si è disconnesso');
         removeUser(socket.id)

     })

 })