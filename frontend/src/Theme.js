import {createTheme} from "@mui/material";
//tema creato per il login e register, così da evitare di ripetere ogni volta il css e rendere uguali le pagine
export  const  Theme = createTheme({
    palette:{
        primary:{
            main: "#ffc363",
        },

        text:{primary:"#ffffff",
        secondary:"#fff"},
        otherColor:{
            primary:{
                main: 'black'
            },
        }
    },
})