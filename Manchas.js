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
   // if (!this.mostrarDerechaSuperior && !this.mostrarIzquierdaSuperior && !this.mostrarIzquierdaInferior && !this.mostrarDerechaInferior) {
      this.mostrarDerechaSuperior = true;  //ahora, si pongo true, hay 2 que se dibujan al mismo tiempo
   // }     COPIAR EL CODIGO EN PLUMAS (poner "!this.mostrarDerechaSuperior" y "else if")
    if (this.mostrarDerechaSuperior && !this.mostrarIzquierdaSuperior) {
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





















/*class Manchas {
  constructor() {
    //nuevo
    this.manchasB = [];   
    this.x = this.x;  
    this.y = 0;
    this.x2 = 0;
    this.y2 = 0;   
    for(let i = 0; i < 4; i++) {
      let nombre = "data/mancha" + nf(i, 2) + ".png";
      this.manchasB[i] = loadImage(nombre);
    }  
    this.historial = [];    
  }
  
  dibujar() { 
   background(207,193,166);
   //tint(255, 100);
      if (estado == "fondo") {
        if (haySonido){
          this.x = random(width);
          this.y = random(height);
          this.x2 = 200;
          this.y2 = 200;
        }
      } else {
        this.x = this.x; 
        this.y = this.y; 
        this.x2 =this.x2 ;
        this.y2 = this.y2;
      }
       
       var vectorPosicion = createVector(this.x, this.y);
       this.historial.push(vectorPosicion);
       //console.log(this.historial);     
  
       for(let j = 0; j < 4; j++) {
         for(let i = 0; i < this.historial.length; i++) {
           var pos = this.historial[i];
           push();
             //tint(255, 100);  // si pongo todo esto junto el programa se lageea 
             imageMode(CENTER);  
             image(this.manchasB[j],pos.x, pos.y, this.x2, this.y2);
           pop();
         }
       }
  }
}*/
