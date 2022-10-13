import React, {useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import axios from "axios";
import Loading from "../common/Loading";

const FindPath = (props) => {

    const [selectLoc, setSelectLoc] = React.useState({
        startX:37.0000000,
        startY:126.999999,
        endX:37.8888888,
        endY:126.777777,
    })

    const [loading, setLoading] = useState(false);
    // polyline 좌표 기준 길 표시.
    const [polyLine, setPolyLine ] = React.useState([{
        /*x : '37.5176422',
        y : '126.8990036'*/
        x : '',
        y : ''
    }]);

    useEffect(()=>{
        setSelectLoc({
            startX:props.selectLoc.startX,
            startY:props.selectLoc.startY,
            endX:props.selectLoc.endX,
            endY:props.selectLoc.endY,
        })
    },[props])

    function onClick (e) {
        setLoading(true);
        e.preventDefault();

        let startStr = props.selectLoc.startY+','+props.selectLoc.startX;
        let goalStr = props.selectLoc.endY+','+props.selectLoc.endX;

        axios.get(`/walk/course/walk-path`
            ,{
                params:{
                    start: startStr,
                    goal: goalStr
                }
            }
        ).then(response => {
            props.clear(false);
            console.log(response);
            if (response.status === 200) {
                let py = '';
                let px = '';
                response.data.coordinateValue.map((polyTemp) => {

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
                            y: py,
                            time:response.data.time,
                            distance: response.data.distance,
                        })
                    }
                })

                setPolyLine(polyLine);

                props.setValue(polyLine);
                setLoading(false);

                props.setInfo({
                    requiredTime:response.data.time,
                    distance:response.data.distance,
                });

            } else {
                window.alert(' 검색 결과가 존재하지 않습니다. ');
                console.log(' 검색 결과가 존재하지 않습니다. ');
                setLoading(false);
            }
        }).catch(err => {
            console.log("error!!", err);
        });
    }

    return (

        <Box position="absolute"
            sx={{
                ml:0,
                zIndex:2
            }}
        >
            <Loading props={loading}/>
            <Button
                onClick={onClick}
                sx={{
                    mb:2,
                    width:'100%',
                    display: loading ? "none" : "block"
                }}
                size="large" variant="contained"
            > 길 찾기</Button>

        </Box>

    );
}

export default FindPath;