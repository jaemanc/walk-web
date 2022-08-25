import React from 'react';
import {TailSpin} from 'react-loader-spinner';


const Loading = () => {

    return (
        <div>
            <TailSpin
                height = "50"
                width = "100"
                color = 'green'
                wrapperStyle
                wrapperClass
            />
        </div>
    );
}

export default Loading;