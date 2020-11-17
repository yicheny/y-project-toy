import React, { useEffect, useMemo } from 'react';
import _ from 'lodash';
import './GridView.scss';
import './Grid.scss';
import ConnectionPath from "./utils/ConnectionPath";

function createGrid({cols=9,rows=9,items}){
    const res = _.times(rows,()=>_.times(cols,()=>0));
    _.forEach(items,item=>{
        const {x,y} = item;
        if(x>=cols || y>= rows) return null;
        res[y][x] = 1;
    })
    return res;
}

function GridView(props) {
    const items = useMemo(()=>{
        return [
            {x:1,y:1,element:<div className='box b1' id='b1'/>},
            {x:4,y:6,element:<div className='box b2' id='b2'/>},
            {x:3,y:4,element:<div className='box wall'/>},
            // {x:4,y:4,element:<div className='box wall'/>},
            {x:5,y:4,element:<div className='box wall'/>},
            {x:6,y:4,element:<div className='box wall'/>},
            {x:7,y:4,element:<div className='box wall'/>},
        ]
    },[]);

    const grid = useMemo(()=>{
        return createGrid({cols:10,rows:10,items})
    },[items]);

    useEffect(()=>{
        const connectList = [
            {sourceId:'b1',targetId:'b2'}
        ]
        const connectPath = ConnectionPath.create({grid,connectList})
        return connectPath.clear;
    },[grid]);

    return <div className='GridView'>
        <Grid items={items} grid={grid}/>
    </div>
}

export default GridView;

function Grid({grid,items}){
    return <div className='y-gird'>
        {
            _.map(grid,(row,y)=>{
                return <div className='row' key={y}>
                    {
                        _.map(row,(col,x)=>{
                            const item = _.find(items,item=>{
                                return item.x === x && item.y === y;
                            });
                            return <div className={`col x-${x} y-${y}`} data-y={y} data-x={x} key={x} >
                                {item ? item.element : null}
                            </div>
                        })
                    }
                </div>
            })
        }
    </div>
}
