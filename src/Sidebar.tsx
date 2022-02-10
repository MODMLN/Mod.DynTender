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
        
          isOpen={false}
          menuClassName={ "burgerMenu" }

        >
          
        <Box sx={{display:'inline-flex'}}>
          <Box><Button variant="contained" style={{backgroundColor:'#00798C'}}  >שינוי סיסמא</Button></Box>
          <Box><Button variant="outlined"   style={{borderColor:'#00798C', color:'#00798C'}}>התנתקות</Button></Box>
        </Box>
        </Menu>
      );
}