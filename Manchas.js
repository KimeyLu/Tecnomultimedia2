class Manchas {
  constructor() {
    //variables para condiciones en aparecer (quizas poner "this.")
    this.mostrarIzquierdaSuperior = false;
    this.mostrarDerechaSuperior = false;
    this.mostrarIzquierdaInferior = false;
    this.mostrarDerechaInferior = false;
    
    
    //dibujar imagenes
    this.tamañoImagen = 250;
    this.imgIzquierda = loadImage('data/mancha00.png');
    this.imgDerecha = loadImage('data/mancha02.png');
      //superior
      this.posXIzquierdaSup = width - this.tamañoImagen; 
      this.posYIzquierdaSup = 0;
      this.posXDerechaSup = 0; 
      this.posYDerechaSup = 0;
      //inferior
      this.posXIzquierdaInf = 0; 
      this.posYIzquierdaInf = height - this.tamañoImagen;
      this.posXDerechaInf = width - this.tamañoImagen; 
      this.posYDerechaInf = height - this.tamañoImagen;
     
  }
  
  aparecer(){
    if (!this.mostrarDerechaSuperior) { 
      this.mostrarDerechaSuperior = true;  
    } else if (this.mostrarDerechaSuperior && !this.mostrarIzquierdaSuperior) {
      this.mostrarIzquierdaSuperior = true;
    } else if (this.mostrarIzquierdaSuperior && !this.mostrarIzquierdaInferior) {
      this.mostrarIzquierdaInferior = true;
    } else if (this.mostrarIzquierdaInferior && !this.mostrarDerechaInferior) {
      this.mostrarDerechaInferior = true;
    }
  }
  
  dibujar(){
    this.imgIzquierda.resize(this.tamañoImagen, 0);
    this.imgDerecha.resize(this.tamañoImagen, 0);
    
    if (this.mostrarIzquierdaSuperior) {
      image(this.imgIzquierda, this.posXIzquierdaSup, this.posYIzquierdaSup); //no es izquierda, es derecha, solucionar despues
    }
     //otras imagenes 
    if (this.mostrarDerechaSuperior) {
      image(this.imgDerecha, this.posXDerechaSup, this.posYDerechaSup);
    }
    if (this.mostrarIzquierdaInferior) {
      image(this.imgIzquierda, this.posXIzquierdaInf, this.posYIzquierdaInf);
    }
    if (this.mostrarDerechaInferior) {
      image(this.imgDerecha, this.posXDerechaInf, this.posYDerechaInf);
    }
  }
}
