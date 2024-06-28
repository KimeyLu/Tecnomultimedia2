class Manchas {
  constructor() {
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
   ///background(207,193,166);
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
          // pop();
            // tint(255, 100);     si pongo todo esto el programa se lageea y desaparecen las plumas
            // imageMode(CENTER);
           image(this.manchasB[j],pos.x, pos.y, this.x2, this.y2);
          // push();
         }
       }
  }
}
