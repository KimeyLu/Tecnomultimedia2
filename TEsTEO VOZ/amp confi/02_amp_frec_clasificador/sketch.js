
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

let classifier;
const options = { probabilityThreshold: 0.9 };
let label;
// Teachable Machine model URL:
let soundModel = 'https://teachablemachine.withgoogle.com/models/8acPbHPNR/';

function preload() {
  // Load SpeechCommands18w sound classifier model
  classifier = ml5.soundClassifier(soundModel + 'model.json', options);
}

//------otros---
let colorDeFondo =  255;


function setup() {
  createCanvas(windowWidth, windowHeight);


  audioContext = getAudioContext();
  mic = new p5.AudioIn();
  mic.start(startPitch);

  userStartAudio(); // forzar el inicio del audio en el navegador

  classifier.classify(gotResult);

  gestorAmp = new GestorSenial(AMP_MIN, AMP_MAX);
  gestorFrec = new GestorSenial(FREC_MIN, FREC_MAX);
}

function draw() {
  background(colorDeFondo);

  gestorAmp.actualizar(mic.getLevel());// la señal directa (cruda) del mic la administra el gestor


  ampCruda = mic.getLevel();// solo para monitorear la diferencia 
  amp = gestorAmp.filtrada;

  if(label == "aplauso"){
    colorDeFondo = color (random(255), random(255), random(255)) ;
    label = "";
  }else if(label == "nota"){
    colorDeFondo = 255;
    label = "";
  }

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

//-------- CLASIFICADOR------
function gotResult(error, results) {
  // Display error in the console
  if (error) {
    console.error(error);
  }
  // The results are in an array ordered by confidence.
  console.log(results);
  label = results[0].label;
  //console.log(label);
  
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
