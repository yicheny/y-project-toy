import React from 'react';
import { Input } from "y-ui0";
import './FormInput.scss';

function FormInput(props) {
    const {label,component,labelWidth,...rest} = props;
    const Component = component;
    return <div className="ypt-FormInput">
        <span className='label' style={{width:labelWidth}}>{props.label}</span>
        <Component {...rest}/>
    </div>
}
FormInput.defaultProps = {
    label:null,
    component:Input,
    labelWidth:40
}

export default FormInput;
