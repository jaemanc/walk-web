import React, { useEffect } from "react";
import NaverMapScript from "./NaverMapScript";

const {naver} = window;

export default function NaverMap() {

    const [currLoc, setCurrLoc] = React.useState({
        x:"37.57275",
        y:"126.8990034"
    });

    useEffect(() => {

        // GeoLocation을 이용해서 접속 위치를 얻어옵니다
        navigator.geolocation.getCurrentPosition(function(position) {

            var crd = position.coords;

            console.log('Your current position is:');
            console.log(`Latitude : ${crd.latitude}`);
            console.log(`Longitude: ${crd.longitude}`);
            console.log(`More or less ${crd.accuracy} meters.`);
            setCurrLoc({
                x:crd.latitude,
                y:crd.longitude
            })
        });

        NaverMapScript(currLoc);
    },[]);

    return (
        <div id="map" style={{
            width: '100%',
            height: '80vh'
        }}>
        </div>
    );
}
