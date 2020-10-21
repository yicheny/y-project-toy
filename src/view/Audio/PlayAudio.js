import React, { useEffect } from 'react';
import _ from 'lodash';

const audioNames = [
    '早上好,主人',
    '笨蛋,笨蛋'
]

function PlayAudio(props) {

    useEffect(()=>{
        // const audios =  PlayAudio.playAudio.preload(audioNames);
        const timeId = setInterval(()=>{
            const name = audioNames[_.random()];
            const element = document.getElementById(name);
            element.play().then(()=>{
                console.log(`${name}.mp3 音频播放中……`)
            })
        },3000);

        return ()=>clearInterval(timeId);
    },[])

    /*useEffect(()=>{
        // const audios =  PlayAudio.playAudio.preload(audioNames);
        const timeId = setInterval(()=>{
            const name = audioNames[_.random()];
            // console.log(`当前播放的音频是：${name}.mp3`)
            // PlayAudio.playAudioByEle(name);
            // PlayAudio.playAudio(name);

            // console.log(audios[ name ]);
            // const audio = audios[name];
            // audio.play();
        },3000);

        return ()=>clearInterval(timeId);
    },[])*/

    return (<div>
            <h2>PlayAudio</h2>
            <div>
                {audioNames.map((name,i)=>{
                    return <audio key={i} src={`./asserts/audio/${name}.mp3`} preload='auto' id={name}/>
                })}
            </div>
        </div>);
}
PlayAudio.playAudio = function (name){
    // const url =  `../../../public/asserts/audio/${name}.mp3`;
    const url =  `./asserts/audio/${name}.mp3`;
    const audio = new Audio(url);
    audio.play(); //播放 mp3这个音频对象
}
PlayAudio.playAudio.preload = function (names){
    return names.reduce((acc,name)=>{
        acc[name] = new Audio(`./asserts/audio/${name}.mp3`)
        return acc;
    },{})
}
PlayAudio.playAudioByEle = function (name){
    const el = document.querySelector(`#${name}`)
    el && el.play();
}
export default PlayAudio;
