import React from 'react';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";


function UserDetailFile(props) {
    return (
        <Box>

            {/* 이미지를 4X4 배열로 나열해서 보여주도록 - 최신 이미지부터 AWS S3와 연계 ( 서버 )  */}
            <Typography component="h1" variant="h5">
                files... images...
            </Typography>

        </Box>

    );
}

export default UserDetailFile;