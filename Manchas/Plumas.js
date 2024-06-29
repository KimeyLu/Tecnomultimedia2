class Plumas {
  constructor() {
      this.imagenes = loadImage('data/obj3.png');
  }
  
  dibujar() {
      image(this.imagenes, 0, 0, width, height);    
  }
}
