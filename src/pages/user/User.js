import React, {useState, useEffect} from 'react';
import Header from "../common/Header";
import GNB from "../common/GNB";
import UserDetail from "./UserDetail";
import UserInfo from "./UserInfo";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import UserDetailFile from "./UserDetailFile";
import UserDetailCourse from "./UserDetailCourse";
import defaultAxios from "axios";

const User = (props) => {

    const [infoOpen, setInfoOpen] = useState(true);
    const [detailOpen, setDetailOpen] = useState(true);
    const [detailCourseOpen, setDetailCourseOpen] = useState(false);
    const [detailFileOpen, setDetailFileOpen] = useState(false);

    const [userInfoValues, setUserInfoValues] = useState({
        address: 'USA',
        email: 'demo@devias.io',
        name: 'Katarina',
        password: '',
        phone: '01099881122',
        state: 'Alabama',  // state가 애매하네 이거 .
        birthday: '19930717'
    });

    const userInfo = {
        avatar: '/static/images/avatars/avatar_6.png',
        city: 'Los Angeles',
        country: 'USA',
        jobTitle: 'Senior Developer',
        name: 'Katarina Smith',
        timezone: 'GTM-7'
    };

    useEffect(()=>{

    },[userInfoValues]);

    useEffect(() => {
        let id = sessionStorage.getItem("id");
        let email = sessionStorage.getItem("email");
        let jwt = sessionStorage.getItem("jwt");
        // 세션에 값이 없는 경우 :
        if ( id === null || email === null ) {
            // 게스트 or neet login...
            setUserInfoValues({
                address: 'need login',
                email: 'need@login..!',
                name: 'Nid Login',
                password: '',
                phone: '00011112222',
                state: 'need Login',
                birthday: '19001231'
            });

        } else {
            const jwtConfig = {headers: {Authorization: `Bearer ${jwt}`}};

            defaultAxios.get(`walk/user/${id}`,
                {headers: {"Authorization" : `${jwt}`}})
                .then(response => {
                    console.log(response, " 헤더값 : ", response.headers.authrozation);
                    if (response.headers.authrozation !== null) {

                        setUserInfoValues({
                            address: response.data.address ,
                            email: response.data.email ,
                            name: response.data.name ,
                            phone: response.data.phone ,
                            birthday: response.data.birthday
                        });
                    }
                }).catch(err => {
                console.log("error!!", err);
            });
        }
    } ,[]);

    return (
            <Box>

                <Box display="flex">
                    <UserInfo
                        style={{
                            visibility : infoOpen ? 'visible' : 'hidden'
                            ,height: infoOpen ? '' : '0'
                        }}
                        props={userInfoValues}
                    />
                    <UserDetail
                        style={{
                            visibility : detailOpen ? 'visible' : 'hidden'
                            ,height: detailOpen ? '' : '0'
                        }}
                        props={userInfoValues}
                    />
                </Box>
                <Box>
                    <UserDetailCourse
                        style={{
                            visibility : detailCourseOpen ? 'visible' : 'hidden'
                            ,height: detailCourseOpen ? '' : '0'
                        }}
                    />

                    <UserDetailFile
                        style={{
                            visibility : detailFileOpen ? 'visible' : 'hidden'
                            ,height: detailFileOpen ? '' : '0'
                        }}
                    />
                </Box>

            </Box>
    );
}

export default User;