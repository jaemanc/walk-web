import React, {useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import CourseDetailMap from "./CourseDetailMap";

const CourseDetail = (props) => {
    return (
        <>
            {/* 따봉 버튼 */}

            {/* 지도  */}
            <CourseDetailMap coordinatesId={props.coordinatesId}/>

            {/* 사용자 정보*/}
        </>
    );
}

export default CourseDetail;