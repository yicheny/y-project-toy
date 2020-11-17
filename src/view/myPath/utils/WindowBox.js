export default class WindowBox{
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
                if(this.box.contains(x)) this.box.removeChild(x);
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
