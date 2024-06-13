
//---- CALIBRACION----
let AMP_MIN = 0.01;
let AMP_MAX = 0.3;

let FREC_MIN = 125;
let FREC_MAX = 270;

//----AUDIO----
let mic;

let amp;
let ampCruda;
let frec;

let gestorAmp;
let gestorFrec;
let audioContext;
const pichModel = 'https://cdn.jsdelivr.net/gh/ml5js/ml5-data-and-models/models/pitch-detection/crepe/';


function setup() {
  createCanvas(windowWidth, windowHeight);


  audioContext = getAudioContext();
  mic = new p5.AudioIn();
  mic.start(startPitch);

  userStartAudio(); // forzar el inicio del audio en el navegador

  gestorAmp = new GestorSenial(AMP_MIN, AMP_MAX);
  gestorFrec = new GestorSenial(FREC_MIN, FREC_MAX);
}

function draw() {
  background(220);

  gestorAmp.actualizar(mic.getLevel());// la señal directa (cruda) del mic la administra el gestor


  ampCruda = mic.getLevel();// solo para monitorear la diferencia 
  amp = gestorAmp.filtrada;

  imprimir();
}

//----- DETECCION DE FRECUENCIA-----
function startPitch() {
  pitch = ml5.pitchDetection(pichModel, audioContext , mic.stream, modelLoaded);
}

function modelLoaded() {
  getPitch();
}

function getPitch() {
  pitch.getPitch(function(err, frequency) {
    if (frequency) {
      gestorFrec.actualizar(frequency);
      frec = gestorFrec.filtrada;
    } else {
    }
    getPitch();
  })
}

function imprimir(){

  push();
  
  fill(0);
  stroke(2);
  textSize(20);
  
  let texto = "amp: " + amp;
  text(texto, 20, 20)
  
  texto = "frec: " + frec;
  text(texto, 20, 40)
  
  gestorAmp.dibujar( 20, 50);
  gestorFrec.dibujar( 20, 150);
  
  let y = height - amp * height;
  ellipse(width/2 -50, y, 50, 50);
  
  y = height - ampCruda * height;
  ellipse(width/2 + 50, y, 50, 50);
  
  pop();
  }
