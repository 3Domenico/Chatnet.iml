import MenuIcon from '@mui/icons-material/Menu';
import {
    AppBar,
    Avatar,
    Box,
    styled,
    Toolbar,
    Typography,
} from "@mui/material";
import React from "react";
import LogoutIcon from '@mui/icons-material/Logout';
import IconButton from "@mui/material/IconButton";
import {useNavigate} from "react-router-dom";
import "../css/Home.css"
import avatarIcon from '../img/icons8-avatar-64.png';

const StyledToolbar = styled(Toolbar)(() => ({

    borderRadius: "1.5ch",
    display: "flex",
    justifyContent: "space-between",
}));

const Icons = styled(Box)(({theme}) => ({
    display: "none",
    alignItems: "center",
    gap: "20px",
        [theme.breakpoints.up("sm")]: {
    display: "flex",
    },
}));

export default function Navbar({Utente,socket,MoblieViews,setMoblieViews}) {
    const navigate = useNavigate();

    const handleonWifiClick= ()=>{
        setMoblieViews(!MoblieViews);
    }
    const handleonClick= ()=>{
      socket?.disconnect();// Disconnette il socket se è presente
        fetch('http://localhost:8080/api/user/logout', {
            credentials: 'include'
        }).then((response) => {
            if (response.ok) {
                console.log('Login out successful');
                navigate('/login');
            } else {
                console.log('Login out failed');
            }
        })

    }
    return (
        <AppBar position="sticky" sx={{ width: '100%', borderRadius: "9px 9px 0px 0px"}}>
            <StyledToolbar>
                <Typography variant="h6" id="logotesto" sx={{ display: { xs: "none", sm: "block"} }}>
                  CHATNET
                </Typography>
               <IconButton onClick={handleonWifiClick}> <MenuIcon sx={{ color:"#ffffff", display: { xs: "block", sm: "none" } }} /></IconButton>
                <Icons sx={{fontWeight:"500",display: { xs: "flex"}}} >
                    {Utente.username}
                    <Avatar sx={{ display: { xs: "none", sm: "block"} }} src={avatarIcon} alt={Utente.username.match(/[a-zA-Z]/)}>
                    </Avatar>
                    <IconButton className="logout" onClick={handleonClick} sx={{ bgcolor:"#b21200", color:"white", '&:hover': { backgroundColor: '#7e0c00',  }}}><LogoutIcon></LogoutIcon></IconButton>
                </Icons>
            </StyledToolbar>
        </AppBar>
    );
}