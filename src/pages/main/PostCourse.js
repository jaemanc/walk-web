import React from 'react';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

function PostCourse(props) {
    return (
        <Button
            sx={{
                mb:2,
                width:'100%'
            }}
            size="small"
            variant="contained" >경로기록</Button>
    );
}

export default PostCourse;