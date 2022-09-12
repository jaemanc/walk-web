import React, {useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import axios from "axios";


const FindPath = (props) => {

    const [selectLoc, setSelectLoc] = React.useState({
        startX:'37.0000000',
        startY:'126.999999',
        endX:'37.8888888',
        endY:'126.777777',
    })

    // polyline 좌표 기준 길 표시.
    const [polyLine, setPolyLine ] = useState([{
        x : 37.5176422,
        y : 126.8990036
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
        console.log(' 찾았나..? 1 ', props.props.startY);
        console.log(' 찾았나..? 2 ', props.props.startX);
        console.log(' 찾았나..? 3 ', props.props.endY);
        console.log(' 찾았나..? 4 ', props.props.endX);


        axios.get(`/walk/course/walk-path`
            ,{
                params:{
                    start: `${props.props.startY}+','+${props.props.startX}`,
                    goal: `${props.props.endY}+','+${props.props.endX}`,
                    option: ``,
                }
            }
        ).then(response => {
            console.log(' response data >>> ', response);

            if (response.status === 200) {

                // 도보 길찾은 정보를 -> setPolyLine으로 리턴.









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