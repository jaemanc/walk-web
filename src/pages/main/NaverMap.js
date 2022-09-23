import React, { useEffect, useReducer, useState } from "react";
import NaverMapScript from "./NaverMapScript";
import Box from "@mui/material/Box";
import FindPath from "./FindPath";
import PostCourse from "./PostCourse";
import PostImage from "./PostImage";
import Paper from "@mui/material/Paper";
import startImage from "../../assets/images/logout_16.png";
import arrvImage from "../../assets/images/login_16.png";

const {naver} = window;


export default function NaverMap() {

    // latitude = 위도 -- 37
    // longitude = 경도 -- 127
    const [currLoc, setCurrLoc] = React.useState({
        x:37.57275,
        y:126.8990036
    });

    const [selectLoc, setSelectLoc] = React.useState({
        startX:37.22222222,
        startY:126.1111111,
        endX:37.57275,
        endY:126.8990036,
    });

    // polyline 및 시간 거리 체크
    const [polyLine, setPolyLine ] = useState([{
        x : 37.5176422,
        y : 126.8990036,
        time: 0,
        distance : 0,
    }]);

    const [clear, setClear] = useState(false);

    useEffect(() => {
        // GeoLocation을 이용해서 접속 위치를 얻어옵니다
        navigator.geolocation.getCurrentPosition(function(position) {
            let crd = position.coords;
            setCurrLoc({
                x:crd.latitude,
                y:crd.longitude
            })
        });

        let mapDiv = document.getElementById('map');

        let map = new window.naver.maps.Map(mapDiv,{center: new naver.maps.LatLng(currLoc.x, currLoc.y),
            zoom: 14,
            position: 'releative'
        });
        //selectLoc.endX!==37.4444444 ? selectLoc.endX: currLoc.x


        let mapOptions = {
            zoomControl: true,
            zoomControlOptions: {
                style: naver.maps.ZoomControlStyle.SMALL,
                position: naver.maps.Position.TOP_RIGHT
            },
            logoControl: true,
            mapDataControl: true,
        }
        map.setOptions(mapOptions);

        let startMarkerOptions = {
            position: new naver.maps.LatLng(37.3595704, 127.105399),
            map: map,
            icon: {
                url: startImage,
                size: new naver.maps.Size(22, 35),
                anchor: new naver.maps.Point(11, 35)
            }
        };

        let destMarkerOptions = {
            position: new naver.maps.LatLng(37.3598704, 127.105599),
            map: map,
            icon: {
                url: arrvImage,
                size: new naver.maps.Size(22, 35),
                anchor: new naver.maps.Point(11, 35)
            }
        };

        let startMarker = new naver.maps.Marker(startMarkerOptions);
        let destMarker = new naver.maps.Marker(destMarkerOptions);

        let flag = Boolean(true);
        let menuLayer = document.createElement('div');
        menuLayer.id = 'btnId';
        menuLayer.innerHTML = 'test123123123123123213';
        menuLayer.style.display = 'none';

        document.body.appendChild(menuLayer);
        map.getPanes().floatPane.appendChild(menuLayer);

        naver.maps.Event.addListener(map, 'click', function(e){

            let tx = e.coord.x;
            let ty = e.coord.y;

            if (flag) {
                console.log(e.coord , ' ?? ');
                startSetter({...e.coord} );
                startMarker.setPosition(e.coord);

            } else {
                console.log(e.coord);
                endSetter({...e.coord});
                destMarker.setPosition(e.coord);

                setCurrLoc((currLoc) => {
                    return {
                        x: ty,
                        y: tx,
                    }
                })

            }
            flag = !flag;
        });


        let polylinePath = [];

        let i;
        for (i = 1; i < polyLine.length; i ++ ) {
            let position = new naver.maps.LatLng(polyLine[i].x, polyLine[i].y);
            polylinePath.push(position);
        }


        if (!clear) {
            let polyline = new naver.maps.Polyline({
                path: polylinePath,      //선 위치 변수배열
                strokeColor: '#FF0000', //선 색 빨강 #빨강,초록,파랑
                strokeOpacity: 0.8, //선 투명도 0 ~ 1
                strokeWeight: 6,   //선 두께
                map: map           //오버레이할 지도
            });

            let sttMarker = new naver.maps.Marker({
                position: polylinePath[1],
                map:map
            });
            let dstMarker = new naver.maps.Marker({
                position: polylinePath[polylinePath.length-1],
                map:map
            });
        }

        // NaverMapScript(currLoc);
    },[polyLine, clear]);

    let propsVal = '';

    useEffect(()=>{
    },[selectLoc]);


    // 비동기로 값이 셋팅되는 상황 때문에 아래와 같이 처리
    function startSetter (props) {
        setSelectLoc((selectLoc) => {
            return {
                ...selectLoc,
                startX: props.x,
                startY: props.y
            }
        });
    }

    function endSetter (props) {
        setSelectLoc((selectLoc) =>{
            return {
                ...selectLoc,
                endX:props.x,
                endY:props.y,
            }
        });
    }

    return (
        <Paper id="mapPaper"
               sx={{
                   p: 2,
                   flexDirection: 'column',
                   height: 1,
                   width: 1,
               }}
        >

        <Box sx={{display:'flex'}}>
            <Box
                sx={{
                    mr:2,
                    width:'7%'
                }}
            >
                <FindPath clear = {setClear} selectLoc = {selectLoc} setValue={setPolyLine}/>

                <PostCourse clear = {setClear} selectLoc = {selectLoc} polyLine={polyLine}/>

            </Box>

            <Box id="map" sx={{
                zIndex: 1,
                width: '93%',
                height: '80vh'
            }}/>

        </Box>
        </Paper>

    );
}
