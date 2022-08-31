import React from 'react';
import defaultAxios from "axios";
import loginConfig from '../../assets/config/config.json';

// POST request using axios inside useEffect React hook
const PostLogin = async (data) => {

    const backAddr = loginConfig.development.back_addr;
    const api = backAddr.concat(loginConfig.login.api);

    let flag = Boolean(false);

    console.log({
        email: data.get(`email`),
        password: data.get(`password`),
    });
    console.log("api : ", api);

    await defaultAxios.post("walk/login",
        {
            // email:data.get(`email`),
            email: data.get(`email`),
            password: data.get(`password`)
        },
        {headers: {"Content-Type": `application/json`}})
        .then(response => {
            console.log(response, " 헤더값 : ", response.headers.authrozation);
            if (response.headers.authrozation !== null) {
                // 로그인 정보를 세션에 기록한다.
                doSignUp(response);
                document.location.href = '/main'
                flag = !flag;
            }
        }).catch(err => {
            console.log("error!!", err);
        });

    console.log(" return flag value :: ", flag);
    return flag;
}

function doSignUp (response) {

    window.sessionStorage.setItem("jwt",response.headers.authrozation);
    window.sessionStorage.setItem("id",response.data.userId);
    window.sessionStorage.setItem("email",response.data.email);

    console.log(sessionStorage.getItem("jwt") , " / " , sessionStorage.getItem("id") , " / " , sessionStorage.getItem("email"));

}

export default PostLogin;