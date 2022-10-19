var canvas, ctx, altura, largura, img, velocidade = 5, dx=0, dy=0, outsystems = false;

background = {
    x: 0,
    y: 0,

    atualiza: function(){
       if(noel.limite()){
            this.x -= dx * velocidade;
       }
    
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
        if(noel.limite()){
            this.x -= dx * velocidade;
        }
    },

    desenha: function(){
        carro.desenha(this.x,this.y)
    }
}

presente = {
    x:2200,
    y:1300,
    ativo: false,

    atualiza: function(){
        if(noel.limite()){
            this.x -= dx * velocidade;
        }
    },

    desenha: function(){
        if(this.ativo){
            present.desenha(this.x,this.y)
        }
    },

}

estrela = {
    x: 2685,
    y: -75,

    atualiza: function(){
        if(!outsystems){
            this.x -= velocidade + 1*(dx);
            this.y += 1;
        }
    },

    desenha: function(){
        estrelacad.desenha(this.x, this.y);
    }
}

boneco = {
    x: 2700,
    y: 1120,

    atualiza: function(){
        if(noel.limite()){
            this.x -= dx * velocidade;
        }
    },

    desenha: function(){
        olaf.desenha(this.x, this.y);
    }
}

arvore = {
    x: 1800,
    y: 300,

    atualiza: function(){
        //console.log(noel.limite());
        if(noel.limite()){
            this.x -= dx * velocidade;
        }
    },

    desenha: function(){
        arvorenatal.desenha(this.x, this.y);
    },

    colidiu: function(){
        //console.log(presente.ativo);
        if((noel.x + 130) >= (this.x + (arvorenatal.largura/2) ) && outsystems == false && presente.ativo == false){
            noel.entregarpresente();
        }
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
        if(this.tempoInsere == 0 && game.iniciado){
            this.insere();
        }else if(game.iniciado){
            this.tempoInsere--;
        }else{
            this.tempoInsere = 10;
        }

        for(var i = 0, tam = this._miau.length; i < tam; i++){
            var miau = this._miau[i];
            miau.y += velocidade;
            miau.x -= dx * velocidade;
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
            obj2 = {x: noel.x, y: noel.y, l: santa[noel.caminhar[noel.numpassosatual]].largura, a: santa[noel.caminhar[noel.numpassosatual]].altura}
            if(colisao(obj1, obj2) == true){
                this._miau.splice(i,1);
                tam--;
                i--;
                game.pontos++;
            }
        }
    }
}


noel = {
    x: 0,
    y: 1120,
    pos: 0,
    andando: false,
    numpassostotal: 12, 
    numpassosatual: 0,
    caminhar: [3,4,5,6,5,4,3,2,1,0,1,2],

    atualiza: function(){
        if(this.x >= 0){
            this.x += dx * velocidade;
        }else{
            this.x = 0;
        }

        if(this.x >= largura-santa[this.caminhar[this.numpassosatual]].largura){
            this.x = largura-santa[this.caminhar[this.numpassosatual]].largura;
        }
    },

    limite: function(){
        console.log(`noel x: ${this.x} | background: ${background.x}`);
        if(this.x > 0 && this.x < largura-santa[this.caminhar[this.numpassosatual]].largura-50){
            return true;
        }
        //dx=0;
        return false;
    },

    desenha: function(){
        santa[this.caminhar[this.numpassosatual]].desenha(this.x, this.y);
    },

    bloqueia: function(){
        outsystems = true;
        this.andando = false;
        dx = 0;
    },

    libera: function(){
        outsystems = false
    },

    entregarpresente: function(){
        this.bloqueia();
        this.caminhar = [10,11,12,13,12,11,10,9,8,7,8,9]
        presente.ativo = true;

        //outsystems actions

        //end outsystems actions
    }
}

game = {
    x:100,
    y:100,
    iniciado: false,
    pontos: 0,
    tempo: 30,

    inicia: function(){
        this.pontos = 0;
        this.tempo = 30;
        this.iniciado = true;
    },

    finaliza: function(){
        this.iniciado = false;
    },

    desenha: function(){
        ctx.fillStyle = "red";
        ctx.font = "60px Arial Black";
        ctx.fillText(this.tempo+" seg",50,85);
        ctx.fillText(this.pontos+" pts",50,185);
    },

    addponto: function(){
        this.pontos = pontos + 1;
    },

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
        (pontos_obj2[i].x >= obj1.x && pontos_obj2[i].x <= obj1.x+obj1.l && pontos_obj2[i].y >= obj1.y && pontos_obj2[i].y <= obj1.y+obj1.a))
        ?colidiu=true:i++;
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
    arvore.atualiza();
    noel.atualiza();
    presente.atualiza();
    boneco.atualiza();
    estrela.atualiza();
    miau.atualiza();
    arvore.colidiu();
    miau.colidiu();
}

function desenha(){
    background.desenha();
    treno.desenha();
    arvore.desenha();
    presente.desenha();
    boneco.desenha();
    noel.desenha();
    estrela.desenha();
    miau.desenha(); 
    if(game.iniciado){
        game.desenha();
    }
}
main();

function keydown(evt){
    if(!outsystems){
        switch (evt.keyCode) {
            case 37:
                noel.andando = true;
                dx =- 1;
                break;
            case 38:
                dy =- 1;
                break;
            case 39:
                noel.andando = true;
                dx = 1;
                break;
            case 40:
                dy = 1;
                break;
        }
    }
}

  
function keyup(evt){
    noel.andando = false;
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
        if(noel.andando){
            noel.numpassosatual++;
        }else{
            noel.numpassosatual = 0
        }
        
        if(noel.numpassosatual == noel.numpassostotal){
            noel.numpassosatual = 0
        }
    }, 50);
}

function gametempo(){
    if(game.tempo == 0 && game.iniciado){
        game.finaliza();
    }else if(game.iniciado){
        game.tempo--;
    }
}
setInterval(gametempo,1000)