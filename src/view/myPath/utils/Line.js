import _ from 'lodash';

export default class Line{
    constructor({ctx,x,y,defaultUnitLength,defaultUnitLengthX,defaultUnitLengthY}) {
        this.ctx = ctx;
        this.startCoordinate = [x,y];
        this.coordinates = [];
        this.defaultUnitLength = _.defaultTo(defaultUnitLength,100);
        this.defaultUnitLengthX = _.defaultTo(defaultUnitLengthX,this.defaultUnitLength);
        this.defaultUnitLengthY = _.defaultTo(defaultUnitLengthY,this.defaultUnitLength);
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
