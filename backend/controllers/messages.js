const Messages= require('../models/message');
const User= require('../models/users');
const { ObjectId } = require('mongodb');

module.exports={

    getChat: (req, res) => {
        const userId = req.session.userId;
        const receiverId = new ObjectId(req.params.receiverId);

        Messages.find({
            $or: [
                { sender: userId, receiver: receiverId },
                { sender: receiverId, receiver: userId }
            ]
        })
            .then(messages => {
                if (messages.length > 0) {
                    res.json(messages);
                } else {
                    res.json({ error: "Nessun messaggio trovato" });
                }
            })
            .catch(error => {
                console.error("Errore durante la ricerca dei messaggi:", error);
                res.json({ error: "Errore durante la ricerca dei messaggi" });
            });
    },
    addMessages: (req,res)=>{
        const senderId= req.session.userId;
        Messages.create({
            sender: senderId,
            receiver: req.body.receiverId,
            content: req.body.content,
        }) .then(r =>
            r ? res.json(r) : res.json({"error": "user not found"}))
            .catch(r => res.json({"error": "error"}))

    }
}