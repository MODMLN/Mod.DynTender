
import React from "react";
import Styles from './scss/header.module.scss';
import SidebarRight from './Sidebar';
import { Box } from "@mui/material";

export default function Header() {

    return (
        <Box style={{backgroundColor:"#FFFFFF"}}>
            <Box className={Styles.Header} >
                <Box className={Styles.divHeader}>
               
                    <Box>
                        <Box><SidebarRight /></Box>
                        <Box></Box>
                        
                    </Box>
                    <Box className={Styles.line}></Box>
                </Box>
               
            </Box>
        </Box>
    );
}