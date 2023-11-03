const  express=require('express');
const messagesController= require('../controllers/messages');
const router = express.Router();
const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }else{
        console.log('Utente non autenticato')
    }
}
router.get('/chat/:receiverId', isAuthenticated,messagesController.getChat);
router.post('/addNewMessage', isAuthenticated, messagesController.addMessages);
module.exports=router;