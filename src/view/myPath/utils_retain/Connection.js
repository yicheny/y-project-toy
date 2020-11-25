import _ from 'lodash'
import Line from "../utils/Line";
import WindowBox from "../utils/WindowBox";

export default class Connection{
    constructor({ options, type }) {
        this.canvas = document.createElement('canvas');
        this.canvas.width  = 2000;//这里获取body动态尺寸进行设置或许会更好一些？
        this.canvas.height = 2000;
        //画布要出现在最上层才能显示，然而出现在最上层就会遮挡其他元素——使用pointerEvents = 'none';即可解决
        this.windowBox = WindowBox.create(this.canvas);
        this.type = _.defaultTo(type,'line');
        this.options = options;
        this.render();
    }

    static create(...params){
        return new Connection(...params);
    }

    get lineRender(){
        const lineClass = ConnectionFactory.create(this.type);
        return  (...params) => lineClass.create(this.canvas,...params);
    }

    render = ()=>{
        if(_.isPlainObject(this.options)) return this.lineRender(this.options);
        if(_.isArray(this.options)) return _.forEach(this.options,(o)=>this.lineRender(o));
        throw new Error('Connection报错，options必须是一个对象或数组')
    }

    clear = () => {
        this.windowBox.clear();
    }
}

//工厂类
class ConnectionFactory{
    constructor(type) {
        const strategy = {
            line:ConnectionLine,
            flow:ConnectionFlowchart
        }

        return strategy[type];
    }

    static create(type){
        return new ConnectionFactory(type);
    }
}

//子类
class ConnectionLine{
    constructor(canvas,{sourceId,targetId,sourceAnchor,targetAnchor}) {
        this.canvas = canvas;
        this.source = document.getElementById(sourceId);
        this.target = document.getElementById(targetId);
        this.sourceAnchor = _.defaultTo(sourceAnchor,null);
        this.targetAnchor = _.defaultTo(targetAnchor,null);
        this.renderLine();
    }

    static create(...params){
        return new ConnectionLine(...params);
    }

    get lineInfo() {
        return [
            this.sourceAnchorInfo,
            this.targetAnchorInfo
        ];
    }

    get sourceAnchorInfo (){
        return this.getAnchor(this.source,this.sourceAnchor);
    }
    get targetAnchorInfo(){
        return this.getAnchor(this.target,this.targetAnchor)
    }

    getAnchor = (node,key)=>{
        const {x,y,width,height} = node.getBoundingClientRect();
        if (key === 'Top') return [x + width/2,y];
        if (key === 'Right') return [x + width,y + height/2];
        if (key === 'Bottom') return [x + width/2,y + height];
        if (key === 'Left') return [x,y + height/2];
        if (key === 'Center') return [x+width/2,y+height/2];
        return [x,y];
    }

    renderLine = ()=>{
        const [head,...tails] = this.lineInfo;
        const line = Line.create({canvas:this.canvas,x:head[0],y:head[1]});
        return _.forEach(tails,(o,i)=>{
            const [x,y] = o;
            if(i===tails.length-1) return line.to(x,y).end();
            line.to(x,y);
        });
    }
}

//折线
class ConnectionFlowchart extends ConnectionLine{
    static create(...params){
        return new ConnectionFlowchart(...params);
    }

    get lineInfo() {
        // console.log(this.sourceNextAnchor,this.targetPrevAnchor);
        return [
            this.sourceAnchorInfo,
            ...this.middleAnchors,
            this.targetAnchorInfo
        ];
    }

    get middleAnchors() {
        const  checkAnchors = (sourceKey,targetKey) => {
            return (this.sourceAnchor === sourceKey) && (this.targetAnchor === targetKey);
        }

        const [s_x,s_y] = this.sourceAnchorInfo;
        const [t_x,t_y] = this.targetAnchorInfo;

        if(checkAnchors('Right','Left')) return [
            [(s_x+t_x)/2,s_y],
            [(s_x+t_x)/2,t_y]
        ]
        throw new Error('ConnectionFlowchart报错：暂未设置对应的targetAnchor或sourceAnchor处理')
    }
}
