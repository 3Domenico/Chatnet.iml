import React, { useState, useEffect } from 'react';
import Navbar from "../component/Navbar";
import Chatbar from "../component/Chatbar";
import Chats from "../component/Chats";
import {Stack} from "@mui/material";
import { useNavigate } from 'react-router-dom';
import '../css/Home.css';
import ggGif from "../img/gg.gif";
import {io} from "socket.io-client";


export default function Home() {
    const [Utente, setUtente] = useState(null);
    const [SelectedFriend, setSelectedFriend] = useState(null);
    const [selectedChat, setSelectedChat] = useState([]);
    const navigate=useNavigate();
    const  [socket,setSocket]= useState(null);
    const [OnlinePeople, setOnlinePeople]= useState([]);
    const [MoblieViews, setMoblieViews]= useState(false);
    useEffect(()=>{
        // Collega il socket una volta che l'utente è disponibile
        if(Utente){
        setSocket(io("ws://localhost:4000"));}
    },[Utente]);

    useEffect(()=>{
        // Aggiungi l'utente al socket e ricevi l'elenco degli utenti online
        if(socket){
        socket.emit('addUser',Utente._id)
        socket.on('getUsers',userArray=>{
            setOnlinePeople(userArray)
        })

        }
    },[socket]);

    useEffect(() => {
        // Controlla se l'utente è autenticato al caricamento della pagina, se è autenticato restituisce l' oggetto user
        fetch('http://localhost:8080/api/user/findUtente', {
            credentials: 'include'
        })
            .then((userResponse) => userResponse.json())
            .then((userData) => {

                    if (userData.error === 'User not authenticated') {
                        navigate('/login');
                    }else {
                        setUtente(userData);
                    }
            })
            .catch((error) => {
                console.error(error);
                navigate('/login');
            });
    }, []);



    return (
        <div id="HomeContainer">
            {Utente ? (
                <>
                    <Navbar MoblieViews={MoblieViews} setMoblieViews={setMoblieViews}  socket={socket} Utente={Utente}></Navbar>
                    <Stack direction="row" sx={{ height: '80vh' }} spacing={0} justifyContent="space-between" >
                        <Chatbar MoblieViews={MoblieViews} setMoblieViews={setMoblieViews} OnlinePeople={OnlinePeople} SelectedFriend={SelectedFriend} setSelectedFriend={setSelectedFriend} setSelectedChat={setSelectedChat} Amici={Utente.friends}  Utente={Utente} setUtente={setUtente}></Chatbar>
                        <Chats MoblieViews={MoblieViews}   socket={socket} SelectedFriend={SelectedFriend} selectedChat={selectedChat} UtenteId={Utente._id} Username={Utente.username} setSelectedChat={setSelectedChat}></Chats>
                    </Stack>
                </>
            ) : (

                <div className="gif-container">
                    <img src={ggGif} alt="Gif" className="gif" />
                </div>
            )}


        </div>
    );
}