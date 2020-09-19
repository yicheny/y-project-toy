import React, { useRef, useState } from 'react';
import { Button, TextArea } from "y-ui0";

const vm = require('vm');

function CatchError(props) {
    const [error,setError] = useState();
    const codeRef = useRef();

    return (<div>
        <TextArea onChange={handleChange}/>
        <Button primary onClick={runCode}>执行代码</Button>
        错误：{error}
    </div>);

    function runCode(){
        setError(null);
        try{
            vm.runInThisContext(codeRef.current);
        }catch (e){
            setError(e.toString());
        }
    }

    function handleChange(v){
        codeRef.current = v;
    }
}

export default CatchError;
