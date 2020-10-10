import React, {useEffect} from 'react';
import clsx from "clsx";
import _ from 'lodash';
import {Tooltip} from 'y-ui0';
import {jsPlumb} from 'jsplumb'
import './JsPlumb-demo2.scss';

const mockData = [
    [{name:'数据库',level:1}],
    _.times(2,(i)=>({name:`核心服务${i}`,level:2})),
    _.times(3,(i)=>({name:`消息中间件${i}`,level:3})),
    _.times(3,(i)=>({name:`中间件${i}`,status:i===0,level:4})),
    _.times(4,(i)=>({name:`接口${i}`,level:5})),
    _.times(6,(i)=>({name:`外部程序${i}`,level:6})),
];

function JsPlumbDemo2(props) {

    useEffect(()=>{
        let plumbIns = jsPlumb.getInstance()

        let relations = [
            ['数据库', '核心服务0'],
            ['数据库', '核心服务1'],
            ['核心服务0', '消息中间件0'],
            ['核心服务0', '消息中间件1'],
            ['核心服务1', '消息中间件2'],
            ['消息中间件0', '中间件0'],
            ['消息中间件1', '中间件1'],
            ['消息中间件2', '中间件2'],
            ['中间件0', '接口0'],
            ['中间件1', '接口1'],
            ['中间件1', '接口2'],
            ['中间件2', '接口3'],
            ['接口0','外部程序0'],
            ['接口1','外部程序2'],
            ['接口2','外部程序3'],
            ['接口3','外部程序5'],
            ['中间件1', '外部程序1'],
            ['中间件2', '外部程序4'],
            // ['中间件2', '外部程序3'],
            // ['中间件0', '外部程序2'],
            // ['接口2', '外部程序0'],
            // ['数据库', '中间件1'],
        ]

        plumbIns.ready(function () {
            for (let item of relations) {
                const [source,target] = item;
                plumbIns.connect({
                    source,
                    target
                }, getDefaultProps(source,target))
            }
        })

        function getDefaultProps(source,target){
            const levelOffset = getItem(target).level - getItem(source).level;
            const midpoint =  levelOffset === 1 ? 0.278 : 0.1;

            return {
                anchor: ['Left', 'Right', 'Top', 'Bottom', [0.3, 0, 0, -1], [0.7, 0, 0, -1], [0.3, 1, 0, 1], [0.7, 1, 0, 1]],
                connector:['Flowchart',{midpoint}],
                endpoint: 'Blank',
                paintStyle: { stroke: '#909399', strokeWidth: 2 }, // connector
                overlays: [ ['Arrow', { width: 8, length: 8, location: 1 }] ] // overlay
            }

            function getItem(name){
                return mockData.flat(1).find(x=>(x.name===name)) || {};
            }
        }

        return plumbIns.deleteEveryConnection;
    },[])

    return (<div className='JsPlumbDemo2'>
        {
            mockData.map((x,i)=>{
                return <div className="row" key={i}>
                    {
                        x.map((x2,i2)=>{
                            return  <div className={clsx("col",{error:x2.status})} key={i2} id={x2.name}>
                                {
                                    x2.status ? <Tooltip title='报错信息'> <div className="icon"/> </Tooltip>
                                        : <div className="icon"/>
                                }
                                <div className="name">{x2.name}</div>
                            </div>
                        })
                    }
                </div>
            })
        }
        </div>);
}

export default JsPlumbDemo2;
