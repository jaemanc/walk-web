import React, { useEffect, useState, useRef } from 'react';
import ReactDOM from "react-dom";
import Box from "@mui/material/Box";

const TMap = (props) => {

    const [map, setMap] = useState(false);

    useEffect(() => {
        const script = document.createElement("script");
        script.innerHTML =
        `
        var map,marker;
        var lonlat;
        var markers = [];   
        
        function initTmap(){
            var map = new Tmapv2.Map("map_div",
                {
                    center: new Tmapv2.LatLng(37.566481622437934,126.98502302169841), // 지도 초기 좌표
                    width: "100%",
                    height: "80vh",
                });
            map.addListener("click", onClick); // 이벤트의 종류와 해당 이벤트 발생 시 실행할 함수를 리스너를 통해 등록합니다
        }
        
        function onClick(e){

            lonlat = e.latLng;
            //Marker 객체 생성.
            marker = new Tmapv2.Marker({
                position: new Tmapv2.LatLng(lonlat.lat(),lonlat.lng()), //Marker의 중심좌표 설정.
                map: map //Marker가 표시될 Map 설정.
            });

            markers.push(marker);
        }
        
        initTmap();
        `;
        script.type = "text/javascript";
        document.head.appendChild(script);



    }, [map]);

    const instance = useRef().current;


    var testtgt = '';



    return (
        // <div id = "map_div"></div>
        <div id = "map_div" ref={instance}
        >

        </div>
    );
}

export default TMap;		//Marker 객체 생성.
