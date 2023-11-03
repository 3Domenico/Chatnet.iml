const User = require('../models/users');
const passport = require('passport');
const mongoose=require('mongoose')



module.exports= {
    FindUserById: (req, res) => {
        User.findById(req.session.userId)
            .populate('friends')
            .then((user) =>
                user ? res.json(user) : res.status(404).json({ error: 'Friend not found' })
            )
            .catch((error) => {
                console.error('Error finding user:', error);
                res.status(500).json({ error: 'Internal server error' });
            });
    },

    addFriend: (req, res) => {
        const { username } = req.body;
        User.findOne({ username })
            .then(friend => {
                if (!friend) {
                    return res.json({ error: "User not found" });
                }
                User.findById(req.session.userId)
                    .then(user => {
                        if (!user) {
                            return res.json({ error: "User not found" });
                        }
                        if (user.friends.includes(friend._id)) {
                            return res.json({ error: "Friend already added" });
                        }

                        user.friends.push(friend._id);

                        user.save()
                            .then(() => {
                                user.populate("friends")
                                    .then(populatedUser => {
                                        res.json(populatedUser);
                                    })
                                    .catch(() => {
                                        res.json({ error: "Error populating friends" });
                                    });
                            })
                            .catch( ()=> {
                                res.json({ error: "Error adding friend" });
                            });
                    })
                    .catch( ()=> {
                        res.json({ error: "Error finding user" });
                    });
            })
            .catch(() => {
                res.json({ error: "Error finding friend" });
            });
    },


    Login: (req, res) => {
        console.log(req);
        passport.authenticate('local', (err, user, info) => {
            if (err) {
                console.log('Errore durante il login:', err);
                return res.status(500).json({ message: 'Errore durante il login' });
            }
            if (!user) {
                console.log('Login non riuscito:', info.message);
                return res.status(401).json({ message: 'Login non riuscito', info });
            }
            req.login(user, (err) => {
                if (err) {
                    console.log('Errore durante il login:', err);
                    return res.status(500).json({ message: 'Errore durante il login' });
                }
                console.log('Login riuscito', user);
                req.session.userId = user._id;
                return res.status(200).json({ UserId: req.session.userId });
            });
        })(req, res);
    },


    Register: (req, res) => {
        const { email, username, password } = req.body;

        const newUser = new User({ email, username });
        User.register(newUser, password, (err, user) => {
            if (err) {
                console.log('Errore durante la registrazione:', err);
                if (err.message.includes('username') && err.message.includes('duplicate key error')) {
                    return res.status(409).json({ error: 'Username già utilizzato' });
                } else if (err instanceof mongoose.Error.ValidationError && err.message.includes('username')) {
                    return res.status(500).json({ error: 'Lo username è troppo lungo' });
                }

                return res.status(500).json({ error: err });
            }

            console.log('Registrazione riuscita', user);
            return res.status(200).json({ message: 'Registrazione riuscita', user });
        });
    },

    LogOut: (req,res)=>{
        req.session.destroy(function() {
            res.clearCookie('connect.sid');
            res.sendStatus(200);
        });
    },
    removeFriend: (req, res) => {
        const friendId  = req.params.friendId;
        User.findByIdAndUpdate(req.session.userId, {
            $pull: { friends: friendId }
        },{ new: true })
            .populate("friends")
            .then(user=>{
                res.status(200).json(user);})
            .catch((err) => {
                    console.error('Errore durante la rimozione dell\'amico:', err);
                    return res.status(500).json({ error: err.message });

            });
    },

}

