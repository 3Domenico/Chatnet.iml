const express = require('express');
const usersController = require('../controllers/users')
const router = express.Router();
const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }else{
        console.log('Utente non autenticato')
        return res.json({ error: "User not authenticated" });

    }
}
router.post('/register',usersController.Register);
router.post('/login',usersController.Login);
router.post('/addFriend',isAuthenticated,usersController.addFriend)
router.get('/findUtente',isAuthenticated,usersController.FindUserById);
router.get('/logout',usersController.LogOut);
router.delete('/deleteFriend/:friendId',isAuthenticated,usersController.removeFriend)
module.exports=router;