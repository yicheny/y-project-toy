import React, {useEffect, useReducer, useRef, useState} from 'react';
import _ from 'lodash';
import {Card} from "y-ui0";
import './index.scss';
import clsx from "clsx";

const data = _.times(4,(num)=>_.repeat(num,10));

function Index(props) {
    return <div  className='Carousel-View'>
        <Card title='Carousel'>
            <div className="tips">
                <Carousel className="tipsContent">
                    {
                        _.map(data,(x,i)=>{
                            return <div key={i} className='tip'>第{i+1}项：{x}</div>
                        })
                    }
                </Carousel>
            </div>
        </Card>
    </div>
}

export default Index;

//
function Carousel({className,style,children}){
    const ref = useRef();
    // const [,setOffset] = useState(0);
    const [,forceUpdate] = useReducer(x=>x+1,0);
    const offsetRef = useRef(0);

    useEffect(()=>{
        // console.log('ref',ref.current.scrollWidth);

        const completeWidth = ref.current.scrollWidth / 2;

        let unmount = undefined;

        const play = ()=>{
            ref.current.style.transition = `none`;
            // ref.current.style.transition = `transform 300ms linear`;
            ref.current.style.transform = `translateX(${offsetRef.current}px)`;
            forceUpdate();

            const timeId = setInterval(()=>{
                // ref.current.style.transform -= ;
                const next = offsetRef.current - 40;
                let offsetX = completeWidth + next;
                // console.log(next,offsetX);
                if(offsetX >= 0){
                    ref.current.style.transition = `transform 300ms linear`;
                    ref.current.style.transform = `translateX(${next}px)`;
                    offsetRef.current = next;
                    return forceUpdate();
                }
                offsetX += 40;
                ref.current.style.transition = `none`;
                ref.current.style.transform = `translateX(${offsetX}px)`;
                offsetRef.current = offsetX;
                forceUpdate();
                play();
                clearInterval(timeId)
            },300);

            unmount = ()=>clearInterval(timeId);
        }

        // play();
        return unmount;
    },[])

    return <div ref={ref} className={clsx("Carousel",className)} style={style}>
        {children}
        {children}
    </div>
}
