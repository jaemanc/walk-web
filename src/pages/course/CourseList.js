import React, {useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import {
    Avatar,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow
} from "@mui/material";
import PerfectScrollbar from "react-perfect-scrollbar";
import TablePagination from "@mui/material/TablePagination";
import Collapse from '@mui/material/Collapse';
import TableContainer from '@mui/material/TableContainer';
import CourseDetail from "./CourseDetail";


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
            userName:'',
            updatedAt:'',
            user:'',
            userId:'',
            filePath:''
        }]
    );
    const [selecCourseId, setSelecCourseId] = React.useState(0);
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(10);

    useEffect(() => {
        if (selecCourseId!==0) {
            document.getElementById(selecCourseId).setAttribute('style','background: #2596be');
            // document.getElementById(selecCourseId).setAttribute('style','height: 500px');
        }
    },[selecCourseId]);

    useEffect(()=>{
        setCourse(props.courseList);
    },[props.courseList]);


    const handleLimitChange = (event) => {
        console.log(' event.target.value : ' , event.target.value);
        setLimit(event.target.value);
    };

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };

    function DetailRow (props) {

        const [detailView, setDetailView] = React.useState(false);
        return (
            <React.Fragment>
                    <TableRow
                        hover
                        id={props.course.courseId}
                        key={props.course.courseId}
                        onClick={(e) => {
                            if (document.getElementById(selecCourseId) !== null) {
                                document.getElementById(selecCourseId).setAttribute('style','background: white');
                            }
                            setSelecCourseId((courseId) => {
                                return props.course.courseId
                            })
                            setDetailView(!detailView)
                        }}
                    >
                         {/*course*/}
                        <TableCell
                            align="center"
                            sx={{
                                width:"7%"
                                ,alignItems:"center"
                                ,verticalAlign:"center"
                            }}
                        >
                            {props.course.courseName}
                        </TableCell>

                         {/*preview  미리보기용 S3 이미지 호출*/}
                        <TableCell
                            align="center"
                            sx={{
                                width:"7%"
                                ,alignItems:"center"
                                ,verticalAlign:"center"
                            }}
                        >
                            <img align="center"
                                 width={60}
                                 height={60}
                                 src={props.course.filePath}/>
                        </TableCell>

                         {/*Name*/}
                        <TableCell
                            align="center"
                            sx={{
                                width:"13%"
                                ,alignItems:"center"
                                ,verticalAlign:"top"
                            }}
                            onClick={() => setDetailView(!detailView)}
                        >

                            {props.course.courseName}
                        </TableCell>

                         {/*keyword*/}
                        <TableCell
                            align="center"
                            sx={{
                                width:"10%"
                                ,alignItems:"center"
                                ,verticalAlign:"center"
                            }}
                        >
                            {props.course.courseKeyword}
                        </TableCell>

                         {/*userName*/}
                        <TableCell
                            align="center"
                            sx={{
                                width:"5%"
                                ,alignItems:"center"
                                ,verticalAlign:"center"
                            }}
                        >
                            {props.course.userName}
                        </TableCell>

                         {/*Date*/}
                        <TableCell
                            align="center"
                            sx={{
                                width:"10%"
                                ,alignItems:"center"
                                ,verticalAlign:"center"
                            }}
                        >
                            {props.course.updatedAt}
                        </TableCell>


                        {/* css가 문제네.. */}
                        <TableCell
                            sx={{
                                width:"100%"
                            }}
                        >
                            <Collapse in={detailView} timeout="auto" unmountOnExit>
                                {/* 좌표 데이터로 지도 데이터 설정. */}
                                <CourseDetail coordinatesId={props.course.coordinates_id} />
                            </Collapse>
                        </TableCell>




                    </TableRow>
            </React.Fragment>
        );
    }

    return (
        <Box sx={{
            width: 1,
            mt: 2,
            ml: 3,
        }}>
            <PerfectScrollbar>
                <Box sx={{minWidth: 1230}}>
                    <TableContainer>
                        <Table padding='none'>
                            <TableHead>
                                <TableRow sx={{
                                    ml:1,
                                    alignItems:"center"
                                }}>
                                    <TableCell align="center">
                                        course
                                    </TableCell>
                                    <TableCell align="center">
                                        preview
                                    </TableCell>
                                    <TableCell align="center">
                                        Name
                                    </TableCell>
                                    <TableCell align="center">
                                        Keyword
                                    </TableCell>
                                    <TableCell align="center">
                                        user
                                    </TableCell>
                                    <TableCell align="center">
                                        Date
                                    </TableCell>

                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {course.map((course) => (
                                    <DetailRow course={course} key={course.courseId}/>
                                ))}
                           </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </PerfectScrollbar>
            <TablePagination
                component="div"
                count={10}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleLimitChange}
                page={page}
                rowsPerPage={limit}
                rowsPerPageOptions={[5, 10, 25]}
            />

        </Box>
    );
}

export default CourseList;