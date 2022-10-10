audio = document.getElementsByClassName('audio')[0];
source = document.createElement("source");
source.setAttribute("src","audio/natal.mp3");
source.setAttribute("type","audio/mpeg");
audio.appendChild(source);

