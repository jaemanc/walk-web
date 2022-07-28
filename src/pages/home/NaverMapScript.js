import React, {useCallback, useEffect, useState} from 'react';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import imgeTemp from "../../assets/images/kakao_login_medium.png"
import fishImage from "../../assets/images/32fish.png"

const {naver} = window;

const NaverMapScript = ( props ) => {

    var mapDiv = document.getElementById('map');

    var map = new window.naver.maps.Map(mapDiv,{center: new naver.maps.LatLng(props.x, props.y),
        zoom: 14,
        position: 'releative'
    });

    map.setOptions("mapTypeControl", true);
    map.setOptions("zoomControl", true);

    var icon = {
        url: "../../assets/images/rocket-512.png",
        size: new naver.maps.Size(24, 37),
        anchor: new naver.maps.Point(12, 37),
        origin: new naver.maps.Point(29, 0)
    }

    let startMarkerOptions = {
        position: new naver.maps.LatLng(37.3595704, 127.105399),
        map: map,
        icon: {
            url: fishImage,
            size: new naver.maps.Size(22, 35),
            anchor: new naver.maps.Point(11, 35)
        }
    };

    let destMarkerOptions = {
        position: new naver.maps.LatLng(37.3598704, 127.105599),
        map: map,
        icon: {
            url: imgeTemp,
            size: new naver.maps.Size(22, 35),
            anchor: new naver.maps.Point(11, 35)
        }
    };

    let startMarker = new naver.maps.Marker(startMarkerOptions);
    let destMarker = new naver.maps.Marker(destMarkerOptions);

    let flag = Boolean(true);
    // var menuLayer = '<div style="position:absolute;z-index:10000;background-color:#fff;border:solid 1px #333;padding:10px;display:none;"></div>';

    let menuLayer = document.createElement('div');
    menuLayer.id = 'btnId';
    menuLayer.innerHTML = 'test123123123123123213';
    menuLayer.style.display = 'none';

    // document.body.insertBefore(menuLayer, map);
    document.body.appendChild(menuLayer);
    //map.getPanes().floatPane.appendChild(menuLayer);
    map.getPanes().floatPane.appendChild(menuLayer);

    naver.maps.Event.addListener(map, 'click', function(e){


        if (flag) {
            console.log(" 출발점 셋팅 :: ", e.coord);
            startMarker.setPosition(e.coord);

        } else {
            console.log(" 도착점 셋팅 :: ", e.coord);
            destMarker.setPosition(e.coord);



            // var coordHtml =
            //     'Coord: '+ '(우 클릭 지점 위/경도 좌표)' + '<br />' +
            //     'Point: ' + e.point + '<br />' +
            //     'Offset: ' + e.offset;
            //
            // console.log(e.offset.y , " / " , e.offset.x );
            //
            // var menuL = document.getElementById("btnId");
            //
            // var coordHtml =
            //     'Coord: '+ '(우 클릭 지점 위/경도 좌표)' + '<br />' +
            //     'Point: ' + e.point + '<br />' +
            //     'Offset: ' + e.offset;
            //
            // document.getElementById("btnId").style.position = 'absolute';
            // document.getElementById("btnId").style.top = e.offset.y+"px";
            // document.getElementById("btnId").style.left = e.offset.x+"px";
            // document.getElementById("btnId").style.zIndex = 10000;
            // document.getElementById("btnId").style.display= 'block';
            // document.getElementById("btnId").innerHTML = '변경된값으로 체크';
            //
            // console.log("왜 속성이 안바뀔까나.?", document.getElementById("btnId"));
            //
            // const mapPaper = document.querySelector('#mapPaper');
            // console.log('안나온유ㅠ유유융 ', mapPaper);

        }
        flag = !flag;
    });
}

export default NaverMapScript;