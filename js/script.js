var canvas, ctx, altura, largura, img, velocidade = 10, mov = false, pos = 0, numpassostotal= 12, numpassosatual = 0, outsystems = false, dx=0, dy=0;

background = {
    x: 0,
    y: 0,

    atualiza: function(){
        this.x -= dx * velocidade;
        this.y == dy * velocidade;
    },

    desenha: function(){
        back.desenha(this.x, this.y)
        back.desenha(this.x + back.largura, this.y);
    }  
}

treno = {
    x:0,
    y:1120,

    atualiza: function(){
        this.x -= dx * velocidade;
        this.y == dy * velocidade;
    },

    desenha: function(){
        carro.desenha(this.x,this.y)
    }
}

presente = {
    x:2400,
    y:1250,

    desenha: function(){
        present.desenha(this.x,this.y)
    },

    colidiu: function(){
        if((noel.x+40) >= this.x && outsystems == false){
            outsystems = true;
            alert("foi");
        }
    }
}

estrela = {
    x: 2685,
    y: 0,

    atualiza: function(){
        if(estrelacad.largura)
        this.x -= 5;
        this.y += 1;
    },

    desenha: function(){
        estrelacad.desenha(this.x, this.y);
    }
}

boneco = {
    x: 2600,
    y: 1120,

    desenha: function(){
        olaf.desenha(this.x, this.y);
    }
}

miau = {
    x: 0,
    y: 0,
    _miau:[],
    _sprite: [gato],
    tempoInsere: 10,

    insere: function(){
        this._miau.push({
            x: Math.floor(Math.random()*(5000 - 5)+5),
            y: -gato.largura,
            largura: gato.largura,
            altura: gato.altura,
            sprite: this._sprite[0]
        });
        this.tempoInsere = 10 + Math.floor(40 * Math.random());

    },

    atualiza: function(){
        if(this.tempoInsere == 0){
            this.insere();
        }else{
            this.tempoInsere--;
        }

        for(var i = 0, tam = this._miau.length; i < tam; i++){
            var miau = this._miau[i];
            miau.y += velocidade;
            miau.x -= dx * velocidade;
            //console.log(`miau y: ${this._miau[0].y} | miau altura: ${this._miau[0].altura}`)
            if(miau.y > altura){
                this._miau.splice(i,1);
                tam--;
                i--;
            }
        }

    },

    desenha: function(){
        for(var i = 0, tam = this._miau.length; i < tam; i++){
            var miau = this._miau[i];
            gato.desenha(miau.x, miau.y, miau.largura, miau.altura);
        }
    },

    colidiu: function(){
        for(var i = 0, tam = this._miau.length; i < tam; i++){
            var miau = this._miau[i];
            obj1 = {x: miau.x, y: miau.y, l: gato.largura, a: gato.altura}
            obj2 = {x: noel.x, y: noel.y, l: santa[noel.caminhar[numpassosatual]].largura, a: santa[noel.caminhar[numpassosatual]].altura}
            if(colisao(obj1, obj2) == true){
                this._miau.splice(i,1);
                tam--;
                i--;
                game.pontos++;
                console.log(game.pontos);
            }
        }
    }
}


noel = {
    x: 0,
    y: 1120,
    pos: 0,
    caminhar:[0,1,2,3,2,1,0,4,5,6,5,4],

    atualiza: function(){
        this.x += dx * velocidade;
        this.y == dy * velocidade;
    },

    desenha: function(){
        santa[this.caminhar[numpassosatual]].desenha(this.x, this.y);
    },

    libera: function(){
        outsystems = false;
    }
}

game = {
    iniciado: true,
    pontos: 0,
    tempo: 5,

    iniciar: function(){
        this.pontos = 0;
        this.tempo = 30;
        this.iniciado = true;
    },

    finalizar: function(){
        this.iniciado = false;
        console.log("finalizou");
    },

    addpontos: function(){
        this.pontos = pontos + 1;
    }
}


function colisao(obj1, obj2){

    let i = 0;
    let colidiu = false;

    let pontos_obj1 = [{x:obj1.x, y:obj1.y},
                       {x:obj1.x+obj1.l, y:obj1.y},
                       {x:obj1.x+obj1.l, y:obj1.y+obj1.a},
                       {x:obj1.x, y:obj1.y+obj1.a}];

    let pontos_obj2 = [{x:obj2.x, y:obj2.y},
                       {x:obj2.x+obj2.l, y:obj2.y},
                       {x:obj2.x+obj2.l, y:obj2.y+obj2.a},
                       {x:obj2.x, y:obj2.y+obj2.a}];

    
    while((colidiu==false) && (i<3)){
        ((pontos_obj1[i].x >= obj2.x && pontos_obj1[i].x <= obj2.x+obj2.l && pontos_obj1[i].y >= obj2.y && pontos_obj1[i].y <= obj2.y+obj2.a)
        ||
        (pontos_obj2[i].x >= obj1.x && pontos_obj2[i].x <= obj1.x+obj1.l && pontos_obj2[i].y >= obj1.y && pontos_obj2[i].y <= obj1.y+obj1.a))?colidiu=true:i++;
    }
    return colidiu;
}



function main(){
    largura = 2685;
    altura = 1500;
    canvas = document.getElementsByClassName("canvas")[0];
    canvas.width = largura;
    canvas.height = altura;
    ctx = canvas.getContext("2d");
    window.addEventListener('keydown', keydown);
    window.addEventListener('keyup', keyup);
    //window.addEventListener('click', mouseup);
    //window.addEventListener('mousedown', mousedown);
    img = new Image();
    img.src = "img/sprite.png";
    roda();
    loop();

}
var i = 0;


function mousedown(evt){

}

function mouseup(event){

}


function roda(){
    atualiza();
    desenha();
    window.requestAnimationFrame(roda);
}

function atualiza(){
    background.atualiza();
    treno.atualiza();
    noel.atualiza();
    estrela.atualiza();
    miau.atualiza();
    presente.colidiu();
    miau.colidiu();
}

function desenha(){
    background.desenha();
    treno.desenha();
    noel.desenha();
    presente.desenha();
    boneco.desenha();
    estrela.desenha();
    miau.desenha(); 
}
main();

function keydown(evt){
    mov = true;
    switch (evt.keyCode) {
        case 37:
            dx =- 1;
            break;
        case 38:
            dy =- 1;
            break;
        case 39:
            dx = 1;
            break;
        case 40:
            dy = 1;
            break;
    }
}

  
function keyup(evt){
    mov = false;
    switch (evt.keyCode) {
        case 37:
            dx = 0;
            break;
        case 38:
            dy = 0;
            break;
        case 39:
            dx = 0;
            break;
        case 40:
            dy = 0;
            break;
    }
}  



function loop(){
    setInterval(function(){
        if(mov){
            numpassosatual++;
        }else{
            numpassosatual = 0
        }
        
        if(numpassosatual == numpassostotal){
            numpassosatual = 0
        }
    }, 50);
}

function gametempo(){
    if(game.tempo == 0 && game.iniciado){
        game.finalizar();
    }else if(game.iniciado){
        game.tempo--;
    }
}
setInterval(gametempo,1000)