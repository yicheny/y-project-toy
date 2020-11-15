import Line from "./Line";

export default class Connection{
    constructor(source,target) {
        this.canvas = document.createElement('canvas');
        this.canvas.width  = 2000;
        this.canvas.height = 2000;
        //画布要出现在最上层才能显示，然而出现在最上层就会遮挡其他元素——使用pointerEvents = 'none';即可解决
        this.windowBox = WindowBox.create(this.canvas);
        const {x,y,width,height} = source.getBoundingClientRect();
        const {x:x2,y:y2} = target.getBoundingClientRect();
        const line = Line.create({canvas:this.canvas,x:x+width,y:y+height});
        line.lineTo(x2,y2).end();
    }

    static create(...params){
        return new Connection(...params);
    }

    clear = () => {
        this.windowBox.clear();
    }
}

class WindowBox{
    constructor(node) {
        this.initBox();
        this.nodes = this.getInitNodes(node);
        this.nodes.forEach((x)=>this.addNode(x));
    }

    initBox = () => {
        const id = 'windowBox';
        const box = document.getElementById(id)
        if (box) return this.box = box;
        this.box = document.createElement('div');
        this.box.id = id;
        this.box.style.position = 'fixed';
        this.box.style.top = 0;
        this.box.style.lef = 0;
        this.box.style.zIndex = 100;
        this.box.style.height = '100%';
        this.box.style.width = '100%';
        this.box.style.pointerEvents = 'none';
        document.body.appendChild(this.box);
    }


    getInitNodes(node) {
        if (Array.isArray(node)) return node;
        return node ? [node] : [];
    }

    addNode = (node) => {
        this.nodes.push(node);
        this.box.appendChild(node);
    }

    clear = () =>{
        try{
            this.nodes.forEach((x)=> {
                this.box.removeChild(x);
            });
            this.nodes = [];
        }catch (e){
            console.error('windowBox清除元素出现异常：',e);
        }
    }

    static create(...params){
        return new WindowBox(...params);
    }
}
