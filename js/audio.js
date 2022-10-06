let effectsVolume = 0.15;
let effectsVolumeBot = 0.13;

window.addEventListener('load', setVolume(0.2));

function setVolume(volume){
    document.getElementById('soundtrack').volume = volume;
	document.getElementById('soundtrack').muted = false;
}

window.addEventListener('load', buttonSoundSetup);
function buttonSoundSetup(){
    let button = document.getElementsByTagName('button');
    for(let i = 0; i < button.length; i++){
        button[i].addEventListener('click', () => playSound("click"));
    }
}

function playSound(name, bot = false){
    let sound = new Audio("./audio/" + name + ".mp3");
	sound.volume = bot ? effectsVolumeBot : effectsVolume;
	sound.play();
}

let toggleAudio = () => {
    let vol = document.getElementById('soundtrack').volume;
    document.getElementById('soundtrack').volume = (vol) ? 0 : 0.2;
    effectsVolume = effectsVolume ? 0 : 0.15;
    effectsVolumeBot = effectsVolumeBot ? 0 : 0.13;

    document.getElementById('toggleAudio_btn').innerHTML = (vol) ? "<img src=\"./images/icons/volume-xmark-solid.svg\" alt=\"\">" : "<img src=\"./images/icons/volume-high-solid.svg\" alt=\"\">";
}