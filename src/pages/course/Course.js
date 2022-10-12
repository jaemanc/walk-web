import React, {useState} from 'react';
import Box from "@mui/material/Box";
import CourseList from "./CourseList";
import CourseSearch from "./CourseSearch";


const Course = () => {

    let toDay = new Date();
    const [searchKey, setSearchKey] = useState( {
        count : 10,
        page : 1,
        searchType : 'ALL',
        searchValue: '',
        startDate : (toDay.getFullYear()-1)+((toDay.getMonth()+1).toString().padStart(2,"0"))+toDay.getDate().toString().padStart(2,"0"),
        endDate : toDay.getFullYear()+((toDay.getMonth()+1).toString().padStart(2,"0"))+toDay.getDate().toString().padStart(2,"0"),
    });

    const [course, setCourse] = useState(
        [{
            coordinates :'',
            coordinates_id:0,
            courseId:'',
            courseKeyword:'',
            courseName:'',
            fileId:'',
            isDeleted:'',
            userName:'',
            updatedAt:'',
            user:'',
            userId:'',
            filePath:'',
        }]
    );

    return (
        <Box>
            <CourseSearch setValue={setSearchKey} setCourse={setCourse}/>
            <CourseList courseList={course}/>
        </Box>

    );
}

export default Course;