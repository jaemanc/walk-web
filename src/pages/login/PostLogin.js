import React,{useState, useEffect} from 'react';
import defaultAxios from "axios";
import ReactDOM from "react-dom";
import loginConfig from '../../assets/config/config.json';
import {createModal} from "react-modal-promise";
import { Modal } from "react-bootstrap";

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

    const headers = {
        'Authorication': "Bearer token",
        'Content-Type': "application/json"
    }

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
                //Login(response);
                doSignUp(response);
                document.location.href = '/home'
                flag = !flag;
                console.log(" login success :: ", flag);
            }
        }).catch(err => {
            console.log("error!!", err);
        });

    console.log(" return flag value :: ", flag);
    return flag;
}

function doSignUp (response) {

    window.sessionStorage.setItem("id",response.data.useId);
    window.sessionStorage.setItem("email",response.data.email);

}

export default PostLogin;