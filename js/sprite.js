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
santa = [];

santa[0] = new Sprite(2757,749,224,299);
santa[1] = new Sprite(3047,755,224,299);
santa[2] = new Sprite(3322,753,224,303);
santa[3] = new Sprite(3600,775,224,295);
santa[4] = new Sprite(3864,779,227,294);
santa[5] = new Sprite(4132,784,238,294);
santa[6] = new Sprite(4412,778,241,294);


carro = new Sprite(3196,44,455,280);

present = new Sprite(3722,119,230,132);

olaf = new Sprite(4077,41,267,363);

gato = new Sprite(4470,75,226,237);

estrelacad = new Sprite(2770, 153, 338, 89);

arvorenatal = new Sprite(4865,399,791,1069);