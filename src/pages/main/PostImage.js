import React from 'react';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

function PostImage(props) {
    return (
        <Box>
            {/* s3 스토리지와 연계해서 등록 할 예정
                경로 : 버킷 / 사용자 아이디 / 위도 경도 등이 들어가야 나중에 찾을 때 유용할듯
            */}
            <Button size="small" variant="contained" > 사진 첨부</Button>
        </Box>
    );
}

export default PostImage;