import React, { useRef, useState } from 'react';
const vm = require('vm');

function CatchError(props) {
    const [error,setError] = useState();
    const codeRef = useRef();

    return (<div>
        <textarea onChange={handleChange}/>
        <button onClick={runCode}>执行代码</button>
        错误：{error}
    </div>);

    function runCode(){
        try{
            vm.runInThisContext(codeRef.current);
        }catch (e){
            // console.log('捕捉到错误',e);
            setError(e.toString());
        }
    }

    function handleChange(e){
        e.stopPropagation();
        e.preventDefault();
        codeRef.current = e.target.value;
    }
}

export default CatchError;
