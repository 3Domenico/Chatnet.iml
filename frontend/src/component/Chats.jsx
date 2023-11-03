import React, {useEffect, useState} from "react";
import Picker from '@emoji-mart/react'

import {
    Box,
    TextField,
    Typography,
    Grid,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import TagFacesIcon from '@mui/icons-material/TagFaces';
import "../css/Chats.css"
import Message from "./Message";

import IconButton from "@mui/material/IconButton";



export default function Chats({ SelectedFriend, selectedChat, UtenteId,Username, setSelectedChat,socket,MoblieViews }) {
    const [input, setInput] = useState("");
    const [emojiPickerVisible, setEmojiPickerVisible] = useState(false);
    const [ArrivalMessage, setArrivalMessage]= useState(null)
    const timestamp = new Date();
    useEffect(()=>{
        // Riceve i messaggi dal server tramite socket
        socket?.on('getMessage', data=>{
            setArrivalMessage({
                sender: data.senderId,
                receiver: data.receiverId,
                content: data.content,
                TimestampField: data.timestamp
            })
        })
    },[socket])
    useEffect(() => {
        // Aggiunge il messaggio ricevuto alla chat selezionata
        if (ArrivalMessage && SelectedFriend && SelectedFriend._id === ArrivalMessage.sender) {
            const updatedSelectedChat2 = [...selectedChat, ArrivalMessage];
            setSelectedChat(updatedSelectedChat2);
        }
    }, [ArrivalMessage]);

    const handleEmojiPickerClick = () => {
        setEmojiPickerVisible(!emojiPickerVisible);

    };




    const handleSend = (event) => {
        event.preventDefault();
        //trim rimuove spazi all' inizo e alla fine della stringa di testo
        if (input.trim() !== "") {
            const contenuto = event.target.content.value;
            // Invia il messaggio al server tramite socket
            socket.emit('sendMessage',{
                receiverId:SelectedFriend._id,
                senderId: UtenteId,
                content: contenuto,
                timestamp: timestamp.toLocaleString()
            })
            fetch("http://localhost:8080/api/messages/addNewMessage", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    receiverId: SelectedFriend._id,
                    content: contenuto,
                }),
            })
                .then((response) =>
                    response.json())
                .then((data) => {
                    const updatedSelectedChat = [...selectedChat, data];
                    setSelectedChat(updatedSelectedChat);
                    setInput('');

                })
                .catch((error) => {
                    console.log("Errore nella richiesta: ", error);
                });
        }
    };

    const handleInputChange = (event) => {
        setInput(event.target.value);
    };
    return (
        <Box flex={3} id="ChatsContainer" position='relative' sx={{ borderRadius:{ sm:"0 0 1.5ch", xs: '0 0 2ch  2ch'}, display: { sm: "flex", xs: !MoblieViews ? 'flex': 'none' }}}>

            {SelectedFriend && (
                <>
                    <Box key={SelectedFriend._id} className="MessageContainer" >
                        {selectedChat.length > 0 ? (
                            selectedChat.map((Messaggio, index) => (
                                <React.Fragment key={Messaggio._id}>
                                    {/* Visualizza i messaggi */}
                                    <Message key={Messaggio._id} Username={Username} FriendUsername={SelectedFriend.username} Messaggio={Messaggio} UtenteId={UtenteId} />
                                </React.Fragment>
                            ))
                        ) : (
                            <Typography className="chatvuota">Non essere timido, scrivi il tuo primo messaggio ;)</Typography>
                        )}

                    </Box>

                    <form onSubmit={handleSend} className="tastiera">
                        <Grid container >
                            <Grid item xs={12} >

                                {/* Campo di input per il messaggio */}
                                <TextField
                                    sx={{
                                        borderRadius: "15ch",
                                        bgcolor: "#ffffff",
                                        border: "none",
                                        "& .MuiOutlinedInput-notchedOutline": {
                                            border: "none",
                                        },
                                    }}
                                    size="small"
                                    fullWidth
                                    placeholder="invia un messaggio..."
                                    value={input}
                                    name="content"
                                    onChange={handleInputChange}
                                    InputProps={{
                                        endAdornment: (
                                            <React.Fragment>
                                                {/* Pulsante per aprire/chiudere il selettore emoji */}
                                                <IconButton sx={{display: { md: "flex", xs: 'none' }}} size="small" onClick={handleEmojiPickerClick}>
                                                    <TagFacesIcon />
                                                </IconButton>
                                                <IconButton size="small" type="submit">
                                                    <SendIcon />
                                                </IconButton>
                                            </React.Fragment>
                                        ),
                                    }}
                                />

                            </Grid>

                        </Grid>
                    </form>
                </>
            )}
            {/* Visualizza il selettore emoji */}
            {emojiPickerVisible && (
                <Box position="absolute"  sx={{display: { md: "flex", xs: 'none' }}} bottom='8%' right='1%'>
                    <Picker
                        set="apple"
                        perLine="6"
                        locale="it"
                        onEmojiSelect={(emoji) => {
                            setInput(input + emoji.native);
                        }}
                    />
                </Box>
            )}

        </Box>
    );
}

