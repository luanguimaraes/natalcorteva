var canvas, ctx, altura, largura, img, velocidade = 10, mov = false, pos = 0, numpassostotal= 12, numpassosatual = 0, outsystems = false;

background = {
    x: 0,
    y: 0,

    desenha: function(){
        back.desenha(this.x, this.y)
        back.desenha(this.x + back.largura, this.y);
    }  
}

treno = {
    x:0,
    y:1120,

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
        //console.log(`noel x, ${noel.x+40}, presente x: ${this.x}`)
        if((noel.x+40) >= this.x && outsystems == false){
            outsystems = true;
            alert("foi");
        }
    }
}

miau = {
    x: 2685,
    y: 0,

    atualiza: function(){
        if(gato.largura)
        this.x -= 5;
        this.y += 1;
        //console.log(this.x);
        //console.log(gato.largura)
    },

    desenha: function(){
        gato.desenha(this.x, this.y);
    }
}

boneco = {
    x: 2600,
    y: 1120,

    desenha: function(){
        olaf.desenha(this.x, this.y);
    }
}

neve = {
    x: 0,
    y: 0,
    _nev:[],
    _sprite: [gato],
    tempoInsere: 10,


    insere: function(){
        this._nev.push({
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
            //console.log(this.tempoInsere);
            this.insere();
        }else{
            this.tempoInsere--;
        }
        console.log(this.tempoInsere);
        for(var i = 0, tam = this._nev.length; i < tam; i++){
            var nev = this._nev[i];
            nev.y += velocidade;
            if(nev.y <= -nev.altura){
                this._nev.splice(i,1);
                tam--;
                i--;
            }
        }
    },

    desenha: function(){
        for(var i = 0, tam = this._nev.length; i < tam; i++){
            var nev = this._nev[i];

            gato.desenha(nev.x, nev.y, nev.largura, nev.altura);
        }
    }
}


noel = {
    x: 0,
    y: 1120,
    pos: 0,
    caminhar:[0,1,2,3,2,1,0,4,5,6,5,4],
    atualiza: function(){
        
    },


    desenha: function(){
        santa[this.caminhar[numpassosatual]].desenha(this.x, this.y)
    },

    libera: function(){
        outsystems = false;
    },


    mover: function(evt){
        //console.log(evt);

        if(evt.type == "click"){
           if(evt.x > (this.x + 75)){
                this.x += velocidade;
           }else{
                this.x -= velocidade;
           }
        }



        switch (evt.keyCode) {
            case 38:
                if (this.y - this.dy > 0){
                    this.y -= this.dy;
                }
                break;
            case 40:
                if (this.y + this.dy < altura-30){
                    this.y += this.dy;
                }
                break;
            case 37:
                if(this.x > 0){
                    mov = true;
                    this.x -= velocidade;
                    background.x += velocidade;
                    treno.x += velocidade;
                    presente.x += velocidade;
                    boneco.x += velocidade;
                }
                break;
            case 39:
                if(this.x < largura - 1500){
                    this.x += velocidade;
                    mov = true;
                    background.x -= velocidade;
                    treno.x -= velocidade;
                    presente.x -= velocidade;
                    boneco.x -= velocidade;
                }
                break;
            case 32:
                if(Time == 0){
                    Time = 35;
                }
          }
      },
}



function main(){
    largura = 2685;
    altura = 1500;
    canvas = document.getElementsByClassName("canvas")[0];
    canvas.width = largura;
    canvas.height = altura;
    ctx = canvas.getContext("2d");
    window.addEventListener('keydown', clique);
    window.addEventListener('keyup', clique2);
    //window.addEventListener('click', mouseup);
    //window.addEventListener('mousedown', mousedown);
    img = new Image();
    img.src = "img/sprite.png";
    roda();
    loop();

}
var i = 0;
function mouseup(event){
    //i++;
    //console.log(i);
    //console.log("clicou");
}

function mousedown(event){
    out = document.getElementById("out");
    out.innerHTML += event;
    //console.log(event);
}


function roda(){
    atualiza();
    desenha();
    window.requestAnimationFrame(roda);
}

function atualiza(){
    //background.atualiza();
   //treno.atualiza();
    //noel.atualiza();
    miau.atualiza();
    presente.colidiu();
    neve.atualiza();
}

function desenha(){
    background.desenha();
    neve.desenha();
    treno.desenha();
    presente.desenha();
    boneco.desenha();
    noel.desenha();
    //ctx.scale(0.5,0.5);
    miau.desenha();
    //ctx.scale(1,1);
    
}
main();

function clique(event){
    if(!outsystems){
        noel.mover(event);
    }
    if(event.keyCode==80){
      if (pause == true) {
        pause = false;
      }else {
        pause = true;
      }
    }
  }

  function clique2(event){
    mov = false;
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
    }, 90);
  }