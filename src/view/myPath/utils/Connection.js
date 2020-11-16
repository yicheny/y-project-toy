import _ from 'lodash'
import Line from "./Line";
import WindowBox from "./WindowBox";

export default class Connection{
    constructor({source,target,sourceAnchor,targetAnchor}) {
        this.canvas = document.createElement('canvas');
        this.canvas.width  = 2000;//这里获取body动态尺寸进行设置或许会更好一些？
        this.canvas.height = 2000;
        //画布要出现在最上层才能显示，然而出现在最上层就会遮挡其他元素——使用pointerEvents = 'none';即可解决
        this.windowBox = WindowBox.create(this.canvas);
        this.source = source;
        this.target = target;
        this.sourceAnchor = _.defaultTo(sourceAnchor,null);
        this.targetAnchor = _.defaultTo(targetAnchor,null);
        this.renderLine();
    }

    get lineInfo() {
        const s = this.getAnchor(this.source,this.sourceAnchor);
        const t = this.getAnchor(this.target,this.targetAnchor);
        this._lineInfo = {
            targetX:t.x,
            targetY:t.y,
            sourceX:s.x,
            sourceY:s.y
        }
        return this._lineInfo;
    }

    getAnchor = (node,key)=>{
        const {x,y,width,height} = node.getBoundingClientRect();
        if (key === 'Top') return {x:x + width/2,y};
        if (key === 'Right') return { x:x + width,y:y + height/2};
        if (key === 'Bottom') return {x:x + width/2,y:y + height};
        if (key === 'Left') return { x,y:y + height/2};
        return {x,y};
    }

    renderLine = ()=>{
        const {targetX,targetY,sourceX,sourceY} = this.lineInfo;
        const line = Line.create({canvas:this.canvas,x:sourceX,y:sourceY});
        return line.lineTo(targetX,targetY).end();
    }

    static create(...params){
        return new Connection(...params);
    }

    clear = () => {
        this.windowBox.clear();
    }
}
