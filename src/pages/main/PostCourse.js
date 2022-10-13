import React, {useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "react-modal";
import TextField from "@mui/material/TextField";
import defaultAxios from "axios";
import Paper from "@mui/material/Paper";

function PostCourse(props) {

    // polyline 및 시간 거리 체크
    const [polyLine, setPolyLine ] = useState([{
        /*x : 37.5176422,
        y : 126.8990036,*/
        x : '',
        y : '',
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

    const [imageSrc, setImageSrc] = useState([]);

    const [fileInfo, setFileInfo] = useState([]);


    const encodeFileToBase64 = (fileBlob) => {

        const imageLists = fileBlob.target.files;
        const selectedImageURLList = [...imageSrc];

        for (let i = 0; i < imageLists.length; i+=1) {
            const currentImageUrl = URL.createObjectURL(imageLists[i]);

            selectedImageURLList.push(currentImageUrl);
            fileInfo.push({
                    fileInfo,
                    file: imageLists[i],
                    fileLatitude: courseInfo.coordinates.startLatitude,
                    fileLongitude: courseInfo.coordinates.startLongitude,
                    fileSize: imageLists[i].size,
                    fileLoc: '',
                })
        }

        setImageSrc(selectedImageURLList);

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
            top: '10%',
            left: '30%',
            right: 'auto',
            bottom: 'auto',
            width:'45%',
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
            transitRoute+=polyLine[i].y+','+polyLine[i].x+','
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
            {headers: {'content-type': `application/json`}})
            .then(response => {

                console.log('여기 안와요..?' , imageSrc);
                // 사진 첨부.

                if (imageSrc!=='') {
                    console.log('여기 안와요..?2 ' , imageSrc , imageSrc.length);

                    for (let i=0; i < imageSrc.length; i ++) {

                        console.log(fileInfo[i].file , i , ' 번째 파일 등록합니다. ');

                        defaultAxios.post(`/walk/file`,
                            {
                                file:fileInfo[i].file,
                                fileSize: fileInfo[i].fileSize,
                                fileLoc: fileInfo[i].fileLoc,
                                fileLatitude: fileInfo[i].fileLatitude,
                                fileLongitude: fileInfo[i].fileLongitude,
                                coordinatedId: response.data.coordinates_id,
                                userId: window.sessionStorage.getItem("id"),
                                courseId: response.data.courseId
                            },
                            {headers: {'Content-Type': 'multipart/form-data'}})
                            .then(response => {
                                console.log(response);
                                props.clear(true);

                            }).catch(err => {
                            window.alert('서버 오류');
                            console.log("error!!", err);
                        });
                    }
                }

                window.alert('등록 되었습니다.');
                window.location.reload();
                setImageSrc('');
                setPostCourseModalisOpen(false);

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
                            <input hidden type="file" multiple onChange={(e) =>{
                                encodeFileToBase64(e);
                                // encodeFileToBase64(e.target.files[0]);
                                // addImage(e);
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

                        <Paper
                            sx={{
                                mt:3,
                            }}
                            display="flex">
                            {imageSrc.length > 0 ?
                            imageSrc.map((image) => (
                                   <img src={image} width={100} height={100} key={image}/>
                            )) : null}
                        </Paper>

                        {/*<Box
                            sx={{mt:1}}
                            className="preview">
                            {imageSrc && <img width={250} height={250} src={imageSrc} alt="preview-img" />}
                        </Box>*/}

                    </Box>
                </Modal>

            </Box>


            <Box position="absolute"
                 sx={{
                     ml:0,
                     mt:6,
                     zIndex:2
                 }}
            >
                <Button
                    sx={{
                        mb:2,
                        width:'100%'

                    }}
                    size="large"
                    variant="contained"
                    onClick={postCourse}
                >경로등록</Button>
            </Box>
        </Box>
    );
}

export default PostCourse;