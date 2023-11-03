const express = require('express');
const router = express.Router();
// Route per verificare l'autenticazione dell'utente
router.get('/checkAuth', (req, res) => {
    console.log(req.isAuthenticated())
    if (req.isAuthenticated()) {
        // L'utente è autenticato
        res.json({ isAuthenticated: true,
                idUser: req.session.userId});
    } else {
        // L'utente non è autenticato
        res.json({ isAuthenticated: false });
    }
});
 module.exports=router;