import _ from 'lodash'
import Line from "./Line";
import WindowBox from "./WindowBox";
import findShortestPath from "./findShortestPath";

export default class ConnectionPath{
    constructor({grid,connectList}) {
        this.canvas = document.createElement('canvas');
        this.canvas.width  = 2000;//这里获取body动态尺寸进行设置或许会更好一些？
        this.canvas.height = 2000;
        this.windowBox = WindowBox.create(this.canvas);

        _.forEach(connectList,(o)=>{
            const {targetId,sourceId} = o || {};
            const source = document.getElementById(sourceId);
            const target = document.getElementById(targetId);
            if(!source || !target) throw new Error('ConnectionPath抛错：指定元素不存在！');
            const {x:s_x,y:s_y} = source.parentElement.dataset;
            const {x:t_x,y:t_y} = target.parentElement.dataset;
            const path = findShortestPath({
                grid,
                source:[Number(s_x),Number(s_y)],
                target:[Number(t_x),Number(t_y)],
            });
            if(!path) throw new Error('ConnectionPath抛错：不存在连接路径！')
            path.push([t_x,t_y])
            const elementCroods = getElementCroods(path);
            const head = elementCroods.unshift();
            const line = Line.create({canvas:this.canvas,x:head.x,y:head.y,width:2,color:'#8f8f8f'});
            _.forEach(elementCroods,([x,y])=>{
                line.to(x,y);
            });
            return line.end();
        })
    }

    static create(...params){
        return new ConnectionPath(...params);
    }

    clear = () => {
        this.windowBox.clear();
    }
}

function getElementCroods(croods){
    return _.reduce(croods,(acc,crood)=>{
        const [x,y] = crood || [];
        const element = document.querySelector(`.x-${x}.y-${y}`);
        if(!element) return acc;
        const info = element.getBoundingClientRect();
        acc.push([info.x + info.width/2,info.y + info.height/2]);
        return acc;
    },[]);
}
