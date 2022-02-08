import { Box } from "@mui/material";
import React from "react";
import Styles from './Tender.module.scss';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Tooltip from '@mui/material/Tooltip';
import TextField from '@mui/material/TextField';

export default function Preferences() {


return(

    <>
     <Box className={Styles.privilege}>
                                <Box><label aria-label="למימוש ההעדפות, יש להזין את מרכיבי המחיר ליחידה" className={Styles.titleLbl}>למימוש ההעדפות, יש להזין את מרכיבי המחיר ליחידה:</label></Box>
                                <Box sx={{ marginTop: '50px' }}>
                                    <Box className={Styles.inlineFlex}>
                                        <Box><label className={Styles.titleLbl} >עלות מרכיב תוצרת הארץ</label><Tooltip  placement="top-start" title="אינפורמציה מטורפת"><InfoOutlinedIcon sx={{ height: '14px' }} /></Tooltip></Box> 
                                        <Box></Box>
                                        <Box><TextField
                                            sx={{ width: '110px', border: '1px solid #44454B', backgroundColor:'#F4F8FF' }}
                                            disabled
                                            type="number"
                                            id="outlined-disabled"
                                            label={null}
                                            defaultValue=""
                                            variant="filled"
                                        />
                                        </Box>
                                </Box>
                                </Box>
                                <Box className={Styles.privilege}>
                                <Box sx={{ marginTop: '50px' }}>
                                        <Box className={Styles.inlineFlex}>
                                                <Box><label className={Styles.titleLbl}>מרכיב כח עבודה</label><Tooltip  placement="top-start" title="אינפורמציה מטורפת"><InfoOutlinedIcon sx={{ height: '14px' }} /></Tooltip></Box>
                                                <Box></Box>
                                                <Box><TextField
                                                    sx={{ width: '110px', border: '1px solid #44454B', backgroundColor:'#F4F8FF' }}
                                                    disabled
                                                    type="number"
                                                    id="outlined-disabled"
                                                    label={null}
                                                    defaultValue=""
                                                    variant="filled"
                                                />
                                                </Box>
                                        </Box>
                                    </Box>
                                </Box>
                                </Box>
    </>
)


}
