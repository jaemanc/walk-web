import React from 'react';
import {createTheme, ThemeProvider} from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import CourseList from "./CourseList";

const mdTheme = createTheme();

const Course = () => {

    const [open, setOpen] = React.useState(true);

    const toggleDrawer = (evt) => {
        setOpen(!open);
    }

    return (
                <Box sx={{
                    mt:1
                    , ml:1
                    , mr:1
                    , width : '80%'
                }}>
                    {/*검색 툴바 */}

                    {/* 리스트 목록 */}
                    {/*<BoardList/>*/}
                    <CourseList/>
                </Box>


    );
}

export default Course;