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
        console.log(`noel x, ${noel.x+40}, presente x: ${this.x}`)
        if((noel.x+40) >= this.x && outsystems == false){
            outsystems = true;
            alert("foi");
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

    mover: function(evt){
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
                    }
                  break;
              case 39:
                    if(this.x < largura - 1500){
                        this.x += velocidade;
                        mov = true;
                        background.x -= velocidade;
                        treno.x -= velocidade;
                        presente.x -= velocidade;
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
    canvas = document.getElementById("canvas");
    canvas.width = largura;
    canvas.height = altura;
    ctx = canvas.getContext("2d");
    window.addEventListener('keydown', clique);
    window.addEventListener('keyup', clique2);
    img = new Image();
    img.src = "img/sprite.png";
    roda();
    loop();

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
    presente.colidiu();
}

function desenha(){
    background.desenha();
    treno.desenha();
    presente.desenha();
    noel.desenha();
}
main();

function clique(event){
    noel.mover(event);
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