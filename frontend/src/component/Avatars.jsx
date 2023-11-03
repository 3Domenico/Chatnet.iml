import React from "react";
import {Avatar, Badge, styled} from "@mui/material";

export default function Avatars({ Username, isOnline }) {
    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
            backgroundColor: '#44b700',
            color: '#44b700',
            boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
            '&::after': {
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                animation: 'ripple 1.2s infinite ease-in-out',
                border: '1px solid currentColor',
                content: '""',
            },
        },
        '@keyframes ripple': {
            '0%': {
                transform: 'scale(.8)',
                opacity: 1,
            },
            '100%': {
                transform: 'scale(2.4)',
                opacity: 0,
            },
        },
    }));

    return (
        <>
            {isOnline ? (
                // Avatar renderizzato se l amico è Online
                <StyledBadge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    variant="dot"
                >
                    <Avatar sx={{ width: 48, height: 48, bgcolor: ' #00b3d6;' }}>
                        {Username.match(/[a-zA-Z]/)?.[0]}
                    </Avatar>
                </StyledBadge>
            ) : (
                <Avatar sx={{ width: 48, height: 48, bgcolor: ' #00b3d6;' }}>
                    {Username.match(/[a-zA-Z]/)?.[0]}
                </Avatar>
            )}
        </>
    );
}
