import React, {useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import CourseDetailMap from "./CourseDetailMap";
import FavoriteIcon from '@mui/icons-material/Favorite';
import Typography from '@mui/material/Typography';
import {Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import Paper from "@mui/material/Paper";
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Button from "@mui/material/Button";
import { pink } from '@mui/material/colors';
import ArrowLeftSharpIcon from '@mui/icons-material/ArrowLeftSharp';
import ArrowRightSharpIcon from '@mui/icons-material/ArrowRightSharp';
import defaultAxios from "axios";

const CourseDetail = (props) => {

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    const [coordinates, setCoordinates] = React.useState({
        coordinatesId:0,
        destLatitude:'',
        destLongitude:'',
        distance:0,
        requiredTime:'',
        startLatitude:'',
        startLongitude:'',
        stopoverLatitude:'',
        stopoverLongitude:'',
        transitRoute:'',
    });

    // 좌표 값 조회.
    useEffect(()=>{
        // 좌표 , polyline 등 조회
        defaultAxios.get(`walk/course/coordinates/${props.coordinatesId}`,
            {})
            .then(response=>{
                setCoordinates({
                    coordinatesId:0,
                    destLatitude:response.data.destLatitude,
                    destLongitude:response.data.destLongitude,
                    distance:response.data.distance,
                    startLatitude:response.data.startLatitude,
                    startLongitude:response.data.startLongitude,
                    stopoverLatitude:response.data.stopoverLatitude,
                    stopoverLongitude:response.data.stopoverLongitude,
                    transitRoute:response.data.transitRoute,
                    requiredTime: secondsToHms(response.data.requiredTime)
                })

            }).catch(err => {
            console.log("ERROR!! " , err);
        });

    },[]);

    function secondsToHms(d) {
        d = Number(d);
        var h = Math.floor(d / 3600);
        var m = Math.floor(d % 3600 / 60);
        var s = Math.floor(d % 3600 % 60);

        var hDisplay = h > 0 ? h + (h == 1 ? " hour " : " hour ") : "";
        var mDisplay = m > 0 ? m + (m == 1 ? " min " : " min ") : "";
        var sDisplay = s > 0 ? s + (s == 1 ? " sec" : " sec") : "";
        return hDisplay + mDisplay + sDisplay;
    }

    return (

        <Grid container spacing={2}>
            <Grid item xs={5}>
                {/*  지도  */}
                <CourseDetailMap polyLine={coordinates.transitRoute}/>
            </Grid>

            {/* 코스 정보 테이블 */}
            <Grid item xs={7}>
                <Table >
                    <TableHead>
                        <TableRow sx={{
                            m:1,
                            alignItems:"center",
                            verticalAlign:"top"
                        }}>
                            <TableCell align="center"
                                       sx={{
                                           width:"8%"
                                           ,alignItems:"center"
                                           ,verticalAlign:"center"
                                       }}>
                                time
                            </TableCell>
                            <TableCell align="center"
                                       sx={{
                                           width:"6%"
                                           ,alignItems:"center"
                                           ,verticalAlign:"center"
                                       }}>
                                dist
                            </TableCell>
                            <TableCell align="center"
                                       sx={{
                                           width:"6%"
                                           ,alignItems:"center"
                                           ,verticalAlign:"center"
                                       }}>
                                recommendation
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell
                                align="center"
                                sx={{alignItems:"center"}}>
                                {coordinates.requiredTime}
                            </TableCell>
                            <TableCell
                                align="center"
                                sx={{alignItems:"center"}}>
                                {coordinates.distance} (M)
                            </TableCell>
                            <TableCell>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                

                {/* 이미지 3단위 모음*/}
                <Box
                    display="flex"
                    height="30%"
                >
                    <Grid item xs={4} >
                        <ArrowLeftSharpIcon
                            fontSize="large"
                            sx={{
                                position: "absolute",
                                color: pink[500],
                                ml:2,
                                mt:4,
                            }}
                        />

                        <Item>
                            <Typography>
                                pictures
                            </Typography>
                        </Item>
                    </Grid>
                    <Grid item xs={4} >
                        <Item>
                            <Typography>
                                pictures
                            </Typography>
                        </Item>
                    </Grid>
                    <Grid item xs={4} >
                        <Item>
                            <Typography>
                                pictures
                            </Typography>
                        </Item>
                    </Grid>
                    <ArrowRightSharpIcon
                        fontSize="large"
                        sx={{
                            position: "absolute",
                            color: pink[500],
                            ml:87,
                            mt:4,
                        }}
                    />
                </Box>

                {/* 경로 바로 가기 및 추천 경로 목록 ( 테이블? ) */}
                <Button
                    sx={{
                        ml:4,
                        /*display: loading ? "none" : "block"*/
                    }}
                    color="primary"
                    variant="contained"
                >
                    경로 바로가기 </Button>
            </Grid>


        </Grid>




            /*<Box display="i">
                <Paper
                    sx={{
                        flexDirection: 'column',
                        height: 1,
                        width: "40%",
                   }}
                >

                </Paper>

                <Box>

                </Box>
            </Box>

            <Box>




                {/!* 비슷한 경로 추천. *!/}

            </Box>*/
    );
}

export default CourseDetail;