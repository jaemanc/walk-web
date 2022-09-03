import React, {useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import axios from "axios";


const FindPath = (props) => {

    const [startLocation, setStartLocation] = useState(
        {
            x:"37.57275",
            y:"126.8990034"
        }
    );

    const [destLocation, setDestLocation] = useState(
        {
            x:"38.57277",
            y:"127.8990035"
        }
    );
    axios.get(`/walk/course`
        ,{
            params:{
                start: `${startLocation.y}+','+${startLocation.x}`,
                goal: `${destLocation.y}+','+${destLocation.x}`,
                option: ``,
            }
        }
    )
        .then(response => {
            console.log(' response data >>> ', response);

            if (response.status === 200) {
            } else {
                window.alert(' 검색 결과가 존재하지 않습니다. ');
                console.log(' 검색 결과가 존재하지 않습니다. ');
            }
        }).catch(err => {
        console.log("error!!", err);
    });



    // 경로 요청 예시 :
    //  curl "https://naveropenapi.apigw.ntruss.com/map-direction/v1/driving?start=127.1058342,37.359708&goal=129.075986,35.179470&option=trafast" \
    // 	-H "X-NCP-APIGW-API-KEY-ID: {애플리케이션 등록 시 발급받은 client id 값}" \
    // 	-H "X-NCP-APIGW-API-KEY: {애플리케이션 등록 시 발급받은 client secret값}" -v
    // 경로 요청 응답 예시 :
    /*
    {
    "code": 0,
    "message": "길찾기를 성공하였습니다.",
    "currentDateTime": "2018-12-21T14:45:34",
    "route": {
        "trafast": [
            {
                "summary": {
                    "start": {
                        "location": [
                            127.1058342,
                            37.3597078
                        ]
                    },
                    "goal": {
                        "location": [
                            129.0759853,
                            35.1794697
                        ],
                        "dir": 2
                    },
                    "distance": 382403,
                    "duration": 15372873,
                    "bbox": [
                        [
                            127.0833901,
                            35.1793188
                        ],
                        [
                            129.0817364,
                            37.3599059
                        ]
                    ],
                    "tollFare": 24500,
                    "taxiFare": 319900,
                    "fuelPrice": 46027
                },
                "path": [
                    [
                        127.1059968,
                        37.3597093
                    ],

                    ....

                    [
                        129.0764276,
                        35.1795108
                    ],
                    [
                        129.0762855,
                        35.1793188
                    ]
                ],
                "section": [
                    {
                        "pointIndex": 654,
                        "pointCount": 358,
                        "distance": 22495,
                        "name": "죽양대로",
                        "congestion": 1,
                        "speed": 60
                    },
                    {
                        "pointIndex": 3059,
                        "pointCount": 565,
                        "distance": 59030,
                        "name": "낙동대로",
                        "congestion": 1,
                        "speed": 89
                    },
                    {
                        "pointIndex": 4708,
                        "pointCount": 433,
                        "distance": 23385,
                        "name": "새마을로",
                        "congestion": 1,
                        "speed": 66
                    }
                ],
                "guide": [
                    {
                        "pointIndex": 1,
                        "type": 3,
                        "instructions": "정자일로1사거리에서 '성남대로' 방면으로 우회전",
                        "distance": 21,
                        "duration": 4725
                    },
                    {
                        "pointIndex": 8,
                        "type": 3,
                        "instructions": "불정교사거리에서 '수원·용인, 미금역' 방면으로 우회전",
                        "distance": 186,
                        "duration": 42914
                    },

 					....

                    {
                        "pointIndex": 6824,
                        "type": 14,
                        "instructions": "연산교차로에서 '서면교차로, 시청·경찰청' 방면으로 오른쪽 1시 방향",
                        "distance": 910,
                        "duration": 125240
                    },
                    {
                        "pointIndex": 6842,
                        "type": 88,
                        "instructions": "목적지",
                        "distance": 895,
                        "duration": 111333
                    }
                ]
            }
        ]
    }
}

     */





    useEffect(()=>{
        console.log(' 길을 찾든가 말든가... 내 알바 아니니께..!!');
        console.log(' 찾고 싶은 경로의 출발점 :: ' , startLocation );
        console.log(' 찾고 싶은 경로의 도착점 :: ' , destLocation );
    },[props]);

    return (

        <Box>
            <Button
                sx={{
                    mb:2
                }}
                size="small" variant="contained"
            > 길 찾기</Button>

        </Box>

    );
}

export default FindPath;