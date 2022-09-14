import React, {useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "react-modal";
import TextField from "@mui/material/TextField";
import defaultAxios from "axios";

function PostCourse(props) {

    // polyline 및 시간 거리 체크
    const [polyLine, setPolyLine ] = useState([{
        x : 37.5176422,
        y : 126.8990036,
        time: 0,
        distance : 0,
    }]);

    const [courseInfo, setCourseInfo] = React.useState({
        courseName : '',
        courseKeyword : '',
        time: 0,
        distance : 0,
        coordinates : {
            destLatitude : '',
            destLongitude : '',
            startLatitude : '',
            startLongitude : '',
            transitRoute : '',
        }
    });

    useEffect(()=>{

        setPolyLine({
            ...props.polyLine
        })

        setCourseInfo({
            ...courseInfo,
            coordinates: {
                destLatitude : props.selectLoc.endX,  //위도 - > 보통 37로 시작 ( 우리나라 )
                destLongitude : props.selectLoc.endY,
                startLatitude : props.selectLoc.startX,
                startLongitude : props.selectLoc.startY,
            },
            time : Object.keys(props.polyLine) > 1 ?   props.polyLine[1].time : 0,
            distance: Object.keys(props.polyLine) > 1 ? props.polyLine[1].distance : 0,
        })
    },[props])

    const [postCourseModalisOpen, setPostCourseModalisOpen] = React.useState(false);

    const customStyles = {
        content: {
            top: '30%',
            left: '35%',
            right: 'auto',
            bottom: 'auto',
        },
        overlay: {
            zIndex: 1,
        }
    }

    function closeModal () {
        setPostCourseModalisOpen(false);
    }

    function postCourse() {
        setPostCourseModalisOpen(true);
        // modal open 기능 추가.
        // client 단에서 처리 =
        // course name / course keyword /  --> 모달창으로 지정필요...? ( tb_course )
    }

    function handleSubmit(e) {
        e.preventDefault();

        if (courseInfo.time === 0 ) {
            window.alert(' 경로를 찾은 이후에 등록해주십시오.');
            setPostCourseModalisOpen(false);
        }

        let transitRoute = '';

        for (let i=0; i < Object.keys(polyLine).length; i ++) {
            transitRoute+=polyLine[i].x+','+polyLine[i].y
        }

        setCourseInfo((courseInfo) => {
            return {
                ...courseInfo
            }
        })

        console.log(courseInfo.time,' // ',courseInfo.distance);

        defaultAxios.post(`/walk/course`,
            {
                courseName : courseInfo.courseName,
                courseKeyword : courseInfo.courseKeyword,
                coordinates : {
                    destLatitude : courseInfo.coordinates.destLatitude,
                    destLongitude : courseInfo.coordinates.destLongitude,
                    startLatitude : courseInfo.coordinates.startLatitude,
                    startLongitude : courseInfo.coordinates.startLongitude,
                    transitRoute : transitRoute,
                },
                time: courseInfo.time,
                distance : courseInfo.distance,
            },
            {headers: {"Content-Type": `application/json`}})
            .then(response => {
                window.alert('등록 되었습니다.');
                setPostCourseModalisOpen(false);


                // 초기화가 필요할듯..?


            }).catch(err => {
                window.alert('서버 오류');
                console.log("error!!", err);
            });
    }

    return (
        <Box>
            <Box>
                <Modal
                    isOpen={postCourseModalisOpen}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <h2>현재 경로 등록 요청</h2>
                    <Box
                        sx={{
                            m: 3
                        }}
                        textAlign='center' component="form" onSubmit={handleSubmit}>

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="courseName"
                            label="코스 이름"
                            name="courseName"
                            value={courseInfo.courseName || ''}
                            onChange={e =>{
                                setCourseInfo({
                                    ...courseInfo,
                                    courseName: e.target.value,
                                })
                            }}
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            id="courseKeyword"
                            label="키워드"
                            name="courseKeyword"
                            value={courseInfo.courseKeyword || ''}
                            onChange={e => setCourseInfo({
                                ...courseInfo,
                                courseKeyword: e.target.value
                            }) }
                        />

                        <Button
                            type="submit"
                            color="primary"
                            variant="contained"
                            sx={{mr:3}}
                        >Go</Button>
                        <Button
                            className="modalBtn"
                            color="primary"
                            variant="contained"
                            onClick={closeModal}
                        >Cancel</Button>
                    </Box>
                </Modal>

            </Box>


            <Button
                sx={{
                    mb:2,
                    width:'100%'
                }}
                size="small"
                variant="contained"
                onClick={postCourse}
            >경로등록</Button>
        </Box>
    );
}

export default PostCourse;