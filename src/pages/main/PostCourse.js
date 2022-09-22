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

    const [imageSrc, setImageSrc] = useState('');

    const encodeFileToBase64 = (fileBlob) => {

        // 파일 경로 및 파일 이름.
        console.log(fileBlob.target.value);
        console.log(fileBlob.target.files[0].size);

        const reader = new FileReader();
        reader.readAsDataURL(fileBlob.target.files[0]);
        return new Promise((resolve) => {
            reader.onload = () => {
                setImageSrc(reader.result);
                resolve();
            };
        });
    };

    useEffect(()=>{

        setPolyLine({
            ...props.polyLine
        })

        setCourseInfo((courseInfo) => {
            return {
                ...courseInfo,
                coordinates: {
                    destLatitude : props.selectLoc.endX,  //위도 - > 보통 37로 시작 ( 우리나라 )
                    destLongitude : props.selectLoc.endY,
                    startLatitude : props.selectLoc.startX,
                    startLongitude : props.selectLoc.startY,
                },
                time : Object.keys(props.polyLine).length > 1 ? props.polyLine[1].time : 0,
                distance: Object.keys(props.polyLine).length > 1 ? props.polyLine[1].distance : 0,
            }
        })

    },[props.polyLine])

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

        let transitRoute = '';

        for (let i=0; i < Object.keys(polyLine).length; i ++) {
            transitRoute+=polyLine[i].x+','+polyLine[i].y+','
        }

        console.log(courseInfo);



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
                time: props.polyLine[1].time,
                distance : props.polyLine[1].distance,
                userId : sessionStorage.getItem("id"),
            },
            {headers: {"Content-Type": `application/json`}})
            .then(response => {
                window.alert('등록 되었습니다.');
                setImageSrc('');
                setPostCourseModalisOpen(false);
                props.clear(true);
                window.location.reload();

            }).catch(err => {
                window.alert('서버 오류');
                console.log("error!!", err);
            });

        if (imageSrc!=='') {
            // 사진이 첨부 되었다면,
            defaultAxios.post(`/walk/file`,
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
                    setImageSrc('');
                    setPostCourseModalisOpen(false);
                    props.clear(true);
                    window.location.reload();

                }).catch(err => {
                window.alert('서버 오류');
                console.log("error!!", err);
            });
        }
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
                            required={false}
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
                            required={false}
                            value={courseInfo.courseKeyword || ''}
                            onChange={e => setCourseInfo({
                                ...courseInfo,
                                courseKeyword: e.target.value
                            }) }
                        />

                        <Button
                            type="file"
                            sx={{mr:3}}
                            color="primary"
                            variant="contained"
                            component="label"
                        >
                            사진 첨부
                            <input hidden type="file" onChange={(e) =>{
                                encodeFileToBase64(e);
                                // encodeFileToBase64(e.target.files[0]);
                            }}/>
                        </Button>

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

                        <Box
                            sx={{mt:1}}
                            className="preview">
                            {imageSrc && <img width={250} height={250} src={imageSrc} alt="preview-img" />}
                        </Box>

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