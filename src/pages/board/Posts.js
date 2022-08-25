import React, {useEffect, useState} from 'react';
import {createTheme, ThemeProvider} from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import TopToolBar from "../home/TopToolBar";
import SideNavBar from "../home/SideNavBar";
import {useParams} from "react-router-dom";
import {Button, Typography} from "@mui/material";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import TextField from "@mui/material/TextField";
import defaultAxios from "axios";
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';

const mdTheme = createTheme();

const Posts = (props)=> {
    const [open, setOpen] = useState(true);
    const toggleDrawer = (evt) => {
        setOpen(!open);
    }

    let [originalMsg , setOriginalMsg] = useState("temp");
    const {postId} = useParams();
    const [postDetail, setPostDetail] = useState([{
        boardId:0,
        postId:0,
        postTitle:"default title",
        postMsg:"default msg",
        createdAt:11,
        createrId:11,
        updated_at:null,
        deletedAt:null,
        isDeleted:"N"
    }]);

    let jwt = sessionStorage.getItem("jwt");

    const getPost = () => {
        return new Promise((resolve, reject) => {
            defaultAxios.get(`/walk/post/${postId}`
                ,{headers: {"Authorization": `${jwt}`}})
                .then(response => {

                    setPostDetail(response.data);
                    setOriginalMsg(response.data.postMsg);
                    return resolve(response);
                })
                .catch(err => {
                    // setPostDetail("ERR....");
                    console.log("get Post Failed..." , err);
                });
        })
    }

    useEffect(() => {
        getPost().then((response)=>{
        });
    },[]);

    let [readOnlyValue , setReadOnlyValue] = useState(true);
    // outlined
    let [variantValue, setVariantValue] = useState("filled")

    const putPostMsg = async () => {
        if (readOnlyValue === false) {
            setReadOnlyValue(true)
            setVariantValue("filled")
            console.log(postDetail.postMsg);
            let id = sessionStorage.getItem("id");
            if (postDetail.createrId === id) {
                await defaultAxios.put(`/walk/post/${postId}`,
                    {
                        ...postDetail
                    },
                    {headers: {"Authorization": `${jwt}`}})
                    .then(response => {
                        console.log(' response data of requested post update  :: ', response.data);
                        setOriginalMsg(
                            response.data
                        );

                        window.alert(' 수정 되었습니다. ');
                    }).catch(err => {
                        console.log("error!!", err);
                    });
            } else {
                window.alert(' 작성자만 수정 가능합니다. ');
            }

        } else {
            setReadOnlyValue(false)
            setVariantValue("outlined")
        }
    }

    const cancle = async () => {
        if (readOnlyValue===true) {
            // 삭제하기 요청이므로 삭제 API 호출 필요.
            // 현재 로그인 사용자가 게시글을 등록한 사용자인지 체크
            let id = sessionStorage.getItem("id");
            if (postDetail.createrId === id) {
                // 삭제 로직
                await defaultAxios.delete(`/walk/post/${postId}`,
                    {headers: {"Authorization": `${jwt}`}})
                    .then(response => {
                        console.log(' response data of requested post update  :: ', response.data);
                        setOriginalMsg(
                            response.data
                        );
                    }).catch(err => {
                        console.log("error!!", err);
                    });

            } else {
                // 등록자가 아니므로 삭제 불가 알림 추가 필요
                console.log(' 작성자 : ' , id , ' 게시글 등록자 : ', postDetail.createrId);

                window.alert(' 작성자만 게시글을 삭제 할 수 있습니다.');

            }

        }  else {
            setPostDetail({
                  ...postDetail,
                  postMsg : originalMsg
            });
            setReadOnlyValue(true);
            setVariantValue("filled");
        }
    }

    return (
        <ThemeProvider theme={mdTheme}>
            <Box sx={{
                display: 'flex'
            }}>
                <CssBaseline />

                {/* 상단 대시보드 App bar */}
                <TopToolBar toggleDrawer={toggleDrawer} open={open}/>

                {/* 사이드 nav bar*/}
                <SideNavBar toggleDrawer={toggleDrawer} open={open}/>

                <Box
                    sx={{
                    width: 1,
                    mt: 10,
                    ml: 3
                }}>
                    <Box
                        sx={{
                            alignItems: 'center',
                            display: 'flex',
                            justifyContent: 'space-between',
                            flexWrap: 'wrap',
                            mr:10
                        }}
                    >
                        <Typography
                            sx={{ m: 1
                            ,ml:5
                            }}
                            variant="h4"
                        >
                           {postDetail.postTitle}
                        </Typography>
                        <Box sx={{ m: 1 }}>
                            <Button
                                startIcon={(<BorderColorIcon fontSize="normal" />)}
                                sx={{ mr: 1 }}
                                onClick={ putPostMsg }
                            >
                                {readOnlyValue !== false ? " 수정하기 " : " 저장하기 "}
                            </Button>
                            <Button
                                startIcon={(<DeleteSweepIcon fontSize="small" />)}
                                sx={{ mr: 1 }}
                                onClick={cancle}
                            >
                                {readOnlyValue !== false ? " 삭제하기 " : " 수정취소 "}
                            </Button>
                            <Button
                                color="primary"
                                variant="contained"
                            >
                                목록으로
                            </Button>
                        </Box>
                    </Box>
                    <Box component="form">
                        <TextField id="filled-basic"
                           multiline
                           size="normal"
                           rows={22}
                           defaultValue={postDetail.postMsg}
                           sx={{
                               width:"95%"
                               ,ml:3
                               ,mr:1
                               ,mt:3
                           }}
                           variant= {variantValue}
                           type="search"
                           // InputProps={{
                           //     readOnly: {readOnlyValue},
                           // }}
                           InputProps={{
                               readOnly: readOnlyValue,
                           }}
                           onChange={e => setPostDetail({
                               ...postDetail,
                               postMsg: e.target.value
                           }) }
                        />
                    </Box>
                </Box>
            </Box>

        </ThemeProvider>
    );
}

export default Posts;