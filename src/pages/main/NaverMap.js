import React, { useEffect, useReducer } from "react";
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
        startX:126.1111111,
        startY:37.22222222,
        endX:126.3333333,
        endY:37.4444444,
    });

    useEffect(() => {
        // GeoLocation을 이용해서 접속 위치를 얻어옵니다
        navigator.geolocation.getCurrentPosition(function(position) {
            var crd = position.coords;
            setCurrLoc({
                x:crd.latitude,
                y:crd.longitude
            })
        });

        var mapDiv = document.getElementById('map');

        var map = new window.naver.maps.Map(mapDiv,{center: new naver.maps.LatLng(currLoc.x, currLoc.y),
            zoom: 14,
            position: 'releative'
        });

        var mapOptions = {
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

            if (flag) {
                startSetter({...e.coord} );
                startMarker.setPosition(e.coord);

            } else {
                endSetter({...e.coord});
                destMarker.setPosition(e.coord);
            }
            flag = !flag;
        });


        var polylinePath = [
            new naver.maps.LatLng(37.4526437, 126.49236),
            new naver.maps.LatLng(37.4768068, 126.4847975),
            new naver.maps.LatLng(37.4988237, 126.4960839),
            new naver.maps.LatLng(37.5176422, 126.5392841),
            new naver.maps.LatLng(37.5398154, 126.5708743),
            new naver.maps.LatLng(37.5457857, 126.5968815),
            new naver.maps.LatLng(37.5646413, 126.6502792),
            new naver.maps.LatLng(37.5708896, 126.7197823),
            new naver.maps.LatLng(37.5710499, 126.7444216),
            new naver.maps.LatLng(37.5770001, 126.7733532),
            new naver.maps.LatLng(37.5817724, 126.799401),
            new naver.maps.LatLng(37.5841817, 126.8167752),
            new naver.maps.LatLng(37.5808037, 126.8313027),
            new naver.maps.LatLng(37.5716637, 126.8473288),
            new naver.maps.LatLng(37.56136, 126.8619116),
            new naver.maps.LatLng(37.5487926, 126.8852035),
            new naver.maps.LatLng(37.540747, 126.8910651),
            new naver.maps.LatLng(37.5303713, 126.8925982),
            new naver.maps.LatLng(37.5164746, 126.8825719),
            new naver.maps.LatLng(37.5002697, 126.8725686),
            new naver.maps.LatLng(37.4933399, 126.8711786),
            new naver.maps.LatLng(37.4760577, 126.8756663),
            new naver.maps.LatLng(37.4634352, 126.8887979),
            new naver.maps.LatLng(37.448467, 126.8947082),
            new naver.maps.LatLng(37.4346374, 126.8977132),
            new naver.maps.LatLng(37.4242394, 126.8949032),
            new naver.maps.LatLng(37.4033979, 126.8806084),
            new naver.maps.LatLng(37.3848775, 126.8691937),
            new naver.maps.LatLng(37.371033, 126.8693097),
            new naver.maps.LatLng(37.3724101, 126.9126676),
            new naver.maps.LatLng(37.3830471, 126.9660813),
            new naver.maps.LatLng(37.3807849, 126.9762181),
            new naver.maps.LatLng(37.3971504, 127.0267188),
            new naver.maps.LatLng(37.3961676, 127.0715545),
            new naver.maps.LatLng(37.3730718, 127.0659032),
            new naver.maps.LatLng(37.35114, 127.063139),
            new naver.maps.LatLng(37.3268898, 127.0575003),
            new naver.maps.LatLng(37.3210994, 127.0517556),
            new naver.maps.LatLng(37.3084352, 127.0590529),
            new naver.maps.LatLng(37.2877049, 127.0692822),
            new naver.maps.LatLng(37.2762087, 127.0808982)
        ];

        var polyline = new naver.maps.Polyline({
            path: polylinePath,      //선 위치 변수배열
            strokeColor: '#FF0000', //선 색 빨강 #빨강,초록,파랑
            strokeOpacity: 0.8, //선 투명도 0 ~ 1
            strokeWeight: 6,   //선 두께
            map: map           //오버레이할 지도
        });

        var marker = new naver.maps.Marker({
            position: polylinePath[polylinePath.length-1],
            map:map
        });
        // NaverMapScript(currLoc);
    },[]);

    let propsVal = '';

    useEffect(()=>{
        console.log(' 해치웠나..? ' , selectLoc);
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
                <FindPath props = {selectLoc}/>
                <PostCourse />
                <PostImage />
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
