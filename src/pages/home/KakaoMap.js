/* global kakao */
import React, { useEffect } from "react";
import KakaoMapScript from "./KakaoMapScript";

const { kakao } = window;


export default function KakaoMap() {

    const [currLoc, setCurrLoc] = React.useState({
        x:"37.54699",
        y:"127.09598"
    });

    useEffect(() => {
        KakaoMapScript(currLoc);
    }, [currLoc]);

    return (
        <div id='myMap' style={{
            width: '1120px',
            height: '500px'
        }}></div>
    );
}



