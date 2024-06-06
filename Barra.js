class Barra {
  constructor() {
    this.x = 10
    this.y = random(height/2, height/3)
    this.y2 = random(40, 60)
  
    this.contador = 1
    
    this.colorba = 1
    
  }
  
  dibujar() {
  /*var vol = mic.getLevel()
  console.log(vol)*/
    
   if(mouseY < 350){
      push()
         fill(40+mouseY/2)
         rect(this.x, this.y, 380, this.y2)
      pop()
      push()
         fill(0)
         rect(this.x, this.y, mouseY, this.y2)
      pop()
    } else {
      this.contador++
      push()
         fill(150)
         rect(this.x, this.y, 380, this.y2)
      pop()
      push()
         fill(0)
         rect(this.x, this.y, 350, this.y2)
      pop()
    }
    
    /*quizas no se cambia rapido porque el color a avanzado 
    mucho mas que 255*/
    /*pase progresivo a rojo*/
    if (this.contador > 50) {
      push()
         fill(this.colorba++, 0, 0, this.colorba++)
         rect(this.x, this.y, 380, this.y2)
      pop()
      push()
         fill(0)
         rect(this.x, this.y, 350, this.y2)
      pop()
      this.contador = 50
    } 
    if (mouseY < 350) { 
      
      this.colorba --
      /*this.contador --*/
      push()
         fill(this.colorba, 0, 0, this.colorba)
         rect(this.x, this.y, 380, this.y2)
      pop()
      push()
         fill(0)
         rect(this.x, this.y, mouseY, this.y2)
      pop()
      this.contador = 0
    } 
    
    /*if(this.colorba == 255) {
      this.colorba = 0  
    }*/
        /*contador*/
        text(this.contador, 20, 380)
  }
}
