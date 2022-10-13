import React from 'react';
import axios from "axios";

const Interceptor = (props) => {
    // 1. jwt check
    // 2. 갱신 및 session에 다시 적용.
    var axiosAuthInstance = axios.create({
        baseURL: 'http://localhost:3000',
        timeout: 5000,
    })

    let jwt = sessionStorage.getItem("jwt");

    // request interceptor
    axios.interceptors.request.use(config => {
        config.headers['Authorization'] = `${jwt}`;
        return config;
    }, error => {
        return Promise.reject(error);
    })

    // response interceptor
    axios.interceptors.response.use(function (response) {
        let jwt = sessionStorage.getItem("jwt");

        if (response.status !==401) {
            axiosAuthInstance.post(`/walk/login/verification`,
                {
                    jwt
                },
                {headers: {"Authorization": `${jwt}`}})
                .then(response => {
                    // console.log(' 토큰 세션 시간 갱신합니다 token value :: ' , response);
                    window.sessionStorage.setItem("jwt",response.data);
                }).catch(err => {
                console.log("error!!", err);
            });
        }
        return response;
    }, function (error) {
        // 401 => login redirect page로 호출 할 것.
        if (error.response.status === 401) {
            window.alert(' 세션이 만료되었습니다. 다시 로그인 해주세요! ');
            window.location.href = "/";
        }
        return Promise.reject(error);
    });
    return (
        <div></div>
    );
}

export default Interceptor;