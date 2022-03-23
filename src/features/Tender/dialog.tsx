import React, { useEffect } from "react";
import {Box,Avatar,Checkbox,ListItemAvatar,ListItemText,ListItem,List,Button,DialogTitle,DialogContentText,DialogContent,DialogActions,Dialog} from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import { useTranslation } from "react-multi-lang";
import UsersDto from "./../../Global/UsersDto";
import { useDispatch } from "react-redux";
import { fetchTenderMessegesAsync } from "./TenderSlice";
import { useParams } from "react-router-dom";

interface IProps {
    flag: boolean,
    Messages:string[],
    userDto:UsersDto,
}

export default function DialogModel({ flag,Messages ,userDto}: IProps) {
    const { id } = useParams();
    const dispatch = useDispatch();
    const Translation = useTranslation();
    const [open, setOpen] = React.useState(true);
    useEffect(() => {
            if(flag){
                setOpen(true);
            }
       
    }, [flag]);
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Box>
            <Dialog
                sx={{ 'direction': 'rtl' }}
                open={open}
                onClose={handleClose}
                aria-labelledby={Translation('Tender.ANNOUNCEMENTS_FOR_THIS_AUCTION')}
                aria-describedby={Translation('Tender.ANNOUNCEMENTS_FOR_THIS_AUCTION')}
            >
                <DialogTitle id="alert-dialog-title">
                   {Translation('Tender.ANNOUNCEMENTS_FOR_THIS_AUCTION')}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description" component={'span'} >
                        <Box>
                            <List>
                            {Messages.map((item,index) => (
                            <ListItem key={index}>
                                <ListItemAvatar>
                                <Avatar>
                                    <ImageIcon />
                                </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={item} sx={{'text-align':'right',color:'#4D4E55',fontWeight: '600'}} />
                            </ListItem>
                            ))}
                            </List>

                        </Box>
                        <Box><Checkbox defaultChecked={false}  onChange={()=>dispatch(fetchTenderMessegesAsync({Tanderid:id?.replace(':','')!,userId:userDto.userId}))} /><span>{Translation('Tender.DO_NOT_SHOW_THIS_MESSAGE_AGAIN')}</span></Box>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>סגור</Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}