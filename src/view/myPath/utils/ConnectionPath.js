import _ from 'lodash'
import Line from "./Line";
import WindowBox from "./WindowBox";
import findShortestPath from "./findShortestPath";

//
const isSameNode = _.curry(function (n1,n2){
    if(!_.isArray(n1) || !_.isArray(n2)) return false;
    return (n1[0] === n2[0]) && (n1[1] === n2[1]);
})
const isHalfSameNode = _.curry(function (n1,n2){
    if(!_.isArray(n1) || !_.isArray(n2)) return false;
    return (n1[0] === n2[0]) || (n1[1] === n2[1]);
})
function hasSameNode(path,targetNode){
    return path.some(isSameNode(targetNode));
}

//后续待完善功能
//1. 线hover高亮
//2. 十字交叉曲线
//3. 箭头
//4. 线点击事件

export default class ConnectionPath{
    constructor({grid,connectList,onError,hlCrood}) {
        this.initCanvas();

        this.grid = grid;
        this.connectList = connectList;
        this.onError = onError;
        this.hlCrood = hlCrood;

        this.render();
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
            const pathQueens = [];
            _.forEach(this.renderList,(o)=>{
                const {x1, y1, x2, y2,isHl} = o;
                const path = this.getPath({ x1, y1, x2, y2 });
                const acrossCroods = [];
                path.forEach((node,i)=>{
                    if(i===0 || i===path.length-1) return ;
                    const isAcross =  pathQueens.some((p,pi)=>{
                        const isArise = hasSameNode(p,node);
                        // console.log(pi,p.length,p,node,isArise)
                        if(!isArise) return false;
                        const prev1 = path[i-1];
                        const next1 = path[i+1];
                        const prev2 = p.length <= 1 ? undefined : p[i-1];
                        const next2 = p[i+1];
                        //const checkRes = !isHalfSameNode(prev1,prev2) && !isHalfSameNode(prev1,next2) && !isHalfSameNode(next1,prev2) && !isHalfSameNode(next1,next2);
                        // console.log('checkRes',checkRes,prev1,next1,prev2,next2)
                        return !isHalfSameNode(prev1,prev2) && !isHalfSameNode(prev1,next2) && !isHalfSameNode(next1,prev2) && !isHalfSameNode(next1,next2);
                    });
                    if(isAcross) acrossCroods.push(node);
                })
                // if(!_.isEmpty(acrossCroods)) console.log(acrossCroods);
                const validPath = path.slice(1,-1);
                if(validPath.length) pathQueens.push(validPath);

                const browerCroods = getElementBrowerCroods(path,acrossCroods);
                const head = browerCroods.unshift();
                const {ctx} = Line.create({canvas:this.canvas,x:head.x,y:head.y,width:2,color:isHl ? '#00FF00' : '#8f8f8f'});
                ctx.beginPath();
                const radius = 5;
                _.forEach(browerCroods,([x,y,acrossFlag],i)=>{
                    if(i===0) ctx.moveTo(x,y);
                    if(!acrossFlag) return ctx.lineTo(x,y);
                    const [p_x,p_y] = browerCroods[i-1];
                    // console.log(p_x,p_y,x,y)
                    if(parseInt(p_x) === parseInt(x)) {//横
                        if(parseInt(p_y)>parseInt(y)){//b->t
                            // console.log('b->t');
                            ctx.lineTo(x,y+radius);
                            ctx.arc(x,y,radius,Math.PI*0.5,Math.PI*1.5,true);
                        }else{
                            // console.log('t->b');
                            ctx.lineTo(x,y-radius);
                            ctx.moveTo(x,y+radius);
                            ctx.arc(x,y,radius,Math.PI*0.5,Math.PI*1.5,true);
                            ctx.moveTo(x,y+radius);
                        }
                    }else{
                        if(parseInt(p_x)>parseInt(x)){//r->l
                            // console.log('r->l');
                            ctx.lineTo(x+radius,y);
                            ctx.arc(x,y,radius,0,Math.PI,true);
                        }else{
                            // console.log('l->r');
                            ctx.lineTo(x-radius,y);
                            ctx.moveTo(x+radius,y);
                            ctx.arc(x,y,radius,0,Math.PI,true);
                            ctx.moveTo(x+radius,y);
                        }
                    }
                });
                ctx.stroke();
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

    getPath = ({ x1, y1, x2, y2 }) =>{
        const path = findShortestPath({
            grid:this.grid,
            source:[x1,y1],
            target:[x2,y2],
        });
        if(!path) throw new Error('ConnectionPath抛错：不存在连接路径！');
        return path;
    }

    clear = () => {
        this.windowBox.clear();
    }
}

function getCroods(o){
    const {targetId,sourceId} = o || {};
    const source = document.getElementById(sourceId);
    const target = document.getElementById(targetId);
    if(!source || !target) throw new Error('ConnectionPath抛错：指定元素不存在！');
    const {x:s_x,y:s_y} = source.parentElement.dataset;
    const {x:t_x,y:t_y} = target.parentElement.dataset;
    return [Number(s_x),Number(s_y), Number(t_x),Number(t_y)]
}

function getElementBrowerCroods(croods,acrossCroods){
    const addAcrossFlagCurry = _.curry(function addAcrossFlag(x,y,list){
        list.push(hasSameNode(acrossCroods,[x,y]));
        return list;
    });

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
            return add(acc, getCrood(getChildInfo(element),x,y,prevX,prevY));
        }
        const addAcrossFlag = addAcrossFlagCurry(x,y);
        return add(acc,addAcrossFlag(getCrood(info)));
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
