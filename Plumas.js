class Plumas {
  constructor() {
    this.mostrarIzquierda = false;
    this.mostrarCentro = false;
    this.mostrarDerecha = false; 
    
    this.mostrarIzquierdaRotada = false;
    this.mostrarCentroRotada = false;
    this.mostrarDerechaRotada = false;
    
    //dibujar imagenes
    this.tamañoImagen = 250;
    this.imgIzquierda = loadImage('data/obj1.png');
    this.imgDerecha = loadImage('data/obj2.png');
      //izquierda
      this.posXIzquierda = 100;  
      this.posYIzquierda = 200;                   
      //centro
      this.posXCentro = width/2;                                           
      this.posYCentro = 200;                                      
      //derecha
      this.posXDerecha = width - 100;                     
      this.posYDerecha = 200;    
      
    //cambiar Angulos
    this.angulo = -80;
    
    angleMode(DEGREES);
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
    this.imgIzquierda.resize(this.tamañoImagen, 0);
    this.imgDerecha.resize(this.tamañoImagen, 0);
    
    //izquierda
    if (this.mostrarIzquierda) {
      push();
      imageMode(CENTER);
      image(this.imgIzquierda, this.posXIzquierda, this.posYIzquierda); 
      pop();
    }
    //centro 
    if (this.mostrarCentro) {
      push();
      imageMode(CENTER);
      image(this.imgDerecha, this.posXCentro, this.posYCentro);
      pop();
    }
    //derecha
    if (this.mostrarDerecha) { 
      push();
      imageMode(CENTER);
      image(this.imgIzquierda, this.posXDerecha, this.posYDerecha); 
      pop();
    }
    
  }
  
   aparecerRotadas(){
    if (!this.mostrarCentroRotada && this.mostrarCentro) {
      this.mostrarCentroRotada = true;
    } 
    if (!this.mostrarIzquierdaRotada && this.mostrarIzquierda) {
      this.mostrarIzquierdaRotada = true; 
    }
    if (!this.mostrarDerechaRotada && this.mostrarDerecha) {
      this.mostrarDerechaRotada = true;
    } 
  }
  
  cambiarAngulos(){
  //para que las manchas no cambien de angulo al mismo tiempo, jugar con los true/false de las variables de "mostrar"  
    
   //izquierda
   if (this.mostrarIzquierdaRotada) {    
     this.mostrarIzquierda = false;   
     push();
     translate(this.posXIzquierda, this.posYIzquierda);
     rotate(this.angulo);
     //rotate(frameCount); //(para monitorear si funciona bien la rotacion). 
     imageMode(CENTER);
     image(this.imgIzquierda, 0, 0);
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
     image(this.imgDerecha, 0, 0);
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
     image(this.imgIzquierda, 0, 0);
     pop();  
   }
  }
}
