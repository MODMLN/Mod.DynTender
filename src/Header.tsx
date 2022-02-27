
import React from "react";
import Styles from './scss/header.module.scss';
import SidebarRight from './Sidebar';
import { Box } from "@mui/material";
import logo from './logo_ministry_of_defense.png'
import UsersDto from "./Global/UsersDto";

interface IProps {
    Item: UsersDto, 
  }

export default function Header({Item}:IProps) {

    return (
        <Box style={{backgroundColor:"#FFFFFF"}}>
            <SidebarRight />
            <Box className={Styles.Header} >
                <Box className={Styles.divHeader}>
                    <Box className={Styles.flex}>
                        <Box className={Styles.flex}><Box></Box><Box style={{padding: '8px 0'}}>תפריט |</Box> </Box>
                        <Box className={Styles.flex}><Box><img src={logo} width="39" height="32" alt="" /></Box><Box style={{padding: '8px 0'}}>משרד הבטחון מכרז דינאמי </Box></Box>
                    </Box>
                    <hr />
                </Box>
               
            </Box>
           
        </Box>
    );
}