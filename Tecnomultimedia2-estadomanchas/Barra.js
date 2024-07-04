class Barra {
  constructor() {
    this.x = 10;
    this.y = random(height/2, height/3);
    this.x2 = width-200;
    this.y2 = random(50, 80);
    
    //x2 pero para el rect que se mueve
    this.x2b = mouseY;
    
    this.contador = 0;
    this.colorba = 0;
    noStroke();
  }
  
  dibujar() { 
    /*if (estado == "barra"){*/
    
   if(mouseY < 350){
      push();
      //Barra estatica del fondo
         fill(mouseY/2);
         rect(this.x, this.y, this.x2, this.y2);
      pop();
      push();
      //Barra que se mueve (de adelante)
         fill(0);
         //this.x2b = mouseY
         rect(this.x, this.y, this.x2b, this.y2);
      pop();
      
    } else {
      this.contador++;
      
      this.x2b = width-210;
      
      push();
      //Barra estatica del fondo
         fill(150);
         rect(this.x, this.y, this.x2, this.y2);
      pop();
      push();
      //Barra que se mueve (de adelante)
         fill(0);
         //this.x2-50
         rect(this.x, this.y, this.x2-50, this.y2);
      pop();
    }
    
    //hacer que pase PROGRESIVAMENTE a rojo   
    if (this.contador > 10) {
      this.colorba += 2;
      push();
      //Barra estatica del fondo
         fill(this.colorba++, 0, 0, this.colorba++);
         rect(this.x, this.y, this.x2, this.y2);
      pop();
      push();
      //Barra que se mueve (de adelante)
         fill(0);
         rect(this.x, this.y, this.x2-50, this.y2);
      pop();
      //sospecho que puede haber un problema con este limite de abajo
      this.contador = 10;
    } 
     if (mouseY < 350) { 
      
      this.colorba -= 2;
      push();
            //Barra estatica del fondo
         fill(this.colorba, 0, 0, this.colorba);
         rect(this.x, this.y, this.x2, this.y2);
      pop();
      push();
            //Barra que se mueve (de adelante)
         fill(0);
         rect(this.x, this.y, mouseY, this.y2);
      pop();
    }

        //contador
        //text(this.contador, 20, 380)
        //para que funcione hay qu eborrar el limite de aca abajo
        if (this.contador == 300) {
            this.contador = 0;
        }
        //----

  }
}
