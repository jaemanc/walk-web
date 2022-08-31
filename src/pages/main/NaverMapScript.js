import React from 'react';
import startImage from "../../assets/images/logout_16.png"
import arrvImage from "../../assets/images/login_16.png"

const {naver} = window;

const NaverMapScript = ( props ) => {

    var mapDiv = document.getElementById('map');

    var map = new window.naver.maps.Map(mapDiv,{center: new naver.maps.LatLng(props.x, props.y),
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
            console.log(" 출발점 셋팅 :: ", e.coord);
            startMarker.setPosition(e.coord);

        } else {
            console.log(" 도착점 셋팅 :: ", e.coord);
            destMarker.setPosition(e.coord);

        }
        flag = !flag;
    });
}

export default NaverMapScript;