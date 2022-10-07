function Sprite(x, y , largura, altura){
    this.x = x;
    this.y = y;
    this.largura = largura;
    this.altura = altura;
    this.desenha = function(xCanvas, yCanvas) {
        ctx.drawImage(img, this.x, this.y, this.largura, this.altura, xCanvas, yCanvas, this.largura, this.altura);
    }
}



back = new Sprite(0,0,2697,1500);


santa1 = new Sprite(2725,1180,223,298);
santa2 = new Sprite(3110,1157,240,310);
santa3 = new Sprite(3403,1163,240,310);
santa4 = new Sprite(3403,1163,240,310);
santa5 = new Sprite(3403,1163,240,310);
santa6 = new Sprite(3403,1163,240,310);
santa7 = new Sprite(3403,1163,240,310);