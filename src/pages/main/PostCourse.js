import React from 'react';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

function PostCourse(props) {
    return (
        <Button
            sx={{
                mb:2
            }}
            size="small"
            variant="contained" >코스 등록</Button>
    );
}

export default PostCourse;