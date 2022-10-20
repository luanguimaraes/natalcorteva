music = document.getElementsByClassName('audio')[0];
hohoho = document.getElementsByClassName('audio')[1];

music.volume = 0.1;
hohoho.volume = 0.5;


source = document.createElement("source");
source.setAttribute("type","audio/mpeg");
source.setAttribute("src","audio/natal.mp3");
music.appendChild(source);

source = document.createElement("source");
source.setAttribute("type","audio/mpeg");
source.setAttribute("src","audio/hohoho.wav");
hohoho.appendChild(source);



