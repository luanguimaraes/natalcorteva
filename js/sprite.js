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
santa2 = new Sprite(2988,1183,230,300);
santa3 = new Sprite(3259,1190,242,298);
santa4 = new Sprite(3534,1186,250,297);
santa5 = new Sprite(2735,775,225,304);
santa6 = new Sprite(3025,780,225,309);
santa7 = new Sprite(3300,779,225,309);

carro = new Sprite(2749,439,458,282);

presente = new Sprite(2817,162,243,141);

olaf = new Sprite(3151,139,267,363);

gato = new Sprite(3471,144,232,245);

estrela = new Sprite(3430, 508, 335, 124);