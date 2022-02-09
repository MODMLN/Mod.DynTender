import { Button } from "@mui/material";
import React from "react";
import { slide as Menu } from 'react-burger-menu'
import { Box } from "@mui/material";
export default function SidebarRight() {

    return (
        <Menu
        right 
        pageWrapId={"slide"}
        width={ '370px' } 
        height={'100%'}
          isOpen={false}
          crossButtonClassName={ "my-class" }

        >
          
        <Box sx={{display:'inline-flex'}}>
          <Box><Button variant="contained" style={{backgroundColor:'#00798C'}}  >שינוי סיסמא</Button></Box>
          <Box><Button variant="outlined"   style={{backgroundColor:'#00798C'}}>התנתקות</Button></Box>
        </Box>
        </Menu>
      );
}