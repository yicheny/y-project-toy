import React, {useEffect} from 'react';
import _ from 'lodash';

const audios = [
    '早上好,主人',
    '笨蛋,笨蛋'
]

function PlayAudio(props) {

    useEffect(()=>{
        const timeId = setInterval(()=>{
            const name = audios[_.random()];
            console.log(`当前播放的音频是：${name}.mp3`)
            PlayAudio.playAudio(name);
        },3000);

        return ()=>clearInterval(timeId);
    },[])

    return (
        <div>PlayAudio</div>
    );
}
PlayAudio.playAudio = function (name){
    // const url =  `../../../public/asserts/audio/${name}.mp3`;
    const url =  `./asserts/audio/${name}.mp3`;
    const audio = new Audio(url);
    audio.play(); //播放 mp3这个音频对象
}

export default PlayAudio;
