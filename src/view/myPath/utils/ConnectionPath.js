import _ from 'lodash'
import Line from "./Line";
import WindowBox from "./WindowBox";
import findShortestPath from "./findShortestPath";

export default class ConnectionPath{
    constructor({grid,connectList,onError,hlCrood}) {
        this.initCanvas();

        this.grid = grid;
        this.connectList = connectList;
        this.onError = onError;
        this.hlCrood = hlCrood;

        this.render(hlCrood);
    }

    static create(...params){
        return new ConnectionPath(...params);
    }

    initCanvas = () => {
        this.canvas = document.createElement('canvas');
        this.canvas.width  = 2000;//这里获取body动态尺寸进行设置或许会更好一些？
        this.canvas.height = 2000;
        this.windowBox = WindowBox.create(this.canvas);
    }

    render = ()=>{
        try{
            _.forEach(this.renderList,(o)=>{
                const {x1, y1, x2, y2,isHl} = o;
                const path = getPath({ x1, y1, x2, y2, grid:this.grid });
                const browerCroods = getElementBrowerCroods(path);
                const head = browerCroods.unshift();
                const line = Line.create({canvas:this.canvas,x:head.x,y:head.y,width:2,color:isHl ? '#00FF00' : '#8f8f8f'});
                _.forEach(browerCroods,([x,y])=>{
                    line.to(x,y);
                });
                return line.end();
            })
        }catch(e){
            if(!_.isFunction(this.onError)) return console.error('ConnectionPath渲染报错：',e);
            this.onError(e);
        }
    }

    get renderList(){
        const [h_x,h_y] = this.hlCrood || [-1,-1];
        const hlConnectList = [];
        const normalConnectList = [];

        _.forEach(this.connectList,o=>{
            const [x1, y1, x2, y2] = getCroods(o);
            const isHl = (x1===h_x && y1 === h_y) || (x2===h_x && y2 === h_y);
            const info = {x1,y1,x2,y2,isHl};
            return isHl ? hlConnectList.push(info) : normalConnectList.push(info);
        })

        return normalConnectList.concat(hlConnectList);
    }

    clear = () => {
        this.windowBox.clear();
    }

}

//
function getCroods(o){
    const {targetId,sourceId} = o || {};
    const source = document.getElementById(sourceId);
    const target = document.getElementById(targetId);
    if(!source || !target) throw new Error('ConnectionPath抛错：指定元素不存在！');
    const {x:s_x,y:s_y} = source.parentElement.dataset;
    const {x:t_x,y:t_y} = target.parentElement.dataset;
    return [Number(s_x),Number(s_y), Number(t_x),Number(t_y)]
}
function getPath({ x1, y1, x2, y2, grid }){
    const path = findShortestPath({
        grid,
        source:[x1,y1],
        target:[x2,y2],
    });
    if(!path) throw new Error('ConnectionPath抛错：不存在连接路径！');
    return path;
}

function getElementBrowerCroods(croods){
    const max = croods.length - 1;
    return _.reduce(croods,(acc,crood,i)=>{
        const [x,y] = crood || [];
        const element = document.querySelector(`.x-${x}.y-${y}`);
        if(!element) return acc;
        const info = element.getBoundingClientRect();

        if(i===0){
            const [nextX, nextY] = croods[1];
            return add(acc, getCrood(getChildInfo(element),x,y,nextX,nextY))
        }
        if(i===max){
            const [prevX, prevY] = croods[(max-1)];
            return add(acc,getCrood(getChildInfo(element),x,y,prevX,prevY));
        }
        return add(acc,getCrood(info));
    },[]);

    function getChildInfo(element){
        const childElement = _.head(element.childNodes);
        if(!childElement) throw new Error('getElementCroods-getChildInfo报错：没有对应子元素！');
        return childElement.getBoundingClientRect();
    }

    function add(list,item){
        list.push(item);
        return list;
    }

    function getCrood(info,x1,y1,x2,y2){
        if(x2 > x1) return [info.x + info.width,info.y+info.height/2];
        if(x2 < x1) return [info.x,info.y+info.height/2];
        if(y2 > y1) return [info.x + info.width/2,info.y+info.height];
        if(y2 < y1) return [info.x + info.width/2,info.y];
        return [info.x + info.width/2,info.y + info.height/2];
    }
}
