import React, { useEffect, useState } from 'react';
import { TextField, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import logo111 from '../img/logo111.png';
import InputPassword from '../component/InputPassword';
import { Link, useNavigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { Theme } from '../Theme';
import '../css/stileloginreg.css';


export default function Login() {
    const [password, setPassword] = useState(null);
    const navigate = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault();
        const email = event.target.email.value;

        fetch('http://localhost:8080/api/user/login', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: email,
                password: password,
            }),
        })
            .then((response) => {
                if (response.ok) {
                    console.log('Login successful');
                    alert('Login successful');
                    navigate('/home');
                } else {
                    console.log('Login failed');
                    alert('Login failed');
                }
            })
            .catch((error) => {
                console.log('Login failed:', error);
                alert('Login failed');
            });
    };

    useEffect(() => {
        // Controlla se l'utente è autenticato al caricamento della pagina
        fetch('http://localhost:8080/api/checkAuth', { credentials: 'include' })
            .then((authResponse) => authResponse.json())
            .then((authData) => {
                if (authData.isAuthenticated) {
                    // L'utente è già autenticato, reindirizza alla pagina home
                    navigate('/home');
                }
            })
            .catch((err) => {
                console.log(err)
            });
    }, []);
    return(
        //il theme provider serve a renderizzare gli elementi con il tema creato in Theme.js
        <ThemeProvider theme={Theme}>
            <div className="FormContainer">
                <Box component="form" className="Forms" onSubmit={handleSubmit}>
                    <img src={logo111} alt="logo chatnet" />
                    <TextField
                        className="input-Form"
                        id="email-input"
                        name="email"
                        label="Email"
                        size="small"
                        variant="outlined"
                        type="email"
                        required
                    />
                    <InputPassword className="Form" password={password} setPassword={setPassword} name="password" />
                    <Button className="input-Form" variant="contained" type="submit">
                        Accedi
                    </Button>
                    <Typography variant="h6" component="h2" color="white">
                        Non hai un account? <Link className="link" to="/register">Registrati</Link>
                    </Typography>
                </Box>
            </div>
        </ThemeProvider>
    );


};
