import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import InputPassword from '../component/InputPassword';
import logo111 from '../img/logo111.png';
import { Link, useNavigate} from 'react-router-dom';
import {ThemeProvider} from "@mui/material";
import {Theme} from "../Theme"
import '../css/stileloginreg.css';


export default function Register() {
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault();
        const username = event.target.username.value;
        const email = event.target.email.value;

        fetch('http://localhost:8080/api/user/register', {
            method: 'POST',
                credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password,
            }),
        })
            .then((response) => {
                if (response.ok) {
                    console.log('Registration successful');
                    alert('Registration successful');
                    navigate('/login');
                } else {
                    console.log('Registration failed');
                    return response.json()
                        .then((data) => {
                            if (data.error) {
                                if (data.error === 'Lo username è troppo lungo') {
                                    alert('Lo username è troppo lungo (massimo 14 caratteri)');
                                } else if (data.error.message === 'A user with the given username is already registered') {
                                    alert('Email già in uso');
                                } else {
                                    alert(data.error);
                                }
                            } else {
                                alert('Registration failed');
                            }
                        });
                }
            })
            .catch((error) => {
                console.log('Registration failed:', error);
                alert('Registration failed');
            });

    };

    return (
        //il theme provider serve a renderizzare gli elementi con il tema creato in Theme.js
        <ThemeProvider theme={Theme}>
        <div className="FormContainer">
            <Box component="form" className="Forms" onSubmit={handleSubmit}>
                <img src={logo111} alt="logo" />
                <TextField
                    className="input-Form"
                    size="small"
                    id="Username-input"
                    name="username"
                    label="Username"
                    variant="outlined"
                    required
                />
                <TextField
                    className="input-Form"
                    size="small"
                    id="email-input"
                    name="email"
                    label="Email"
                    variant="outlined"
                    type="email"
                    required
                />
                <InputPassword className="Form" password={password} setPassword={setPassword} />
                <Button className="input-Form" variant="contained" type="submit">
                    Iscriviti
                </Button>
                <Typography variant="h6" component="h2" color="white">
                    Hai un account? <Link className="link" to="/login">Accedi</Link>
                </Typography>
            </Box>
        </div>
            </ThemeProvider>
    );
}
