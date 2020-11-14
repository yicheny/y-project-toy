import _ from 'lodash';

export default class Line{
    constructor({canvas,x,y,unitLen,unitLenX,unitLenY,color,width}) {
        if(canvas.getContext){
            this.ctx = canvas.getContext('2d');
            this.ctx.strokeStyle = _.defaultTo(color,'#000');
            this.ctx.lineWidth = _.defaultTo(width,1);
            this.startCoordinate = [x,y];
            this.coordinates = [];
            this.defaultUnitLength = _.defaultTo(unitLen,100);
            this.defaultUnitLengthX = _.defaultTo(unitLenX,this.defaultUnitLength);
            this.defaultUnitLengthY = _.defaultTo(unitLenY,this.defaultUnitLength);
        }else{
            throw new Error('Line初始化异常，不存在canvas.getContext');
        }
    }

    static create(...params){
        return new Line(...params);
    }

    addLine(x,y){
        this.coordinates.push([x,y]);
        return this;
    }

    left(unitLength){
        const [x,y] = this.lastCoordinate;
        return this.addLine(x-this.getUnitLengthX(unitLength),y);
    }

    right(unitLength){
        const [x,y] = this.lastCoordinate;
        return this.addLine(x+this.getUnitLengthX(unitLength),y);
    }

    top(unitLength){
        const [x,y] = this.lastCoordinate;
        return this.addLine(x,y-this.getUnitLengthY(unitLength));
    }

    bottom(unitLength){
        const [x,y] = this.lastCoordinate;
        return this.addLine(x,y+this.getUnitLengthY(unitLength));
    }

    end(){
        this.ctx.beginPath();
        this.ctx.moveTo(...this.startCoordinate);
        this.coordinates.forEach((x)=>{
            this.ctx.lineTo(...x)
        });
        this.ctx.stroke();
    }

    getUnitLengthX(value){
        return _.defaultTo(value,this.defaultUnitLengthX)
    }

    getUnitLengthY(value){
        return _.defaultTo(value,this.defaultUnitLengthX)
    }

    get lastCoordinate(){
        if(_.isEmpty(this.coordinates)) return this.startCoordinate;
        return _.last(this.coordinates)
    }
}
