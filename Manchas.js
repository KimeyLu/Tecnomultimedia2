class Manchas {
  constructor() {
    //let img;
    this.manchasB = [];
    //let imagesOnScreen = [];
    this.cantidadMancha = 4;
    
    /*this.x = random(0, width);
    this.y = random(0, height);
    this.x2 = random(100, 200);
    this.y2 = random(100, 200);*/
    
    
    this.x = this.x;
    
    this.y = 0;
    this.x2 = 0;
    this.y2 = 0;
    
    //img = loadImage('data/fondo.png');
    
    for(let i = 0; i < this.cantidadMancha; i++) {
      let nombre = "data/mancha" + nf(i, 2) + ".png";
      this.manchasB[i] = loadImage(nombre);
    }
  }
  
  dibujar() {
      // Dibujar las imágenes de manchas   
    /*this.x = random(0, width);
    this.y = random(0, height);
    this.x2 = random(100, 200);
    this.y2 = random(100, 200);*/

  if (estado == "fondo") {
    this.x = random(0, width);
    this.y = random(0, height);
    this.x2 = random(100, 200);
    this.y2 = random(100, 200);
  }
  
    for(let i = 0; i < this.cantidadMancha; i++) {
       push();
       tint(255, 100);
       imageMode(CENTER);
       image(this.manchasB[i],this.x, this.y, this.x2, this.y2);
       pop();
    }
  }
  
  
  
  
  
}
