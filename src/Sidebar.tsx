import { Button } from "@mui/material";
import React from "react";
import { slide as Menu } from 'react-burger-menu'
import { Box } from "@mui/material";
import UsersDto from "./Global/UsersDto";
import './index.css';
interface IProps {
  User: UsersDto, 
}

export default function SidebarRight({User}:IProps) {

    return (
        <Menu

        right 
        pageWrapId={"slide"}
        width={ '30%' } 
        
          isOpen={false}
          menuClassName={ "burgerMenu" }

        >
         <Box> 
           <Box className="UserFullName"> {User.UserFullName}</Box>
           <Box>
            <Box className="logoffBtn"><Button variant="outlined"   style={{borderColor:'#00798C', color:'#00798C'}}>התנתקות</Button></Box>
          </Box>
        </Box>
        </Menu>
      );
}