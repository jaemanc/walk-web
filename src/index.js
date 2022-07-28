import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const kakaoScript = document.createElement("script");
kakaoScript.type="text/javascript"
kakaoScript.src="//dapi.kakao.com/v2/maps/sdk.js?appkey=6c9e5f2e91e084b358044aacbdb9a3da";
document.body.appendChild(kakaoScript);

const NaverScript = document.createElement("script");
NaverScript.type="text/javascript"
NaverScript.src="https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=6y057hl01r";
document.body.appendChild(NaverScript);



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/*<script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=6c9e5f2e91e084b358044aacbdb9a3da"></script>*/}
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
