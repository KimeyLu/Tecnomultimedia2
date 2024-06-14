class Manchas {
  constructor() {
    this.manchasB = loadImage('data/mancha01.png');
    /*let imagesOnScreen = [];
    let cantidadMancha = 4;*/
    
    //this.manchasB = loadImage('data/mancha01.png');
  }
  
  dibujar() {
      // Dibujar las imágenes de manchas
      image(this.manchasB, 0, 0, width, height);
  }
  
}
