import React from 'react';
import ReactEcharts from 'echarts-for-react';

const option = {
    tooltip: {},
    animationDurationUpdate: 1500,
    animationEasingUpdate: 'quinticInOut',
    series: [
        {
            type: 'graph',
            layout: 'none',
            symbolSize: 50,
            roam: true,
            label: {
                show: true
            },
            // edgeSymbol: ['none', 'arrow'],
            edgeSymbolSize: [4, 10],
            edgeLabel: {
                fontSize: 20
            },
            data: [{
                name: '节点1',
                x: 100,
                y: 500
            }, {
                name: '节点2',
                x: 300,
                y: 300
            }, {
                name: '节点3',
                x: 300,
                y: 700
            }, {
                name: '节点4',
                x: 500,
                y: 100
            },{
                name: '节点5',
                x: 500,
                y: 500
            }, {
                name: '节点6',
                x: 500,
                y: 900
            }],
            links: [ {
                source: '节点1',
                target: '节点2',
            }, {
                source: '节点1',
                target: '节点3'
            }, {
                source: '节点2',
                target: '节点4'
            }, {
                source: '节点2',
                target: '节点5'
            },{
                source: '节点3',
                target: '节点6'
            }],
        }
    ]
};

function GraphSimple(props) {
    return (<div>
        <ReactEcharts option={option} style={{height:1000}}/>
    </div>);
}

export default GraphSimple;
