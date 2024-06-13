class Caminante{

    constructor( figura){
        
        this.saltar();
        this.diam = random(15, 40);

        this.vel = 3;
        this.dir = radians(random(360));

        this.elColor = color(random(255), random(255), random(255) );
        this.figura = figura;

    }

//-----------------------------------------------
actualizar(amplitud, frecuencia, diferencia){
    this.diam = map(amplitud, 0, 1, 5, 30);
    this.vel = map(amplitud, 0, 1, 2, 10);


    push();
    colorMode(HSB);
    let tinte = map(frecuencia, 0, 1, 0, 255, true);
    this.elColor = color(tinte, 255, 255);
    pop();

    this.dir += radians(diferencia);
}

//-----------------------------------------------
actualizar(amplitud, frecuencia, derivada){
    this.diam = map(amplitud, 0, 1, 5, 30);
    this.vel = map(amplitud, 0, 1, 2, 10);

    push()
    colorMode(HSB);
    let tinte = map(frecuencia, 0, 1, 0, 255, true);
    this.elColor = color(tinte, 255, 255);
    pop();

    this.dir += map(derivada, -1, 1, -0.2, 0.2);

}

/*
    //-----------------------------------------------
    actualizar(amplitud){
        this.diam = map(amplitud, 0, 1, 5, 30);
        this.vel = map(amplitud, 0, 1, 2, 10);

    }
    */

    //-----------------------------------------------
    saltar(){
        this.x = random(windowWidth);
        this.y = random(windowHeight);
        this.dir = radians(random(360));
        this.elColor = color(random(255), random(255), random(255) );
    }
    
    //-----------------------------------------------
    cambiarTamanio(tam){
        this.diam = tam;
    }

    //-----------------------------------------------
    cambiarColor(nuevoColor){
        this.elColor = nuevoColor;
    }
    //-----------------------------------------------
    mover(){

        this.dir += radians(random(-5, 5));

        this.x = this.x + this.vel * cos(this.dir);
        this.y = this.y + this.vel * sin(this.dir);

        //--------Espacio toroidal---
        this.x = this.x > windowWidth ? this.x - windowWidth :  this.x;
        this.x = this.x < 0 ? this.x + windowWidth : this.x;

        this.y = this.y > windowHeight ? this.y - windowHeight :  this.y;
        this.y = this.y < 0 ? this.y + windowHeight : this.y;
    }
    //-----------------------------------------------
    dibujar(){
  
        this.figura.fill(this.elColor)
        this.figura.noStroke();
        this.figura.ellipse(this.x, this.y, this.diam, this.diam);
    }
}