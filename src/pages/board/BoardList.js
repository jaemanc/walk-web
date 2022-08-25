import React, {useEffect, useState} from 'react';
import {
    Avatar
    , Box
    ,Table, TableBody, TableCell
    ,TableHead, TableRow
    ,Typography
} from '@mui/material';
import PerfectScrollbar from 'react-perfect-scrollbar';
import TablePagination from "@mui/material/TablePagination";
import {Link} from "react-router-dom";
import defaultAxios from "axios";

const BoardList = () => {

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
            mt:1
            , mr:1
            , ml:3
            , mb:1
            , width:'100%'
        }}>
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