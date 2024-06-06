

class Animacion{


    constructor( nombre_ , digitos_ , desde_ , hasta_ ){
        this.imagenes = [];
        this.contador = 0;

        for( let i=desde_ ; i<=hasta_ ; i++ ){
            let nombreCompleto  = nombre_+nf(i,digitos_)+".png";
            this.imagenes[ this.imagenes.length ] = loadImage( nombreCompleto );
        }
        console.log( this.imagenes.length );
    }

    avanzar(){
        if( this.contador<this.imagenes.length-1  ){
            this.contador++;
        }        
    }

    darImagen(){
        //console.log( this.contador );
        return this.imagenes[ this.contador ];
    }

    reset(){
        this.contador = 0;
    }

}