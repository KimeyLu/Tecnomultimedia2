class Plumas {
  constructor() {
    this.mostrarIzquierda = false;
    this.mostrarCentro = false;
    this.mostrarDerecha = false; 
    
    this.mostrarIzquierdaRotada = false;
    this.mostrarCentroRotada = false;
    this.mostrarDerechaRotada = false;
    
    //dibujar imagenes
    this.imgPlumas = [];
    
    let pluma1 = loadImage('data/obj0.png'); 
    let pluma2 = loadImage('data/obj1.png');
    let pluma3 = loadImage('data/obj2.png');
    let pluma4 = loadImage('data/obj3.png');
    let pluma5 = loadImage('data/obj4.png');
    let pluma6 = loadImage('data/obj5.png');
    this.imgPlumas = [pluma1, pluma2, pluma3, pluma4, pluma5,pluma6];    
        
    //    
    this.tamañoImagen = 250;
    //this.imgIzquierda = loadImage('data/obj1.png');
    this.imgDerecha = loadImage('data/obj2.png');

      //izquierda
      this.posXIzquierda = width/3;  
      this.posYIzquierda = random(150, 300);                   
      //centro
      this.posXCentro = width/2;                                           
      this.posYCentro =  random(100, 300);                                      
      //derecha
      this.posXDerecha = width/1.5;                     
      this.posYDerecha =  random(150, 300);    
      
    //cambiar Angulos
    this.angulo = -80; 
    
    this.randomImg = random(this.imgPlumas)
    angleMode(DEGREES);
    
    this.seleccionarImagenRandom();
  }
  
  seleccionarImagenRandom() {
    this.imgIzquierda = random(this.imgPlumas);
    this.imgCentro = random(this.imgPlumas);
    this.imgDerecha = random(this.imgPlumas);
  }
  
  aparecer(){
    if (!this.mostrarCentro) {
      this.mostrarCentro = true; 
    } else if (this.mostrarCentro && !this.mostrarIzquierda) {
      this.mostrarIzquierda = true;
    } else if (this.mostrarIzquierda && !this.mostrarDerecha) {
      this.mostrarDerecha = true;
    } 
  }
  

  
dibujar(){
    this.randomImg.resize(this.tamañoImagen, 0);
  
    if (this.mostrarIzquierda) {
        push();
        imageMode(CENTER);
      this.imgIzquierda.resize(this.tamañoImagen, 0);
      image(this.imgIzquierda, this.posXIzquierda, this.posYIzquierda);
        //image(this.randomImg, this.posXIzquierda, this.posYIzquierda); 
        pop(); 
      }
    //centro 
    if (this.mostrarCentro) {
      push();
      imageMode(CENTER);
            this.imgCentro.resize(this.tamañoImagen, 0);
      image(this.imgCentro, this.posXCentro, this.posYCentro);
      //image(this.randomImg, this.posXCentro, this.posYCentro);
      pop();
    }
    //derecha
      if (this.mostrarDerecha) { 
        push();
        imageMode(CENTER);
              this.imgDerecha.resize(this.tamañoImagen, 0);
      image(this.imgDerecha, this.posXDerecha, this.posYDerecha);
        //image(this.randomImg, this.posXDerecha, this.posYDerecha); 
        pop();
      }
  }
  
   aparecerRotadas(){
     
    if (!this.mostrarCentroRotada && this.mostrarCentro) {
      this.mostrarCentroRotada = true;
    } else if (!this.mostrarIzquierdaRotada && this.mostrarIzquierda) {
      this.mostrarIzquierdaRotada = true; 
     // this.seleccionarImagenRandom();
    } else if (!this.mostrarDerechaRotada && this.mostrarDerecha) {
      this.mostrarDerechaRotada = true;
     // this.seleccionarImagenRandom();
    } 
  }
   //la izquierda es la unica que funciona?
  cambiarAngulos(){    
   //izquierda
   if (this.mostrarIzquierdaRotada) {    
     this.mostrarIzquierda = false; 
     push();
     translate(this.posXIzquierda, this.posYIzquierda);
     rotate(this.angulo);
     //rotate(frameCount); //(para monitorear si funciona bien la rotacion). 
     imageMode(CENTER);
     this.imgIzquierda.resize(this.tamañoImagen, 0);
     image(this.imgIzquierda, 0, 0);
     //image(this.randomImg, 0, 0);
     pop();  
   }
   
   //centro
   if (this.mostrarCentroRotada) {
     this.mostrarCentro = false;
     push();
     translate(this.posXCentro, this.posYCentro);
     rotate(this.angulo);
     //rotate(frameCount); //(para monitorear si funciona bien la rotacion). 
     imageMode(CENTER);
          this.imgCentro.resize(this.tamañoImagen, 0);
           image(this.imgCentro, 0, 0);
     //image(this.randomImg, 0, 0);
     pop();  
   }

   //derecha
   if (this.mostrarDerechaRotada) {  
     this.mostrarDerecha = false;
     push();
     translate(this.posXDerecha, this.posYDerecha);
     rotate(this.angulo);
     //rotate(frameCount); //(para monitorear si funciona bien la rotacion). 
     imageMode(CENTER);
     this.imgDerecha.resize(this.tamañoImagen, 0);
     image(this.imgDerecha, 0, 0);
     //image(this.randomImg, 0, 0);
     pop(); 
   }
  }
  
  reiniciar() {
    this.mostrarIzquierda = false;
    this.mostrarCentro = false;
    this.mostrarDerecha = false; 
    
    this.mostrarIzquierdaRotada = false;
    this.mostrarCentroRotada = false;
    this.mostrarDerechaRotada = false;
    
    this.imgIzquierda = random(this.imgPlumas);
    this.imgCentro = random(this.imgPlumas);
    this.imgDerecha = random(this.imgPlumas);
    
          //izquierda
      this.posXIzquierda = width/3;  
      this.posYIzquierda = random(150, 300);                   
      //centro
      this.posXCentro = width/2;                                           
      this.posYCentro =  random(100, 300);                                      
      //derecha
      this.posXDerecha = width/1.5;                     
      this.posYDerecha =  random(150, 300);  
  }
}
