import React, {useEffect, useState} from 'react';
import {
    Avatar
    , Box, Button, Card, CardContent, InputAdornment, SvgIcon
    , Table, TableBody, TableCell
    , TableHead, TableRow, TextField
    , Typography
} from '@mui/material';
import PerfectScrollbar from 'react-perfect-scrollbar';
import TablePagination from "@mui/material/TablePagination";
import {Link} from "react-router-dom";
import defaultAxios from "axios";
import Search from "@mui/icons-material/Search";
import Loading from "../common/Loading";
import Modal from "react-modal";
import axios from "axios";

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

const BoardList = () => {

    const [modalisOpen, setisOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [postInfo, setPostInfo] = React.useState({
        boardId:1,
        postTitle:'',
        postMsg:'',
        isDeleted:'N',
        createrId: sessionStorage.getItem("id")
    });
    const [search,setSearch] = React.useState("init");
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(10);
    const [board, setBoards] = useState([{
        boardId: 1,
        postId: 21,
        postTitle: 'LOADING....',
        postMsg: 'LOADING....',
        createdAt: '1993:07:17 02:30:03',
        createrId: 11,
        updated_at: null,
        deletedAt: null,
        isDeleted: 'N',
        user: null,
        board: null,
        allCount: 0,
        boardName: 'boardName'
    }]);



    function openModal() {
        setisOpen(true);
    }

    function closeModal() {
        var answer = window.confirm('작성 중인 게시글의 내용은 모두 사라집니다. ' +
            '\r\n그래도 취소하시겠습니까?')
        if (answer) {
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

    function searchPosts (e) {

        e.preventDefault();
        setLoading(true);
        let boardId = 0;
        let page = 0;
        let limit = 0;
        var searchkey = search.toString();

        console.log('search value : ' , search);

        axios.get(`/walk/post/search?${searchkey}boardId=${boardId}&page=${page}&size=0`,
            {headers: {"Authorization": `${jwt}`}})
            .then(response => {
                console.log(' response data of requested post update  :: ', response.data);
                setisOpen(false);
                setLoading(false);
                setBoards(
                    response.data
                );
            }).catch(err => {
            console.log("error!!", err);
        });

    }

    const handleLimitChange = (event) => {
        console.log(' event.target.value : ' , event.target.value);
        setLimit(event.target.value);
    };

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };

    useEffect(()=>{
        let jwt = sessionStorage.getItem("jwt");
        defaultAxios.get(`walk/post?page=${page}&size=${limit}`,
            {headers: {"Authorization" : `${jwt}`}})
            .then(response=>{
                //console.log(`return value :: `, response);
                setBoards(
                    response.data
                );
            }).catch(err => {
            console.log("ERROR!! " , err);
        });

    },[page])

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
                                       onChange={e => setSearch({
                                           value : e.target.value
                                       })}
                            />
                                <Loading props={loading}/>
                            <Button
                                sx={{
                                    ml:5,
                                    display: loading ? "none" : "block"
                                }}
                                color="primary"
                                variant="contained"
                                onClick={searchPosts}
                            >
                                Search </Button>
                        </Box>
                    </CardContent>
                </Card>

                <Modal
                    isOpen={modalisOpen}
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
            <PerfectScrollbar>
                <Box SX={{minWidth: 1050}}>
                    <Table>

                        <TableHead>
                            <TableRow sx={{
                                ml:1
                            }}>
                                <TableCell>
                                    board
                                </TableCell>
                                <TableCell>
                                    DDaBong
                                </TableCell>
                                <TableCell>
                                    Title
                                </TableCell>
                                <TableCell>
                                    User
                                </TableCell>
                                <TableCell>
                                    Date
                                </TableCell>
                                <TableCell>
                                </TableCell>
                                <TableCell>
                                </TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {/* { board.slice(0, limit).map((board) => (*/}
                            { board.map((board) => (
                                <TableRow
                                    hover
                                    key={board.postId}
                                    // selected={selectedCustomerIds.indexOf(customer.id) !== -1}
                                >
                                        <TableCell padding="checkbox"
                                           sx={{width:"13%", alignItems:"center"}}
                                        >
                                            {board.boardName}
                                        </TableCell>
                                    <TableCell
                                        sx={{width:"10%"}}
                                    >
                                        <Box
                                            sx={{
                                                alignItems: 'center',
                                                display: 'flex'
                                            }}
                                        >
                                            <Avatar
                                                sx={{ mr: 2 }}
                                            >
                                                {board.name}
                                            </Avatar>
                                            <Typography
                                                color="textPrimary"
                                                variant="body1"
                                            >
                                                {/*{`${board.address.state}`}*/}
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell
                                        sx={{width:"45%", alignItems:"center"}}
                                    >
                                        <Link to={`/post/${board.postId}`}>
                                            {board.postTitle}
                                        </Link>
                                    </TableCell>
                                    <TableCell
                                        sx={{width:"13%", alignItems:"center"}}
                                    >
                                        {board.name}
                                        {/* {`${board.address.city}, ${board.address.state}, ${board.address.country}`}*/}
                                    </TableCell>
                                    <TableCell
                                        sx={{width:"20%", alignItems:"center"}}
                                    >
                                        {/*{format(board.createdAt, 'yyyy-MM-dd')}*/}
                                        {`${board.createdAt}`}
                                    </TableCell>

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Box>
            </PerfectScrollbar>
            <TablePagination
                component="div"
                count={board[0].allCount}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleLimitChange}
                page={page}
                rowsPerPage={limit}
                rowsPerPageOptions={[5, 10, 25]}
            />
        </Box>


    );
}

export default BoardList;