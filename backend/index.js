const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const LocalStrategy = require('passport-local');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const User = require('./models/users');
const routes = require('./routes/api');


const app = express();
mongoose.connect("mongodb+srv://Domenico:D8q3IK5bpswRH6uR@cluster0.lfes0kv.mongodb.net/?retryWrites=true&w=majority");
const db = mongoose.connection;
db.once('open', () => {
    console.log('Connesso al Db');
    app.listen(8080, () => {
        console.log('App in ascolto');
    });
});
// Creazione del session store per memorizzare le sessioni utente
const sessionStore = MongoStore.create({
    mongoUrl: 'mongodb+srv://Domenico:D8q3IK5bpswRH6uR@cluster0.lfes0kv.mongodb.net/?retryWrites=true&w=majority',
    collectionName: 'sessions',
});

app.use(cors({
    origin: "http://localhost:3000",
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD","DELETE"],
    credentials: true
}));

app.use(express.json());
app.use(session({
    secret: 'secret_passcode',          // Chiave segreta utilizzata per firmare la sessione (può essere una stringa casuale)
    resave: false,                      // Impedisce il salvataggio della sessione se non sono stati apportati cambiamenti
    saveUninitialized: false,           // Impedisce di salvare una sessione vuota, viene creata solo se necessario
    store: sessionStore,                // Store per memorizzare le sessioni (utilizza il session store creato in precedenza)
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,
        secure: false,
        httpOnly: true,
    },
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use('/api', routes);

