import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// const kakaoScript = document.createElement("script");
// kakaoScript.type="text/javascript"
// kakaoScript.src="//dapi.kakao.com/v2/maps/sdk.js?appkey=6c9e5f2e91e084b358044aacbdb9a3da";
// document.body.appendChild(kakaoScript);

// const NaverScript = document.createElement("script");
// NaverScript.type="text/javascript"
// NaverScript.src="https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=6y057hl01r";
// document.body.appendChild(NaverScript);

// const TmapV2 = document.createElement("script");
// TmapV2.type="text/javascript"
// TmapV2.src="https://apis.openapi.sk.com/tmap/jsv2?version=1&appKey=l7xxe18c334519bd4281bbcdfd1e7398c052";
// TmapV2.innerHTML =
//    `function initTmap(){
//     var map = new Tmapv2.Map("map_div",
//         {
//             center: new Tmapv2.LatLng(37.566481622437934,126.98502302169841), // 지도 초기 좌표
//             width: "800px",
//             height: "800px",
//         });
//
//     initTmap();
// }`
// TmapV2.type = "text/javascript";
// document.body.appendChild(TmapV2);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // StrictMode 가 있다면 개발 시 debug를 위해 2번씩 실행된다.
    // <React.StrictMode>
    <App />

    );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
