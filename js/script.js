var canvas, ctx, altura, largura, img, velocidade = 10, mov = false, pos = 0;

background = {
    x: 0,
    y: 0,

    atualiza: function(){
        //console.log(this.x)
    },

    desenha: function(){
        back.desenha(this.x, this.y)
        back.desenha(this.x + back.largura, this.y);
    },
    
    mover: function(evt){
        switch (evt.keyCode) {
            case 38:  /*seta para cima */
                if (this.y - this.dy > 0){
                    this.y -= this.dy;
                }
                break;
            case 40:  /*set para baixo*/
                if (this.y + this.dy < altura-30){
                    this.y += this.dy;
                }
                break;
              case 37:  /*set para esquerda*/
                      this.x += velocidade;
                  break;
              case 39:  /*seta para direita*/
                      this.x -= velocidade;
                  break;
              case 32:
                  if(Time == 0){
                    // tiro.insere();
                    Time = 35;
                  }
          }
      },

      
}



noel = {
    x: 0,
    y: 1120,
    pos: 0,
    santa:[],
    atualiza: function(){
        //santa = [santa1.desenha(this.x, this.y),santa2.desenha(this.x, this.y),santa3.desenha(this.x, this.y)]
          
    },

    desenha: function(){
        //console.log(this.pos);
        if(pos == 0){
            santa3.desenha(this.x, this.y)
        }else if(pos == 1){
            santa1.desenha(this.x, this.y)
        }else if(pos == 2){
            santa2.desenha(this.x, this.y)
            
        }
    },

    mover: function(evt){
        switch (evt.keyCode) {
            case 38:  /*seta para cima */
                if (this.y - this.dy > 0){
                    this.y -= this.dy;
                }
                break;
            case 40:  /*set para baixo*/
                if (this.y + this.dy < altura-30){
                    this.y += this.dy;
                }
                break;
              case 37:  /*set para esquerda*/
                      this.x += velocidade;
                  break;
              case 39:  /*seta para direita*/
                      this.x -= velocidade;
                  break;
              case 32:
                  if(Time == 0){
                    // tiro.insere();
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
    console.log("main mov: "+mov)
}

function roda(){
    atualiza();
    desenha();
    window.requestAnimationFrame(roda);
}

function atualiza(){
    background.atualiza();
    noel.atualiza();
}

function desenha(){
    background.desenha();
    noel.desenha();
}
main();

function clique(event){
    background.mover(event);
    //noel.mover(event);
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
            if(pos > 1){
                pos = 1
            }else{
                pos++;
            }
            console.log("pos loop: "+pos);
        }
        else{
            pos = 0;
        }
    }, 800);
  }