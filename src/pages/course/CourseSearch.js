import * as React from 'react';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Box from "@mui/material/Box";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from "@mui/material/Button";
import {useEffect, useState} from "react";
import Typography from "@mui/material/Typography";
import {DatePicker} from "@mui/x-date-pickers";
import {InputAdornment, SvgIcon} from "@mui/material";
import Search from "@mui/icons-material/Search";
import Loading from "../common/Loading";
import axios from "axios";
import VisibilityIcon from '@mui/icons-material/Visibility';
import Snackbar from "@mui/material/Snackbar";


const CourseSearch = (props) => {

    let toDay = new Date();
    const [searchKey, setSearchKey] = useState( {
        count : 0,
        page : 0,
        size : 0,
        searchType : 'ALL',
        searchValue: '',
        startDate : (toDay.getFullYear()-1)+((toDay.getMonth()+1).toString().padStart(2,"0"))+toDay.getDate().toString().padStart(2,"0"),
        endDate : toDay.getFullYear()+((toDay.getMonth()+1).toString().padStart(2,"0"))+toDay.getDate().toString().padStart(2,"0"),
    });
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    function searchCourse () {
        setLoading(true);
        console.log(``);

        axios.get( `/walk/course/search`, {
            params:{
                page: searchKey.page,
                count: searchKey.count,
                size: searchKey.size,
                searchType : searchKey.searchType,
                searchValue: searchKey.searchValue,
                startDate : searchKey.startDate,
                endDate : searchKey.endDate,
            },
            headers: {
                "Authorization": `${jwt}`
            }})
            .then(response => {
                console.log(` response data >>> ` , response);
                setLoading(false);
                if (response.status === 200) {
                    props.setCourse(response.data);
                } else if (response.status ===204) {
                    console.log(' 검색 결과가 존재하지 않습니다. ');
                    setOpen(true);
                } else {
                    console.log('잘못된 리턴입니다.');
                }
            }).catch(err => {
                setLoading(false);
                console.log(" error!! ", err);
                console.log(' 검색 결과가 존재하지 않습니다. ');
                setOpen(true);
        });
    }
    let jwt = sessionStorage.getItem("jwt");

    useEffect(()=>{
        searchCourse();
    },[]);

    const handleClick = () => {
        setOpen(true);
    }

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    }

    function searchButton (e) {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        console.log(' submit이 가는가..? ' , data);
        console.log({
            count: data.get(`count`),
            page : data.get(`page`),
            searchType : data.get(`searchType`),
            searchValue : data.get(`searchValue`),
            startDate : data.get(`startDate`),
            endDate : data.get(`endDate`),
        });

        setSearchKey({
            count : searchKey.count,
            page : searchKey.page,
            searchValue: searchKey.searchValue,
            searchType: searchKey.searchType,
            startDate : searchKey.startDate,
            endDate : searchKey.endDate,
        });

        props.setValue(searchKey);
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
        <Box
            spacing={0}
            direction="column"
            alignItems="space-between"
            justifyContent="center"
            onSubmit={searchButton}
            component="form"
            sx={{
                width: 1,
                mt:10,
                ml:3,
                minHeight: '100px'
            }}
        >
            <Box
                sx={{
                    mt:1,
                    // display:'flex'
                }}
            >
                <Box>
                    <Typography
                        sx={{ m: 1 }}
                        variant="h4"
                    >
                        Course
                    </Typography>
                </Box>
            </Box>

                {/* 검색 조건 */}
                <Box sx={{mt:2}}>
                    {/* 검색 시작 날짜 */}
                    <LocalizationProvider
                        dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="검색 시작 날짜"
                            views={["year","month","day"]}
                            value={searchKey.startDate}
                            mask="____-__-__"
                            inputFormat="YYYY-MM-DD"
                            onChange={(newValue) => {
                                setSearchKey({
                                    ...searchKey,
                                    startDate: newValue,
                                })
                            }}
                            renderInput={(params) => <TextField size="small" {...params} sx={{mr:1}}/>}
                        />
                    </LocalizationProvider>
                    {/* 검색 종료 날짜 */}
                    <LocalizationProvider
                        dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="검색 종료 날짜"
                            mask="____-__-__"
                            inputFormat="YYYY-MM-DD"
                            value={searchKey.endDate}
                            onChange={(newValue) => {
                                setSearchKey({
                                    ...searchKey,
                                    endDate: newValue,
                                })
                            }}
                            renderInput={(params) => <TextField size="small" {...params} />}
                        />
                    </LocalizationProvider>

                    {/* select box 검색 유형 */}
                    <FormControl sx={{ ml:1 ,minWidth: 120 }} size="small">
                        <InputLabel
                            id="type_nm"
                            name="type_nm"
                            size="small"
                        >SEARCH KEY</InputLabel>
                        <Select
                            value={searchKey.searchType}
                            onChange={(value) => {
                                setSearchKey({
                                    ...searchKey,
                                    searchType : value.target.value,
                                })
                            }}
                        >
                            <MenuItem value='ALL'>ALL</MenuItem>
                            <MenuItem value='Keyword'>KEYWORD</MenuItem>
                            <MenuItem value='Name'>NAME</MenuItem>
                        </Select>
                    </FormControl>

                </Box>

            <Box sx={{
                alignItems: 'center',
                display: 'flex',
                flexWrap: 'wrap',
                mr:1
                ,mt:2
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
                           placeholder="검색어"
                           variant="outlined"
                           onChange={e => setSearchKey({
                               ...searchKey,
                               searchValue : e.target.value
                           })}
                           value={searchKey.searchValue || ''}
                />

                <Loading props={loading}/>
                <Button
                    sx={{
                        ml:4,
                        display: loading ? "none" : "block"
                    }}
                    color="primary"
                    variant="contained"
                    onClick={searchCourse}
                >
                    Search </Button>
            </Box>

            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message = "검색 결과가 존재하지 않습니다."
                action={action}
            />

        </Box>
    );
}

export default CourseSearch;