import React, {useEffect} from 'react';
import Line from "./utils/Line";

function CanvasLine(props) {
    useEffect(()=>{
        const canvas = document.querySelector('.canvas-line');
        // console.log(canvas);
        try{
            const line = Line.create({canvas,x:200,y:200,color:'green',width:3});

            // line.addLine(300,200)
            //     .addLine(300,100)
            //     .end();

            // line.top().end();
            // line.right().end();
            // line.bottom().end();
            // line.left().end();

            // line.right(300).end();

            line.right().bottom().right().bottom().left().bottom().left().top().end();
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
