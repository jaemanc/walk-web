import React, {useEffect, useState} from 'react';
import {
    Avatar
    , Box, Card, CheckBox
    ,Table, TableBody, TableCell
    ,TableHead, Tablepagination, TableRow
    ,Typography
} from '@mui/material';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Checkbox from "@mui/material/Checkbox";
import {boards} from "./MockBoards";
import { format } from 'date-fns';
import TablePagination from "@mui/material/TablePagination";

const BoardList = ({boards}) => {

    const [customer, setCustomer] = useState({
        id:"",
        name:"",
        msg:"",
        no:"",
    })

    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(10);
    const handleLimitChange = (event) => {
        setLimit(event.target.value);
    };

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };

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
                                    Category
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
                            {boards.slice(0, limit).map((board) => (
                                <TableRow
                                    hover
                                    key={board.id}
                                    // selected={selectedCustomerIds.indexOf(customer.id) !== -1}
                                >
                                    <TableCell padding="checkbox">

                                    </TableCell>
                                    <TableCell>
                                        <Box
                                            sx={{
                                                alignItems: 'center',
                                                display: 'flex'
                                            }}
                                        >
                                            <Avatar
                                                src={board.avatarUrl}
                                                sx={{ mr: 2 }}
                                            >
                                                {board.name}
                                            </Avatar>
                                            <Typography
                                                color="textPrimary"
                                                variant="body1"
                                            >
                                                {`${board.address.state}`}
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        {board.email}
                                    </TableCell>
                                    <TableCell>
                                        {board.name}
                                        {/* {`${board.address.city}, ${board.address.state}, ${board.address.country}`}*/}
                                    </TableCell>
                                    <TableCell>
                                        {format(board.createdAt, 'yyyy-MM-dd')}
                                    </TableCell>

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Box>
            </PerfectScrollbar>
            <TablePagination
                component="div"
                count={boards.length}
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