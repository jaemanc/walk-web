import React, {useEffect, useState} from 'react';
import axios from "axios";
import Box from "@mui/material/Box";
import startImage from "../../assets/images/logout_16.png";
import arrvImage from "../../assets/images/login_16.png";
import Container from "@mui/material/Container";
import Typography from '@mui/material/Typography';

const {naver} = window;


function CourseDetailMap (props) {

    let id = props.coordinatesId;

    const [currLoc, setCurrLoc] = React.useState({
        x:37.57275,
        y:126.8990036
    });

    const [polyLine, setPolyLine ] = React.useState([{
    }]);

    const [cordntsInfo, setCordntsInfo] = useState(
        {
            coordinatesId: 0,
            startLatitude: 126.8990036,
            startLongitude: 37.57275,
            destLatitude: 126.8990036,
            destLongitude: 37.57275,
            stopoverLatitude: 0,
            stopoverLongitude: 0,
            requiredTime: 603, // (초)
            transitRoute: null,
            distance: 706 // (미터)
        }
    );

    useEffect(()=>{
        const polys = props.polyLine.split(',');
        let py = '';
        let px = '';
        polys.map((polyTemp) => {

            let flag = false;
            if (polyTemp.startsWith('1')) {
                py = polyTemp;
                flag = false;
            } else if (polyTemp.startsWith('3')){
                px = polyTemp;
                flag = true;
            }
            if (flag && py !=='') {
                polyLine.push({
                    x: px,
                    y: py,
                })
            }
        })

        setPolyLine(polyLine);

        setCurrLoc((temp) => {
            console.log(' 형님 ',px, '###', py );
            return {
                x:px,
                y:py
            }
        });

        let mapDiv = document.getElementById('courseDetailMap');

        console.log(' current loc : ' , currLoc);

        let map = new window.naver.maps.Map(mapDiv,{center: new naver.maps.LatLng(px, py),
            zoom: 16,
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

        let polylinePath = [];

        let i;
        for (i = 1; i < polyLine.length; i ++ ) {
            let position = new naver.maps.LatLng(polyLine[i].x, polyLine[i].y);
            polylinePath.push(position);
        }

        let sttMarker = new naver.maps.Marker({
            position: polylinePath[1],
            map:map
        });

        let dstMarker = new naver.maps.Marker({
            position: polylinePath[polylinePath.length-1],
            map:map
        });

        let curr = polylinePath[polylinePath.length-1];

        let polyline = new naver.maps.Polyline({
            path: polylinePath,      //선 위치 변수배열
            strokeColor: '#FF0000', //선 색 빨강 #빨강,초록,파랑
            strokeOpacity: 0.8, //선 투명도 0 ~ 1
            strokeWeight: 6,   //선 두께
            map: map           //오버레이할 지도
        });


    },[props]);

    return (
        <Box id="courseDetailMap"
            sx={{
                ml:3,
                zIndex: 1,
                width: '100%',
                height: '50vh'
            }}
        >
        </Box>
    );
}

export default CourseDetailMap;