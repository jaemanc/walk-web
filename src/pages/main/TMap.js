import React, { useEffect, useState } from 'react';
import ReactDOM from "react-dom";
import Box from "@mui/material/Box";


const TMap = (props) => {

    const [map, setMap] = useState(false);

    useEffect(() => {
        const script = document.createElement("script");
        script.innerHTML =
        `function initTmap(){
            var map = new Tmapv2.Map("map_div",
                {
                    center: new Tmapv2.LatLng(37.566481622437934,126.98502302169841), // 지도 초기 좌표
                    width: "100%",
                    height: "80vh",
                });
            
        }
        
        initTmap();
        `;
        script.type = "text/javascript";
        document.head.appendChild(script);
        // document.body.appendChild(script);
        console.log('map rendered... ' , map);
    }, [map]);

    return (
        <div id="map_div" style={{
            width: '100%',
            height: '80vh'
        }}>

        </div>
    );
}

export default TMap;