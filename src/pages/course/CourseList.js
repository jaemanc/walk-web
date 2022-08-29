import React, {useState} from 'react';
import Snackbar from "@mui/material/Snackbar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { InputAdornment, SvgIcon, TextField, Typography} from "@mui/material";
import Search from "@mui/icons-material/Search";
import Loading from "../common/loading";
import axios from "axios";

const CourseList = () => {

    const [search, setSearch] = useState("");
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [course, setCourse] = useState(false);
    let jwt = sessionStorage.getItem("jwt");

    const handleClick = () => {
        setOpen(true);
    }

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    }

    function searchCourse (e) {
        e.preventDefault();
        setLoading(true);
        let page = 0;
        let limit = 0;

        axios.get( `/walk/course/search`, {
            params:{
                keyword: search.value,
                page: page,
                size: 0,
            },
            headers: {
                "Authorization": `${jwt}`
            }})
            .then(response => {
                console.log(` response data >>> ` , response);
                setLoading(false);
                if (response.status === 200) {
                    setCourse(
                        response.data
                    );
                } else {
                    // 그거 그 스낵바로 처리 합시다.
                    console.log(' 검색 결과가 존재하지 않습니다. ');

                }
        }).catch(err => {
            console.log(" error!! ", err);
        });
    }

    const action = (
        <React.Fragment>
            <Button color="secondary" size="small" onClick={handleClick}>
            </Button>
            <VisibilityIcon
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            />
        </React.Fragment>
    );

    return (
        <Box sx={{
            width: 1,
            mt: 10,
            ml: 3,
        }}>

            <Button onClick={handleClick}> 열려라 참깨 </Button>
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                 message = "테스트 합니당"
                action={action}
            />
            <Typography
                sx={{ m: 1 }}
                variant="h4"
            >
                Course
            </Typography>

            <Box sx={{
                alignItems: 'center',
                display: 'flex',
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
                           onChange={e => setSearch({
                               value : e.target.value
                           })}
                />
                <Loading props={loading}/>
                <Button
                    sx={{
                        ml:5,
                        display: loading ? "none" : "block"
                    }}
                    color="primary"
                    variant="contained"
                    onClick={searchCourse}
                >
                    Search </Button>
            </Box>









        </Box>
    );
}

export default CourseList;