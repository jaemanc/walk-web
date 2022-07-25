import React, {useEffect} from 'react';
import ReactDOM from "react-dom";

const useNotification = (title, options) => {
    if (!("Notification" in window)) {
        // 윈도우 알림이 없다면 => 윈도우 환경이 아니라면??
        console.log("NOTIFICATION IN WINDOW NOT::::: ");
        return;
    }

    const fireNotif = () => {
        if (Notification.permission !== "granted") {
            Notification.requestPermission().then(permission => {
                if(permission === "granted") {
                    console.log(" permission granted ...  ", permission);
                    new Notification(title, options);
                } else {
                    console.log(" permission :: " , permission , " permission denied or default...  ");
                    return;
                }
            }).catch(err => {
                console.log( " not work requestpermission ", err)
            });
        } else {
            console.log("재요청 체크 1");

            // 이거 왜 동작을 안하냐..?
            Notification.requestPermission();

            console.log("재요청 체크 2");



            new Notification(title, options);
        }
    };
    return fireNotif;
};

const RhookUseNotification = () => {
    const triggerNotif = useNotification("can i steal your kimchi ",{body: " I Love Kimchi!! "});
    return (
        <div >
            <button onClick={triggerNotif}>Hello</button>
        </div>
    );
}

export default RhookUseNotification;