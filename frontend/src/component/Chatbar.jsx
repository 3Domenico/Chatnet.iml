import React, { useState } from "react";
import Box from '@mui/material/Box';
import { TextField, Typography, List, Fab } from "@mui/material";
import AmiciCard from "./AmiciCard";
import Tooltip from '@mui/material/Tooltip';
import AddIcon from '@mui/icons-material/Add';
import "../css/Chats.css"

export default function Chatbar({ Amici,setUtente,setSelectedFriend, setSelectedChat,SelectedFriend,OnlinePeople,MoblieViews,setMoblieViews}) {
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredList, setFilteredList] = useState(Amici);
// Funzione per filtrare la lista degli amici in base alla ricerca
    const filterBySearch = (event) => {
        const query = event.target.value;
        setSearchQuery(query);
        let updatedList = [...Amici];
        updatedList = updatedList.filter((item) => {
            const itemValue = item.username.toLowerCase();
            return itemValue.includes(query.toLowerCase());
        });
        setFilteredList(updatedList);
    };

    // Funzione di gestione dell'evento di click sul pulsante di aggiunta amico
    const handleOnClick = () => {
        const username = searchQuery;
        fetch("http://localhost:8080/api/user/addFriend", {
            method: "POST",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    if (data.error === "User not found") {
                        alert("Utente inesistente");
                    } else if (data.error === "Friend already added") {
                        alert("Amico già aggiunto");
                    } else {
                        console.log("Errore nella richiesta");
                    }
                } else {
                    setFilteredList(data.friends);
                    setUtente(data);
                    setSearchQuery('')
                    alert("Amico aggiunto con successo");
                }
            })
            .catch(error => {
                console.log("Errore nella richiesta: ", error);
            });
    };

    return (
        <Box id="Chatbar"  sx={{ position: 'relative', borderRadius:{ sm:"0 0 0 1.5ch", xs: '0 0 2ch  2ch'}, overflowY: 'auto', pb: '0.17cm', display: { sm: "block", xs: MoblieViews ? 'block': 'none' },  flex: { lg: '1', xs: '2' }}}>
            <Box position="sticky" top={4} zIndex={1}  >
                <TextField
                    id="cercamico"
                    label="Cerca un amico..."
                    variant="filled"
                    value={searchQuery}
                    InputProps={{
                        sx: {
                            "&:before": {
                                borderBottom: "none",
                            },
                            "&:after": {
                                borderBottom: "none",
                            },
                            "& input": {
                                borderRadius: "30px",
                                backgroundColor: "#00b3d6",
                                color: "#ffffff",
                            },
                        },
                        disableUnderline: true,
                    }}

                    onChange={filterBySearch}
                    fullWidth
                />
            </Box>
            {Amici.length > 0 ? (
                <List sx={{ width: '100%' }}>
                    { filteredList.map((amico) => (
                                <AmiciCard setMoblieViews={setMoblieViews} key={amico._id} OnlinePeople={OnlinePeople} setUtente={setUtente} SelectedFriend={SelectedFriend} setFilteredList={setFilteredList} filteredList={filteredList} className="amici" setSelectedFriend={setSelectedFriend} setSelectedChat={setSelectedChat} amico={amico} />
                            )
                    )}
                </List>
            ) : (
                <Typography id="noamici">
                    Non hai amici, tocca l'erba.
                </Typography>
            )}
            {searchQuery && (
                // Verifica se è presente una query di ricerca, sennò il componente non viene renderizzato
                <Box position="absolute" left={'43%'} bottom={"8%"}>
                    <Tooltip placement="top" title="Aggiungi un nuovo amico">
                        <Fab sx={{
                                backgroundColor:"#00b2d4",
                                "&:hover": {
                                bgcolor: "#75e4fa"}}} onClick={handleOnClick}>
                            <AddIcon />
                        </Fab>
                    </Tooltip>
                </Box>
            )}
        </Box>
    )
}
