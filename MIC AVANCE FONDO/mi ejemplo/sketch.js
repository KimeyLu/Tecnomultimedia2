
const model_url = 'https://cdn.jsdelivr.net/gh/ml5js/ml5-data-and-models/models/pitch-detection/crepe/';

let monitorear = false;

let mic;
let pitch;
let audioContext;

let gestorAmp;
let gestorPitch;


let umbral_sonido = 0.03;
let antesHabiaSonido;

let animaciones = [];
let imagenFrente;
let imagenFondo;
let colorActual;
let cual = 0;
let xActual, yActual;
let dirActual;

function preload(){
  animaciones[0] = new Animacion( "data/tinta1/macha" , 5 , 1 , 10 );
  ////HAY QUE ACHICAR IMAGENES Y COLOCAR OTRAS ,MASSS GRISESE
 
}

function setup() {
  createCanvas(displayWidth, displayHeight);

  //inicializo la escucha de sonido
  audioContext = getAudioContext();
	mic = new p5.AudioIn();
  //acá le pido que llame a startPitch
  mic.start( startPitch );

  //hay que agregar esto
	userStartAudio();

  background(255);
  
  //inicializo los objetos de gestión de señal
  gestorAmp = new GestorSenial( 0.0 , 0.5 );
  gestorPitch = new GestorSenial( 40 , 80 );

  imagenFrente = createGraphics( width , height );
  imagenFrente.imageMode( CENTER );
  imagenFondo = createGraphics( width , height );
  imagenFondo.imageMode( CENTER );
  actualizarColor();
  
}

function actualizarColor( valor_){
  push();
  colorMode( HSB , 360 , 100 , 100 , 100 );
  colorActual = color( valor_*360 , 100 , 100 );
  pop();
}

function draw() {
  background(0);

  let vol = mic.getLevel();
  gestorAmp.actualizar( vol );

  let haySonido = gestorAmp.filtrada > umbral_sonido;

  let empezoElSonido = haySonido && !antesHabiaSonido;
  let terminoElSonido = !haySonido && antesHabiaSonido;

  if( empezoElSonido ){
    cual = int( random( animaciones.length ) );
    animaciones[ cual ].reset();    
    xActual = random( width*0.25 , width*0.75 );
    yActual = random( height*0.25, height*0.75 );
    dirActual = random( TWO_PI );
  }
  if( terminoElSonido ){
    imagenFondo.image( imagenFrente , width/2 , height/2 );
    imagenFrente.clear();
  }

  if( haySonido ){
    imagenFrente.clear();
    imagenFrente.push();
    actualizarColor( gestorPitch.filtrada );
    imagenFrente.tint( colorActual );
    imagenFrente.translate( xActual , yActual );
    imagenFrente.rotate( dirActual );
    imagenFrente.image( animaciones[cual].darImagen() , 0 , 0 );
    animaciones[cual].avanzar();
    //imagenFrente.rect(100,100,400,400);
    imagenFrente.pop();
  }

  image( imagenFondo , 0 , 0 );
  image( imagenFrente , 0 , 0 );

  if( monitorear ){
    gestorAmp.dibujar( 100 , 100 );
    gestorPitch.dibujar( 100 , 300 );
  }

  antesHabiaSonido = haySonido;
}
//--------------------------------------------------------------------
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
//--------------------------------------------------------------------
function startPitch() {
  pitch = ml5.pitchDetection(model_url, audioContext , mic.stream, modelLoaded);
}
//--------------------------------------------------------------------
function modelLoaded() {
//select('#status').html('Model Loaded');
getPitch();
//console.log( "entro aca !" );

}
//--------------------------------------------------------------------
function getPitch() {
  pitch.getPitch(function(err, frequency) {
    if (frequency) {    	
      let midiNum = freqToMidi(frequency);
      //console.log( midiNum );

      gestorPitch.actualizar( midiNum );

    }
    getPitch();
  })
}
