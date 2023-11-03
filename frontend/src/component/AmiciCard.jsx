import React, {useEffect, useState} from "react";
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Typography from '@mui/material/Typography';
import Avatars from "./Avatars";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import "../css/AmiciCard.css"

export default function AmiciCard({ amico, setSelectedChat, setSelectedFriend,filteredList,setFilteredList,setUtente,SelectedFriend,OnlinePeople,setMoblieViews }) {
    const [hovered, setHovered] = useState(false);
    // Funzione per gestire la rimozione dell'amico
    useEffect(() => {
        if (SelectedFriend && SelectedFriend._id === amico._id) {
            setHovered(true);
        } else {
            setHovered(false);
        }
    }, [SelectedFriend]);
    const handleDeleteAmico = (event) => {
        event.stopPropagation();
        setSelectedFriend(null)
        fetch(`http://localhost:8080/api/user/deleteFriend/${amico._id}`, {
            method: 'DELETE',
            credentials: 'include',
        })
            .then((response) => {
                if (response.ok) {
                    console.log('Amico rimosso con successo');
                    return response.json()

                } else {
                    console.log('Errore durante la rimozione dell\'amico');

                }
            }).then((data)=>{
            // Rimuovi l'amico dalla lista filtrata e aggiorna lo stato
            const nuovafilteredList=filteredList.filter((el)=>el._id!==amico._id)
            setFilteredList(nuovafilteredList)
            setUtente(data)
        })
            .catch((error) => {
                console.error('Errore durante la richiesta:', error);
            });
    };

    const handleOnClick = () => {
        setSelectedFriend(amico);
        setMoblieViews(false);// impostato a false in modo tale da rendere visibile la chat
        // Esegui la richiesta al server per ottenere la chat con l'amico specifico
        fetch(`http://localhost:8080/api/messages/chat/${amico._id}`, {
            credentials: 'include'
        })
            .then(response => response.json())
            .then(data => {
                if (data.error === "Nessun messaggio trovato") {
                    setSelectedChat([]);
                } else {
                    setSelectedChat(data);
                }
            })
            .catch(error => {
                console.error('Errore nel caricamento della chat:', error);
            });
    };

    const handleMouseLeave = () =>
        SelectedFriend && SelectedFriend._id === amico._id ? setHovered(true): setHovered(false);

    return (
        <>
            <ListItem
                className="amici"
                position= 'relative'
                onClick={handleOnClick}
                alignItems="flex-start"
                sx={{bgcolor: SelectedFriend && SelectedFriend._id === amico._id ? '#c5dfff' : 'none',
                }}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={handleMouseLeave}
            >
                <ListItemAvatar>
                    {/* Componente per l'avatar dell'amico, se l amico è nel vettore OnlinePeople isOnline è settato true, l'amico è online viceversa false */}
                    <Avatars isOnline={OnlinePeople.some((el) => el.userId === amico._id) ? true : false} Username={amico.username} />
                </ListItemAvatar>
                <ListItemText
                    primary={amico.username}
                    sx={{
                        color: "#00b3d6",
                        width: "100%",
                    }}
                    secondary={
                         <>
                            <Typography class='email'
                                variant="body2"
                                color="text.primary"
                            >
                                {amico.email}

                            </Typography>

                        </>

                    }
                />
                {/* Mostra l'icona di eliminazione solo quando il cursore è sopra l'amico */}
                {hovered && (
                    <Box sx={{ position: 'absolute', right: '10px', bottom: '13px' }}>
                        <IconButton
                            aria-label="Elimina amico"
                            onClick={handleDeleteAmico}
                        >
                            <DeleteIcon />
                        </IconButton>
                    </Box>
                )}
            </ListItem>
            <Divider variant="inset" component="li" />
        </>
    )
}


