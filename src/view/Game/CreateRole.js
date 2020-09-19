import React, { useReducer } from 'react';
import { FormInput } from "../../component";
import { Button, Card, TextArea } from "y-ui0";
import { ls } from "../../utils/LS";

function getInitRole(){
    return {
        name:'默认人物-AAA',
        desc:'无描述'
    }
}

function CreateRole(props) {
    const [info,infoDispatch] = useReducer(infoReducer,getInitRole());

    const setInfo = bind => value => infoDispatch({bind,value});

    return <Card>
        <FormInput label='名称' onChange={setInfo('name')}/>
        <FormInput label='描述' compnent={TextArea } onChange={setInfo('desc')}/>
        <Button primary onClick={handleCreate}>创建</Button>
    </Card>

    function handleCreate(){
        ls.appendWithUpdate('name','roleList',info);
    }
}

export default CreateRole;

function infoReducer(state,action){
    const {bind,value} = action;
    state[bind] = value;
    return {...state};
}
