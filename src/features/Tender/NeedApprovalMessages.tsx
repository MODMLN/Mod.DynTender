import React, { useEffect } from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { Box } from "@mui/material";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';

interface ApprovalMessages{
    Id: number, 
    Text: string,
}

interface IProps {
    flag: boolean,
    Messages:ApprovalMessages[]
}

export default function NeedApprovalMessages({ flag,Messages }: IProps) {
    const [open, setOpen] = React.useState(true);
    useEffect(() => {
            if(flag){
                setOpen(true);
            }
    }, [flag]);
    const handleClose = () => {
        setOpen(false);
    };
console.log(Messages)

    return (
        <Box>
            <Dialog
                sx={{ 'direction': 'rtl' }}
                open={open}
                onClose={handleClose}
                aria-labelledby="הודעות שצריכות אישור מיידי"
                aria-describedby="הודעות שצריכות אישור מיידי"
            >
                <DialogTitle id="alert-dialog-title">
                הודעות שצריכות אישור מיידי
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
                                <ListItemText primary={item.Text} sx={{'text-align':'right',color:'#4D4E55',fontWeight: '600'}} />
                            </ListItem>
                            ))}
                            </List>
                        </Box>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>אישור</Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}