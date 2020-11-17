import React from "react";
import _ from "lodash";
import './Grid.scss';

export function Grid({grid,items}){
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

export function createGrid({cols=9,rows=9,items}){
    const res = _.times(rows,()=>_.times(cols,()=>0));
    _.forEach(items,item=>{
        const {x,y} = item;
        if(x>=cols || y>= rows) return null;
        res[y][x] = 1;
    })
    return res;
}
