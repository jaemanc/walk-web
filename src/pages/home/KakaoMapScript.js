/* global kakao */
import imageTemp from "../../assets/images/풀숲흙길산책.jpg";
import {useState} from "react";

const { kakao } = window;


export default function KakaoMapScript(props) {

    // const[startingPoint, setStartingPoint] = useState("");
    // const[Destination, setDestination] = useState("");

    const container = document.getElementById('myMap');

    const options = {
        center: new kakao.maps.LatLng(props.x, props.y),
        level: 3
    };

    const map = new kakao.maps.Map(container, options);
    var imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png'; // 마커이미지의 주소입니다

    if (navigator.geolocation) {

        // GeoLocation을 이용해서 접속 위치를 얻어옵니다
        navigator.geolocation.getCurrentPosition(function(position) {

            var lat = position.coords.latitude, // 위도
                lon = position.coords.longitude; // 경도

            var locPosition = new kakao.maps.LatLng(lat, lon); // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
            var message = '<div style={width="10px"}>현재</div>'; // 인포윈도우에 표시될 내용입니다

            // 현재위치를 기본으로 찍어야 할듯.
            // 마커와 인포윈도우를 표시합니다
            displayMarker(locPosition, message);

        });

    } else { // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다

        var locPosition = new kakao.maps.LatLng(33.450701, 126.570667),
            message = 'geolocation을 사용할수 없어요..'

        displayMarker(locPosition, message);
    }

    // 지도에 마커와 인포윈도우를 표시하는 함수입니다
    function displayMarker(locPosition, message) {

        // 마커를 생성합니다
        var marker = new kakao.maps.Marker({
            map: map,
            position: locPosition,
        });

        var iwContent = message, // 인포윈도우에 표시할 내용
            iwRemoveable = true;

        var infowindow = new kakao.maps.InfoWindow({
            content : iwContent,
            removable : iwRemoveable
        });

        infowindow.open(map, marker);

        // 지도 중심좌표를 접속위치로 변경합니다
        map.setCenter(locPosition);

        let flag = Boolean(true);

        var startSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/red_b.png', // 출발 마커이미지의 주소입니다
            startSize = new kakao.maps.Size(50, 45), // 출발 마커이미지의 크기입니다
            startOption = {
                offset: new kakao.maps.Point(15, 43) // 출발 마커이미지에서 마커의 좌표에 일치시킬 좌표를 설정합니다 (기본값은 이미지의 가운데 아래입니다)
            };

        var startImage = new kakao.maps.MarkerImage(startSrc, startSize, startOption);

        var arriveSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/blue_b.png', // 도착 마커이미지 주소입니다
            arriveSize = new kakao.maps.Size(50, 45), // 도착 마커이미지의 크기입니다
            arriveOption = {
                offset: new kakao.maps.Point(15, 43) // 도착 마커이미지에서 마커의 좌표에 일치시킬 좌표를 설정합니다 (기본값은 이미지의 가운데 아래입니다)
            };

        var arriveImage = new kakao.maps.MarkerImage(arriveSrc, arriveSize, arriveOption);

        var startMarker = new kakao.maps.Marker({
            map: map, // 마커를 표시할 지도
            position: locPosition, // 마커를 표시할 위치
            title : "출발", // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
            image : startImage
        });

        var message = '<div style="padding:5px;">여기에 계신가요?!</div>';

        var strtInfowindow = new kakao.maps.InfoWindow({
            content : message,
            removable : iwRemoveable
        });

        var destMarker = new kakao.maps.Marker({
            map: map, // 마커를 표시할 지도
            position: locPosition, // 마커를 표시할 위치
            title : "도착", // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
            image: arriveImage
        });

        var destInfowindow = new kakao.maps.InfoWindow({
            content : message,
            removable : iwRemoveable
        });

        kakao.maps.event.addListener(map, 'click', function(mouseEvent) {
            var latlng = mouseEvent.latLng;
            console.log(" Map Click event : ", latlng);

            if (flag) {

                startMarker.setPosition(latlng);
                flag = !flag;

            } else {

                destMarker.setPosition(latlng);
                flag = !flag;

            }
        });
    }
}