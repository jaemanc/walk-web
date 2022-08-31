import React, {useState, useEffect} from 'react';
import UserDetail from "./UserDetail";
import UserInfo from "./UserInfo";
import Box from "@mui/material/Box";
import UserDetailFile from "./UserDetailFile";
import UserDetailCourse from "./UserDetailCourse";
import defaultAxios from "axios";
import Button from "@mui/material/Button";

const User = () => {

    const [infoOpen, setInfoOpen] = useState(true);
    const [detailCourseOpen, setDetailCourseOpen] = useState(false);
    const [detailFileOpen, setDetailFileOpen] = useState(false);

    const [userInfoValues, setUserInfoValues] = useState({
        address: 'USA',
        email: 'demo@devias.io',
        name: 'Katarina',
        password: '',
        phone: '01099881122',
        state: 'Alabama',
        birthday: '19930717'
    });

    function openUserInfo () {
        setInfoOpen(true);
        if (infoOpen) {
            setInfoOpen(false);
        }
    }

    function openUserDetailCourse () {

        console.log(' usr crs detail values...? : ' , detailCourseOpen);

        setDetailCourseOpen(true);

        if (detailCourseOpen) {
            setDetailCourseOpen(false);
        }
    }

    function openUserFiles () {

        console.log(' usr file detail values...? : ' , detailFileOpen);


        setDetailFileOpen(true);

        if (detailFileOpen) {
            setDetailFileOpen(false)
        }
    }

    useEffect(()=>{

    },[userInfoValues]);

    useEffect(() => {
        let id = sessionStorage.getItem("id");
        let email = sessionStorage.getItem("email");
        // 세션에 값이 없는 경우 :
        if ( id === null || email === null ) {
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
            defaultAxios.get(`walk/user/${id}`,
                {})
                .then(response => {
                    // console.log(response, " 헤더값 : ", response.headers.authrozation);
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

                <Button
                    variant="text"
                    onClick={openUserInfo}
                    sx={{
                        mt:10
                    }}
                >USER INFO</Button>

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
                            visibility : infoOpen ? 'visible' : 'hidden'
                            ,height: infoOpen ? '' : '0'
                        }}
                        props={userInfoValues}
                    />


                </Box>

                <Box>
                        <Button
                            variant="text"
                            onClick={openUserDetailCourse}
                        >User Course
                        </Button>

                    <UserDetailCourse
                        style={{
                            visibility : detailCourseOpen ? 'visible' : 'hidden'
                            ,height: detailCourseOpen ? '' : '0'
                        }}
                    />

                    <Button
                        variant="text"
                        onClick={openUserFiles}
                    >User Course Images</Button>

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