import React, {useState} from 'react';
import axios from "axios";
import Box from "@mui/material/Box";
import startImage from "../../assets/images/logout_16.png";
import arrvImage from "../../assets/images/login_16.png";
import Container from "@mui/material/Container";

const {naver} = window;


function CourseDetailMap (props) {

    let id = props.coordinatesId;

    const [cordntsInfo, setCordntsInfo] = useState(
        {
            "coordinatesId": 0,
            "startLatitude": 126.8990036,
            "startLongitude": 37.57275,
            "destLatitude": 126.8990036,
            "destLongitude": 37.57275,
            "stopoverLatitude": 0,
            "stopoverLongitude": 0,
            "requiredTime": 603, // (초)
            "transitRoute": null,
            "distance": 706 // (미터)
        }
    );

    React.useEffect( () => {
        console.log('지도 아이디값이 있나..?',props.coordinatesId);
        axios.get(`/walk/course/coordinates/${id}`).then(response => {
            props.clear(false);
            console.log(response);
            if (response.status === 200) {

                console.log(response);

            } else {
                window.alert(' 검색 결과가 존재하지 않습니다. ');
                console.log(' 검색 결과가 존재하지 않습니다. ');
            }

        }).catch(err => {
            console.log("error!!", err);
        });
    },[props.coordinatesId]);


    // cordntsInfo 값이 세팅 될 때에 지도 렌더링
    React.useEffect(()=> {

        // GeoLocation을 이용해서 접속 위치를 얻어옵니다
        navigator.geolocation.getCurrentPosition(function(position) {

                let crd = position.coords;
                   //x:37.57275,
                   //y:126.8990036

        });

        let mapDiv = document.getElementById('courseDetailMap');

        let map = new window.naver.maps.Map(mapDiv,{center: new naver.maps.LatLng(cordntsInfo.startLatitude, cordntsInfo.startLongitude),
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

        // cordntsInfo.transit_route -> 값을 파싱해서 폴리라인 생성

        console.log('해치웠나..?!');
        console.log(cordntsInfo.transitRoute);

     /*   let i;
        for (i = 1; i < polyLine.length; i ++ ) {
            let position = new naver.maps.LatLng(polyLine[i].x, polyLine[i].y);
            polylinePath.push(position);
        }*/

    },[cordntsInfo]);
    
    return (
            <Box id="courseDetailMap"
                sx={{
                    display:'flex',
                    ml:3,
                    zIndex: 1,
                    width: '500px',
                    height: '50vh'
                }}
            />
    );
}

export default CourseDetailMap;