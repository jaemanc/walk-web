import React from 'react';
import {
    Box,
    Button,
    Card,
    CardContent,
    TextField,
    InputAdornment,
    SvgIcon, Typography
} from '@mui/material';
import Search from '@mui/icons-material/Search';
import Upload from '@mui/icons-material/Upload';
import Download from '@mui/icons-material/Upload';


const BoardToolBar = () => {
    return (
        <Box sx={{
            width: 1,
            mt: 10,
            ml: 3
        }}>
            <Box
                sx={{
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                mr:1
            }}
            >
                <Typography
                    sx={{ m: 1 }}
                    variant="h4"
                >
                    Board
                </Typography>
                <Box sx={{
                    m: 1,
                    mr: 15
                }}>
                    {/*<Button
                        startIcon={(<Upload fontSize="small" />)}
                        sx={{ mr: 1 }}
                    >
                        고민중
                    </Button>*/}
                  {/*  <Button
                        startIcon={(<Download fontSize="small" />)}
                        sx={{ mr: 1 }}
                    >
                        입니다.
                    </Button>*/}
                    <Button
                        color="primary"
                        variant="contained"
                    >
                        New Post
                    </Button>
                </Box>
            </Box>
            <Box sx={{ mt: 3 }}>
                <Card>
                    <CardContent>
                        <Box sx={{
                            alignItems: 'center',
                            display: 'flex',
                            // justifyContent: 'space-between',
                            flexWrap: 'wrap',
                            mr:1
                            ,ml: 1
                        }}>
                            <TextField sx={{width:"60%"}}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SvgIcon
                                                color="action"
                                                fontSize="small"
                                            >
                                                <Search />
                                            </SvgIcon>
                                        </InputAdornment>
                                    )
                                }}
                                placeholder="Search keywords"
                                variant="outlined"
                            />
                            <Button
                                sx={{
                                    ml:5
                                }}
                                color="primary"
                                variant="contained">
                                Search </Button>
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </Box>
    );
}

export default BoardToolBar;