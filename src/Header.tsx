
import React from "react";
import Styles from './scss/header.module.scss';
import SidebarRight from './Sidebar';
import { Box } from "@mui/material";
import logo from './logo_ministry_of_defense.png'
import UsersDto from "./Global/UsersDto";
import { useTranslation } from "react-multi-lang";

interface IProps {
    Item: UsersDto,
    ScreenSize:any
}

export default function Header({Item,ScreenSize}:IProps) {
    const Translation = useTranslation();
    return (
        <Box style={{backgroundColor:"#FFFFFF"}}>
            <SidebarRight Item={Item} />
            <Box className={Styles.Header} >
                <Box className={Styles.divHeader}>
                    <Box className={Styles.flex}>
                        <Box className={Styles.flex}><Box></Box><Box style={{padding: '8px 0'}}>{Translation('Tender.MENU')} |</Box> </Box>
                        <Box className={Styles.flex}><Box><img src={logo} width="39" height="32" alt="" /></Box><Box style={{padding: '8px 0'}}>משרד הבטחון מכרז דינאמי </Box></Box>
                    </Box>
                    <hr />
                    <Box className={Styles.systemWatch}><Box className={Styles.title}>{Translation('Tender.SYSTEM_CLOCK')}</Box><Box className={Styles.clock}>15:46:34</Box></Box>
                </Box>
               
            </Box>
           
        </Box>
    );
}