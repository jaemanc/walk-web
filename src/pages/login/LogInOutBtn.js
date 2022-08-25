import React,{useState} from 'react';
import Button from '@mui/material/Button';
import Modal from "react-modal";
import TextField from '@mui/material/TextField';
import Box from "@mui/material/Box";
import PostLogin from "./PostLogin";

const customStyles = {
    content: {
        top: '30%',
        left: '35%',
        right: 'auto',
        bottom: 'auto',

    },
    overlay: {
        zIndex: 1,
        background: "#3F5477"
    }
}

Modal.setAppElement(document.getElementById('root'));

const LogInOutBtn = (props) => {
    let subtitle;
    const [modalisOpen, setisOpen] = React.useState(false);
    const [logoutModalisOpen, setLogoutModalisOpen] = React.useState(false);
    const [loginStatus, setLoginStatus] = useState(props.loginStatus);
    const [LoginData, setLoginData] = useState({
        // 초기 셋팅
        email:"",
        password:""
    });

    function handleSubmit (e) {
        console.log("e 값이 안오는것같죠>?? ", e.target, e.target.value);
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        console.log("e의 데이터들",{
            email: data.get(`email`),
            password: data.get(`password`),
        });

        // promise로 기다려야한다.
        PostLogin(data).then( (flag) =>{

            console.log(flag);

            if (flag){
                console.log("로그인 성공!");
            } else {
                console.log("로그인 실패!!");
                setLoginData({
                    password: 'ERROR!',
                    email: '계정을 확인해주세요!'
                });
            }}
        ).catch(err=>{
            console.log(" server err... " , err);
        })
    };


    function openModal() {
        // console.log(" open Modal.. login status : ", loginStore.getState());

        console.log("open Modal!!!! ");

        // if (loginStore.getState()) {
        //     console.log('login 상태입니다. logout modal을 호출해야 합니다. ');
        //     setLogoutModalisOpen(true);
        // } else {
        //     console.log(' logout 상태입니다. login modal을 호출합니다. ');
        //     setisOpen(true);
        // }

    }

    function afterOpenModal() {
        console.log(' 모달 열린 이후!');
        subtitle.style.color = '#a75ac9';
    }

    function closeModal() {
        console.log(" Modal close ");
        setisOpen(false);
    }
    function closeLogoutModal() {
        console.log(" Modal close ");
        // setisOpen(false);
        setLogoutModalisOpen(false);
    }

    const onLogout = (e) => {

        console.log(' 로그아웃 버튼을 누른다면..?' , e);

        if (loginStatus) {
            setLoginStatus((current)=> (!current));
            console.log(" CHECK VALUE : 1 ", loginStatus);
        } else {
            setLoginStatus((current)=> (!current));
            console.log(" CHECK VALUE : 2 ", loginStatus);
            // 로그인 쏠 것.
        }

        sessionStorage.removeItem("id");
        sessionStorage.removeItem("email");

        console.log('로그아웃합니다.');
    }

    return (
        <>
            <Button
                    className="modalBtn"
                    color="primary"
                    variant="contained"
                    onClick={openModal}>{props.loginStatus !==true ? "Logout" : "Login"}</Button>
                <Modal
                    isOpen={modalisOpen}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Welcome</h2>
                    {/*<Button onClick={closeModal}> close </Button>*/}

                    <Box
                        sx={{
                            m: 3
                        }}
                        textAlign='center' component="form" onSubmit={handleSubmit}>

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="email"
                                name="email"
                                autoComplete="email"
                                value={LoginData.email || ''}
                                onChange={e => setLoginData({
                                    email: e.target.value,
                                    password: LoginData.password
                                }) }
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={LoginData.password|| ''}
                                onChange={e => setLoginData({
                                    email: LoginData.email,
                                    password: e.target.value
                                }) }
                            />
                        <Button
                            type="submit"
                            className="modalBtn"
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


            {/*  LogoutModal   */}
            <Modal
                isOpen={logoutModalisOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Logout 하시겠습니까?</h2>
                <Box
                    sx={{
                        m: 3
                    }}
                    textAlign='center' component="form" onSubmit={handleSubmit}>
                    <Button
                        type="submit"
                        className="modalBtn"
                        color="primary"
                        variant="contained"
                        sx={{mr:3}}
                        onClick={onLogout}
                    >Go</Button>
                    <Button
                        className="modalBtn"
                        color="primary"
                        variant="contained"
                        onClick={closeLogoutModal}
                    >Cancel</Button>
                </Box>
            </Modal>

                {/*<Button*/}
                {/*    color="primary"*/}
                {/*    variant="contained"*/}
                {/*    toggle={testFunction}*/}
                {/*    onClick={(event) => {*/}
                {/*        console.log(" 로그아웃 버튼을 누름 :: ", sessionStorage.getItem("email"));*/}
                {/*    }}*/}
                {/*>*/}
                {/*    {loginStatus === true ? "Logout" : "Login"}*/}
                {/*</Button>*/}

        </>
    )
}

export default LogInOutBtn;