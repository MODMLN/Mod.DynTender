
import React from "react";
import Styles from './scss/header.module.scss';
import SidebarRight from './Sidebar';
import { Box ,Grid} from "@mui/material";
import logo from './logo_ministry_of_defense.png'
import UsersDto from "./Global/UsersDto";
import LastPropositionsDto from './features/Tender/Dtos/LastPropositionsDto';
import { useTranslation } from "react-multi-lang";
import { BrowserView, MobileView } from 'react-device-detect';
interface IProps {
    User: UsersDto,
    LastPropositionsDto:LastPropositionsDto,
    TenderName:any
}

export default function Header({User,LastPropositionsDto,TenderName}:IProps) {
    const Translation = useTranslation();
    return (
        <Box className={Styles.Container}  style={{backgroundColor:"#FFFFFF"}}>
            <SidebarRight User={User} />
            <Grid className={Styles.Header} >
                <Grid className={Styles.divHeader}>
                    <Grid className={Styles.flex}>
                        <Box className={Styles.flex}><Box></Box><Box style={{padding: '8px 0'}}>{Translation('Tender.MENU')} |</Box> </Box>
                        <Box className={Styles.flex}><Box><img src={logo} width="39" height="32" alt="" /></Box><Box style={{padding: '8px 0'}}>משרד הבטחון מכרז דינאמי </Box></Box>
                    </Grid>
                    <hr />
                    
                   <Grid className={Styles.systemWatch}>
                       <BrowserView><Box className={Styles.title}>{Translation('Tender.SYSTEM_CLOCK')}</Box><Box className={Styles.clock}>{LastPropositionsDto.ServerTime}</Box></BrowserView>
                       <MobileView><Box className={Styles.title}>{TenderName}</Box></MobileView>
                   </Grid>
                </Grid>
               
            </Grid>
           
        </Box>
    );
}