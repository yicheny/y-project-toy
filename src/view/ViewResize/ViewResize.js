import React from 'react';
import RLResize from "./RLResize";
import BTResize from "./BTResize";
import './ViewResize.scss';

function ViewResize(props) {
    return <div className='ViewResize'>
        <BTResize/>
        <RLResize/>
    </div>
}

export default ViewResize;
