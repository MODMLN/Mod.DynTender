
import React from "react";
import Styles from './scss/header.module.scss';
import SidebarRight from './Sidebar';
import { Box } from "@mui/material";

export default function Header() {

    return (

        <Box className={Styles.Header} >
            <Box className={Styles.divHeader}>
                <Box><SidebarRight /></Box>
                <Box></Box>
            </Box>
        </Box>
    );
}