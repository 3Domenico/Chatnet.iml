import React from 'react';
import { Box, Avatar, Paper, Typography } from "@mui/material";
import "../css/Message.css";

export default function Message({ UtenteId, Messaggio,Username,FriendUsername }) {
    // Determina se il messaggio è inviato dall'utente corrente o dall'amico
    const isSender = (UtenteId === Messaggio.sender);
    const timestamp = new Date(Messaggio.TimestampField).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });


    return (
        <Box className='BoxMessage1' sx={{ justifyContent: !isSender ? "flex-start" : "flex-end" }}>
            <Box className='BoxMessage2' sx={{ flexDirection: !isSender ? "row" : "row-reverse" }}>
                <Avatar sx={{ bgcolor: isSender ? "#6eb5ff" : "#5cd9c6" }}>
                    {isSender ? Username.match(/[a-zA-Z]/)?.[0] : FriendUsername.match(/[a-zA-Z]/)?.[0]}
                </Avatar>
                <Paper className="messaggi"
                       variant="outlined"
                       size='small'
                       sx={{
                           maxWidth: { sm:"40vh", xs: '29vh'},
                           p: 0,
                           mb: '1.5ch',
                           ml: !isSender ? 2 : 0,
                           mr: !isSender ? 0 : 2,
                           backgroundColor: isSender ? "#6eb5ff" : "#5cd9c6",
                           borderRadius: !isSender ? "20px 20px 20px 1px" : "20px 20px 1px 20px",
                           overflowWrap: 'break-word', // Spezza la parola prima del limite
                           wordBreak: 'keep-all',
                           display: 'flex',
                           flexDirection: 'column',
                           gap: 0,
                       }}
                >
                    <Typography variant="caption" className="nomeutente"  sx={{ position: "relative", top: '10.5%', lineHeight: "normal", ...(isSender ? { } : { left: '10%' }), fontSize: "0.65rem" ,  fontWeight: 700}}>
                        {/* Mostra il nome utente dell'amico sopra il messaggio se l'utente è il mittente */}
                        {!isSender ? `~${FriendUsername}`: ``}
                    </Typography>
                    <Typography variant="body1" sx={{padding:isSender ? "5% 0 0 5%" : " 0 0 0 5%" }}>{Messaggio.content}</Typography>
                    <Typography   className="MessageTimestamp" display='flex' sx={{  fontSize: "0.5rem", position: "relative", ...(!isSender ? { justifyContent: 'flex-end', right: '10%' } : { left: '8%' })}}>
                        {timestamp}
                    </Typography>
                </Paper>
            </Box>
        </Box>
    );
}
