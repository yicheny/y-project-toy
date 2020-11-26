import React, {useEffect} from 'react';
import Line from "./utils/Line";

function CanvasLine(props) {
    useEffect(()=>{
        const canvas = document.querySelector('.canvas-line');
        // console.log(canvas);
        try{
            const ctx = canvas.getContext('2d');
            renderArc();
            renderAnchor();

            // const line = Line.create({canvas,x:200,y:200,color:'green',width:3});
            // line.right().bottom().right().bottom().left().bottom().left().top().end();

            // line.to(300,200)
            //     .to(300,100)
            //     .end();

            // line.top().end();
            // line.right().end();
            // line.bottom().end();
            // line.left().end();

            // line.right(300).end();

            // const line = Line.create({canvas,x:401,y:100});
            // line.to(651,300).end();

            function renderArc(){
                ctx.beginPath();
                //横向弯曲
                // ctx.moveTo(0,100);
                // ctx.lineTo(50,100)
                // ctx.moveTo(150,100);
                // ctx.arc(100,100, 50, 0, Math.PI, true);

                ctx.moveTo(100,0);
                ctx.lineTo(100,50);
                ctx.moveTo(100,150);
                ctx.arc(100,100, 50, Math.PI*0.5, Math.PI*1.5, true);
                ctx.stroke();
            }

            function renderAnchor(){
                const lineWidth = 2
                const y = 100;
                const unit = 4;

                ctx.beginPath();
                ctx.lineWidth = lineWidth;
                ctx.moveTo(100,100);
                ctx.lineTo(180,100);
                ctx.moveTo(186,y);
                ctx.lineTo(180,y-unit);
                ctx.lineTo(180,y+unit+lineWidth);
                ctx.fill();
                ctx.stroke();
            }
        }catch(e){
            console.error(e);
        }
    },[])

    return <div className="CanvasLine">
        <canvas className='canvas-line' width='1000' height='1000'/>
    </div>
}

export default CanvasLine;

// coordinate
