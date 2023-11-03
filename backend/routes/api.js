const express = require('express');
const usersRouter= require('./users');
const messagesRouter= require('./messages');
const authenticateRouter= require('./authenticate')
const router=express.Router();

router.use('/user',usersRouter);
router.use('/messages',messagesRouter);
router.use(authenticateRouter);

module.exports=router
