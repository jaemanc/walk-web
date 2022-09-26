import React, {useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {
    Avatar,
    InputAdornment,
    SvgIcon,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField,
    Typography
} from "@mui/material";
import Search from "@mui/icons-material/Search";
import Loading from "../common/Loading";
import axios from "axios";
import PerfectScrollbar from "react-perfect-scrollbar";
import {Link} from "react-router-dom";
import TablePagination from "@mui/material/TablePagination";

const CourseList = (props) => {

    const [course, setCourse] = useState(
        [{
            coordinates :'',
            coordinates_id:'',
            courseId:'',
            courseKeyword:'',
            courseName:'',
            fileId:'',
            isDeleted:'',
            updater:'',
            updatedAt:'',
            user:'',
            userId:''
        }]
    );

    const [selecCourseId, setSelecCourseId] = React.useState(0);

    useEffect(() => {
        if (selecCourseId!==0) {
            document.getElementById(selecCourseId).setAttribute('style','background: #2596be');
            document.getElementById(selecCourseId).setAttribute('style','height: 200px');

        }
    },[selecCourseId]);

    useEffect(()=>{
        setCourse(props.courseList);

        console.log('호방하다',course);

    },[props.courseList]);

    return (
        <Box sx={{
            width: 1,
            mt: 2,
            ml: 3,
        }}>
            <PerfectScrollbar>
                <Box sx={{minWidth: 1230}}>
                    <Table>
                        <TableHead>
                            <TableRow sx={{
                                ml:1
                            }}>
                                <TableCell>
                                    course
                                </TableCell>
                                <TableCell>
                                    preview
                                </TableCell>
                                <TableCell>
                                    Name
                                </TableCell>
                                <TableCell>
                                    DDaBong
                                </TableCell>
                                <TableCell>
                                    user
                                </TableCell>
                                <TableCell>
                                    Date
                                </TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {/* { board.slice(0, limit).map((board) => (*/}
                            { course.map((course) => (
                                <TableRow
                                    hover
                                    id={course.courseId}
                                    key={course.courseId}
                                    onClick={(e) => {
                                        if (document.getElementById(selecCourseId) !== null) {
                                            document.getElementById(selecCourseId).setAttribute('style','background: white');
                                        }
                                        setSelecCourseId((courseId) => {
                                            return course.courseId
                                        })
                                    }}
                                >
                                    <TableCell padding="checkbox"
                                               sx={{width:"7%", alignItems:"center"}}
                                    >
                                        {course.courseName}
                                    </TableCell>

                                    {/*  미리보기 이미지 호출 필요. */}
                                    <TableCell
                                        sx={{width:"7%"}}
                                    >
                                        <Box
                                            sx={{
                                                alignItems: 'center',
                                                display: 'flex'
                                            }}
                                        >
                                            <Link to={`/walk/file/${course.courseId}`}>
                                                <Avatar
                                                    sx={{ mr: 2 }}
                                                >
                                                    {course.courseKeyword}
                                                </Avatar>
                                            </Link>
                                        </Box>
                                    </TableCell>
                                    <TableCell
                                        sx={{width:"15%", alignItems:"center"}}
                                    >
                                        <Link to={`/post/${course.courseId}`}>
                                            {course.courseName}
                                        </Link>
                                    </TableCell>
                                    <TableCell
                                        sx={{width:"10%", alignItems:"center"}}
                                    >
                                        <Link to={`/post/${course.courseId}`}>
                                            {course.courseName}
                                        </Link>
                                    </TableCell>
                                    <TableCell
                                        sx={{width:"5%", alignItems:"center"}}
                                    >
                                        <Link to={`/post/${course.courseId}`}>
                                            {course.courseName}
                                        </Link>
                                    </TableCell>
                                    <TableCell
                                        sx={{width:"10%", alignItems:"center"}}
                                    >
                                        <Link to={`/post/${course.courseId}`}>
                                            날짜..?
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Box>
            </PerfectScrollbar>
            <TablePagination
                component="div"
                // count={10}
                // onPageChange={handlePageChange}
                // onRowsPerPageChange={handleLimitChange}
                // page={page}
                // rowsPerPage={limit}
                rowsPerPageOptions={[5, 10, 25]}
            />



        </Box>
    );
}

export default CourseList;