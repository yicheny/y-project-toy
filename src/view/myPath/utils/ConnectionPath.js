import _ from 'lodash'
import Line from "./Line";
import WindowBox from "./WindowBox";
import findShortestPath from "./findShortestPath";

//
const isSameNode = _.curry(function (n1,n2){
    if(!_.isArray(n1) || !_.isArray(n2)) return false;
    return (n1[0] === n2[0]) && (n1[1] === n2[1]);
})
function hasSameNode(path,targetNode){
    return path.some(isSameNode(targetNode));
}
function getSameNodeIndex(path,targetNode){
    if(!hasSameNode(path,targetNode)) return -1;
    return _.findIndex(path,isSameNode(targetNode));
}

//后续待完善功能
//1. 线hover高亮
//2. 十字交叉曲线
//3. 箭头
//4. 线点击事件

function checkAcross(prev1,next1,prev2,next2){
    if(!isSameDirection(prev1,next1) || !isSameDirection(prev2,next2)) return false;
    return !(isSameNode(prev1,prev2) || isSameNode(prev1,next2) || isSameNode(next1,prev2) || isSameNode(next1,next2))
}

function isSameDirection(n1,n2){
    return n1[0] === n2[0] || n1[1] === n2[1]
}

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
            if(_.isNil(this.connectList) || _.isEmpty(this.connectList)) return ;
            const pathQueens = [];
            _.forEach(this.renderList,(o)=>{
                const {x1, y1, x2, y2,isHl} = o;
                const path = this.getPath({ x1, y1, x2, y2 });
                const acrossCroods = [];
                path.forEach((node,i)=>{
                    if(i===0 || i===path.length-1) return ;
                    const isAcross =  pathQueens.some((p,pi)=>{
                        const isExist = hasSameNode(p,node)
                        // console.log(sameNodeIndex);
                        // console.log(pi,p.length,p,node,isArise)
                        if(!isExist) return false;
                        const prev1 = path[i-1];
                        const next1 = path[i+1];
                        const sameIndex = getSameNodeIndex(p,node);
                        // console.log(sameIndex);
                        const prev2 = sameIndex===-1 ? undefined : p[sameIndex-1];
                        const next2 = sameIndex===-1 ? undefined : p[sameIndex+1];
                        // if(isSameNode([1,8],node)){
                        //     console.log(prev1,next1,prev2,next2)
                        // }
                        //const checkRes = !isHalfSameNode(prev1,prev2) && !isHalfSameNode(prev1,next2) && !isHalfSameNode(next1,prev2) && !isHalfSameNode(next1,next2);
                        // console.log('checkRes',checkRes,prev1,next1,prev2,next2);
                        return checkAcross(prev1,next1,prev2,next2);
                        // return true;
                    });
                    if(isAcross) acrossCroods.push(node);
                })
                // if(!_.isEmpty(acrossCroods)) console.log(acrossCroods);
                // const validPath = path.slice(1,-1);
                // if(validPath.length) pathQueens.push(validPath);
                pathQueens.push(path);
                const browerCroods = getElementBrowerCroods(path,acrossCroods);
                const head = browerCroods.unshift();
                const lineWidth = 2;
                const {ctx} = Line.create({canvas:this.canvas,x:head.x,y:head.y,width:lineWidth,color:isHl ? '#00FF00' : '#8f8f8f'});
                ctx.beginPath();
                _.forEach(browerCroods,([x,y,acrossFlag],i,ary)=>{
                    if(i===0) ctx.moveTo(x,y);
                    if(i===ary.length-1) return setLastAnchor();
                    if(!acrossFlag) return setDefaultLine();
                    setAcrossLine();

                    function setLastAnchor(){
                        setDirectionFuns(getLastAnchorFuns());

                        function getLastAnchorFuns(){
                            const unit = 4;
                            const len = calcHypotenuse(unit);

                            return { bottomToTop,topToBottom,rightToLeft,leftToRight }

                            function bottomToTop(){
                                ctx.lineTo(x,y+len)
                                ctx.moveTo(x,y);
                                ctx.lineTo(x-unit,y+len);
                                ctx.lineTo(x+unit,y+len);
                                ctx.lineTo(x,y);
                            }

                            function topToBottom(){
                                ctx.lineTo(x,y-len)
                                ctx.moveTo(x,y);
                                ctx.lineTo(x-unit,y-len);
                                ctx.lineTo(x+unit,y-len);
                                ctx.lineTo(x,y);
                            }

                            function rightToLeft(){
                                ctx.lineTo(x+len,y)
                                ctx.moveTo(x,y);
                                ctx.lineTo(x+len,y-unit);
                                ctx.lineTo(x+len,y+unit);
                                ctx.lineTo(x,y);
                            }

                            function leftToRight(){
                                ctx.lineTo(x-len,y)
                                ctx.moveTo(x,y);
                                ctx.lineTo(x-len,y-unit);
                                ctx.lineTo(x-len,y+unit);
                                ctx.lineTo(x,y);
                            }

                            function calcHypotenuse(a) {
                                return (Math.sqrt((a * a) * 4));
                            }

                        }
                    }

                    function setDefaultLine(){
                        ctx.lineTo(x,y);
                    }

                    function setAcrossLine(){
                        // console.log(p_x,p_y,x,y)
                        setDirectionFuns(getAcrossFuns());

                        function getAcrossFuns(){
                            const radius = 5;
                            return { bottomToTop,topToBottom,rightToLeft,leftToRight }

                            function bottomToTop(){
                                ctx.lineTo(x,y+radius);
                                ctx.arc(x,y,radius,Math.PI*0.5,Math.PI*1.5,true);
                            }

                            function topToBottom(){
                                ctx.lineTo(x,y-radius);
                                ctx.moveTo(x,y+radius);
                                ctx.arc(x,y,radius,Math.PI*0.5,Math.PI*1.5,true);
                                ctx.moveTo(x,y+radius);
                            }

                            function rightToLeft(){
                                ctx.lineTo(x+radius,y);
                                ctx.arc(x,y,radius,0,Math.PI,true);
                            }

                            function leftToRight(){
                                ctx.lineTo(x-radius,y);
                                ctx.moveTo(x+radius,y);
                                ctx.arc(x,y,radius,0,Math.PI,true);
                                ctx.moveTo(x+radius,y);
                            }
                        }
                    }


                    function setDirectionFuns({ bottomToTop,topToBottom,rightToLeft,leftToRight }){
                        const [p_x,p_y] = browerCroods[i-1];

                        if(parseInt(p_x) === parseInt(x)) {//横
                            if(parseInt(p_y)>parseInt(y)){//b->t
                                bottomToTop();
                            }else{
                                topToBottom();
                            }
                        }else{
                            if(parseInt(p_x)>parseInt(x)){//r->l
                                rightToLeft();
                            }else{
                                leftToRight();
                            }
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
