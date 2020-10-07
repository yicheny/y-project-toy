import React from 'react';

const mockData = {
    a:1,
    b:2,
    c:3,
}

function Tree(props){
    const {data} = props;
    console.log(data);
    return <div className='pt-tree'>
        Tree
    </div>
}

function TreeView(){
    return <div>
        <Tree data={mockData}/>
    </div>
}

export default TreeView;