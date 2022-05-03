import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { fetchApproveMessagesAsync } from "./TenderSlice";
import { useTranslation } from "react-multi-lang";
import UsersDto from "./../../Global/UsersDto";
import { fetchUserAsync, selectUser } from "../../Global/UsersSlice";

interface ApprovalMessages {
    Id: number,
    Text: string,
}

interface IProps {
    flag: boolean,
    Messages: ApprovalMessages[]
}

export default function NeedApprovalMessages({ flag, Messages }: IProps) {
    const Translation = useTranslation();
    const [open, setOpen] = React.useState(true);
    const dispatch = useDispatch();
    const userDto = useSelector(selectUser);

    useEffect(() => {

        if (flag) {
            dispatch(fetchUserAsync());
            setOpen(true);
        }
    }, [flag]);


    let msgs = [{ userid: userDto.userId, Messages: Messages.map((x) => x.Id?.toString()) }];


    return (
        <Box>
            <Dialog
                sx={{ 'direction': 'rtl' }}
                open={open}
                onClose={() => {
                    setOpen(false);
                    dispatch(fetchApproveMessagesAsync(msgs));
                }}
                aria-labelledby={Translation('Tender.MESSAGES_THAT_REQUIRE_IMMEDIATE_APPROVAL')}
                aria-describedby={Translation('Tender.MESSAGES_THAT_REQUIRE_IMMEDIATE_APPROVAL')}
            >
                <DialogTitle id="alert-dialog-title">
                    {Translation('Tender.MESSAGES_THAT_REQUIRE_IMMEDIATE_APPROVAL')}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description" component={'span'} >
                        <Box>
                            <List>
                                {Messages.map((item, index) => (
                                    <ListItem key={index}>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <ImageIcon />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary={item.Text} sx={{ 'text-align': 'right', color: '#4D4E55', fontWeight: '600' }} />
                                    </ListItem>
                                ))}
                            </List>
                        </Box>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        setOpen(false);
                        dispatch(fetchApproveMessagesAsync(msgs));
                    }}
                    >{Translation('Tender.CONFITMATION')}</Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}