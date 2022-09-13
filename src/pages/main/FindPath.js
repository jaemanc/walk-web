import React, {useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import axios from "axios";


const FindPath = (props) => {

    const [selectLoc, setSelectLoc] = React.useState({
        startX:37.0000000,
        startY:126.999999,
        endX:37.8888888,
        endY:126.777777,
    })

    // polyline 좌표 기준 길 표시.
    const [polyLine, setPolyLine ] = React.useState([{
        x : '37.5176422',
        y : '126.8990036'
    }]);

    useEffect(()=>{
        setSelectLoc({
            startX:props.props.startX,
            startY:props.props.startY,
            endX:props.props.endX,
            endY:props.props.endY,
        })
    },[props])

    function onClick (e) {
        e.preventDefault();

        let startStr = props.props.startY+','+props.props.startX;
        let goalStr = props.props.endY+','+props.props.endX;

        console.log( '출발 요청값 : ', startStr);
        console.log('도착 요청값 : ', goalStr);

        axios.get(`/walk/course/walk-path`
            ,{
                params:{
                    start: startStr,
                    goal: goalStr
                }
            }
        ).then(response => {
            if (response.status === 200) {
                let py = '';
                let px = '';
                response.data.map((polyTemp) => {
                    let flag = false;
                    if (polyTemp.startsWith('1')) {
                        py = polyTemp;
                        flag = false;
                    } else {
                        px = polyTemp;
                        flag = true;
                    }
                    if (flag) {
                        polyLine.push({
                            x: px,
                            y: py
                        })
                    }
                })
                setPolyLine(polyLine);

                props.setValue(polyLine);


            } else {
                window.alert(' 검색 결과가 존재하지 않습니다. ');
                console.log(' 검색 결과가 존재하지 않습니다. ');
            }
        }).catch(err => {
            console.log("error!!", err);
        });
    }

    return (

        <Box>
            <Button
                onClick={onClick}
                sx={{
                    mb:2,
                    width:'100%',
                }}
                size="small" variant="contained"
            > 길 찾기</Button>

        </Box>

    );
}

export default FindPath;