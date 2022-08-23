import React from 'react';
import {
    Box,
    Button,
    Card,
    CardContent,
    TextField,
    InputAdornment,
    SvgIcon, Typography
} from '@mui/material';
import Search from '@mui/icons-material/Search';
import defaultAxios from "axios";
import Modal from "react-modal";

const customStyles = {
    content: {
        top: '10%',
        left: '15%',
        right: 'auto',
        bottom: 'auto',
        width: '80%',
    },
    overlay: {
        zIndex: 100,
        // background: "#3F5477"
    }
}

const BoardToolBar = () => {

    const [modalisOpen, setisOpen] = React.useState(false);
    const [postInfo, setPostInfo] = React.useState({
        boardId:1,
        postTitle:'',
        postMsg:'',
        isDeleted:'N',
        createrId: sessionStorage.getItem("id")
    });

    const onClick = (e) => {
        e.preventDefault();
    }

    function openModal() {
        setisOpen(true);
    }

    function closeModal() {
        var answer = window.confirm('작성 중인 게시글의 내용은 모두 사라집니다. ' +
            '\r\n그래도 취소하시겠습니까?')
        if (answer) {
            console.log(' 예스!!!');
            setisOpen(false);
            setPostInfo({
                postTitle:'',
                postMsg:'',
            });
        }
    }

    let jwt = sessionStorage.getItem("jwt");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (postInfo.postMsg === '') {
            window.alert('게시글의 내용이 없습니다.');
        } else {
            // 등록 api 호출
            await defaultAxios.post(`/walk/post/`,
                {
                    ...postInfo
                },
                {headers: {"Authorization": `${jwt}`}})
                .then(response => {
                    console.log(' response data of requested post update  :: ', response.data);
                    window.alert('등록 되었습니다.');
                    setisOpen(false);
                    window.location.reload();
                }).catch(err => {
                    console.log("error!!", err);
                });
        }
    }

    return (
        <Box sx={{
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
                mr:1
            }}
            >
                <Typography
                    sx={{ m: 1 }}
                    variant="h4"
                >
                    Board
                </Typography>
                <Box sx={{
                    m: 1,
                    mr: 15
                }}>
                    {/*<Button
                        startIcon={(<Upload fontSize="small" />)}
                        sx={{ mr: 1 }}
                    >
                        고민중
                    </Button>*/}
                  {/*  <Button
                        startIcon={(<Download fontSize="small" />)}
                        sx={{ mr: 1 }}
                    >
                        입니다.
                    </Button>*/}
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={openModal}
                    >
                        New Post
                    </Button>
                </Box>
            </Box>
            <Box sx={{ mt: 3 }}>
                <Card>
                    <CardContent>
                        <Box sx={{
                            alignItems: 'center',
                            display: 'flex',
                            // justifyContent: 'space-between',
                            flexWrap: 'wrap',
                            mr:1
                            ,ml: 1
                        }}>
                            <TextField sx={{width:"60%"}}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SvgIcon
                                                color="action"
                                                fontSize="small"
                                            >
                                                <Search />
                                            </SvgIcon>
                                        </InputAdornment>
                                    )
                                }}
                                placeholder="Search keywords"
                                variant="outlined"
                            />
                            <Button
                                sx={{
                                    ml:5
                                }}
                                color="primary"
                                variant="contained">
                                Search </Button>
                        </Box>
                    </CardContent>
                </Card>

                <Modal
                    isOpen={modalisOpen}
                    // onAfterOpen={afterOpenModal}
                    // onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                    sx={{
                        mt:10,
                        ml:10,
                        mr:10
                    }}
                >
                    <h2>신규 게시글 등록</h2>
                    <Box
                        sx={{
                            m: 2
                        }}
                        textAlign='center' component="form" onSubmit={handleSubmit}>
                        <TextField
                            id="postTitle"
                            margin="normal"
                            required
                            sx={{
                                width:"95%"
                                ,m:1
                            }}
                            value={postInfo.postTitle}
                            onChange={e => setPostInfo({
                                ...postInfo,
                                postTitle: e.target.value,
                            })}
                        />

                        <TextField
                            id="postMsg"
                            multiline
                            size="normal"
                            rows={15}
                            sx={{
                               width:"95%"
                               ,m:3
                            }}
                            variant= {'filled'}
                            type="search"
                            InputProps={{
                               readOnly: false,
                            }}
                            value={postInfo.postMsg}
                            onChange={e => setPostInfo({
                                ...postInfo,
                                postMsg: e.target.value,
                            })}
                        />

                        <Button
                            type="submit"
                            className="modalBtn"
                            color="primary"
                            variant="contained"
                            sx={{
                                    mr:3,
                                    mt:2
                                }}
                        >Go</Button>
                        <Button
                            sx={{
                                mt:2
                            }}
                            className="modalBtn"
                            color="primary"
                            variant="contained"
                            onClick={closeModal}
                        >Cancel</Button>
                    </Box>
                </Modal>



            </Box>
        </Box>
    );
}

export default BoardToolBar;