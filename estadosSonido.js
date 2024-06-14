let monitorear = false;

//ml5
let mic;
let pitch;
let audioContext;

//gestor
let gestorAmp;
let gestorPitch;

//------------FREC Y AMP (Calibrable)----------------
let FREC_MIN = 49;
let FREC_MAX = 250;
let AMP_MIN = 0.0000001;
let AMP_MAX = 0.06;
//---------------------------------------------------
//eventos
let haySonido;
let antesHabiaSonido;

//estados
let estado = "fondo";
/*let ahora = 0*/
let marca;
let tiempoLimitefondo = 3000; //3secs (despues de hacer ruido)
let tiempoLimitebarra = 3000; //3secs (despues de hacer ruido o si no hago ruido)
let tiempoLimiteplumas = 3000; //3secs (despues de hacer ruido o si no hago ruido)
let tiempoLimitereiniciar = 5000; //5secs (despues de hacer ruido o si no hago ruido)

const model_url = 'https://cdn.jsdelivr.net/gh/ml5js/ml5-data-and-models/models/pitch-detection/crepe/';
//canvas tamaños random
let windowsX;
let windowsY;
//clases
let manchas;
let barra;
let plumas;


function setup() {
  windowsX = random(600, 700);
  windowsY = random(400, 500);
  createCanvas(windowsX, windowsY);

  //clases
  manchas = new Manchas();
  barra = new Barra();
  plumas = new Plumas();
  //audio
  audioContext = getAudioContext();
  mic = new p5.AudioIn();
  mic.start(startPitch);  
  userStartAudio();
  
  gestorAmp = new GestorSenial(AMP_MIN, AMP_MAX);
  gestorPitch = new GestorSenial(FREC_MIN, FREC_MAX);  
  antesHabiaSonido = false;
}


function draw() {
  background(207,193,166);
  var vol = mic.getLevel();
  gestorAmp.actualizar(vol);
  //console.log("amplitud: "+vol); //Para ver AMP
  //---------------UMBRAL DE SONIDO (Calibrable)-----------------
  haySonido = gestorAmp.filtrada > 0.1;
  //-------------------------------------------------------------
  console.log("Hay sonido: "+haySonido); ////Para ver umbral

  let inicioElSonido = haySonido && !antesHabiaSonido;
  let finDelSonido = !haySonido && antesHabiaSonido;


  
  //**************ESTADOS****************
  if (estado === "fondo") {
    //background(207,193,166);

    //
    text("ESTAMOS EN EL ESTADO: "+estado,10, 20);
    //
    
    if (inicioElSonido) { //EVENTO
      manchas.dibujar();
    } 
    if (haySonido) {
      manchas.dibujar();
    }
    
    //CONTADOR(cambio de estado)-----------//
      if (finDelSonido) {marca = millis();}
      if (!haySonido ) {let ahora = millis();
        if (ahora > marca + tiempoLimitefondo) {estado = "barra";
          marca = millis();}}
    //-------------------------------------//
  } else if (estado === "barra") {
    //background(0, 150, 150);
    //
    text("ESTAMOS EN EL ESTADO: "+estado,10, 20);
    //
    
    if (inicioElSonido) { //EVENTO
      barra.dibujar();
    } 
    if (haySonido) { //EVENTO
      barra.dibujar();
    } 

    //CONTADOR(cambio de estado)-----------//
      if (finDelSonido) {marca = millis();}
      if (!haySonido ) {let ahora = millis();
        if (ahora > marca + tiempoLimitebarra) {estado = "plumas";
          marca = millis();}}
    //-------------------------------------//
  }else if (estado === "plumas") {
    //background(150, 0, 150);
    //
    text("ESTAMOS EN EL ESTADO: "+estado,10, 20);
    //
    
    if (inicioElSonido) { //EVENTO
      plumas.dibujar();
    } 
    if (haySonido) { //EVENTO
      plumas.dibujar();
    }

    //CONTADOR(cambio de estado)-----------//
      if (finDelSonido) {marca = millis();}
      if (!haySonido ) {let ahora = millis();
        if (ahora > marca + tiempoLimiteplumas) {estado = "reiniciar";
          marca = millis();}}
    //-------------------------------------//    
  } 
  if (estado === "reiniciar") { 
    //background(0); 
    //
    text("ESTAMOS EN EL ESTADO: "+estado,10, 20);
    //
    
    //CONTADOR(cambio de estado)-----------//
      /*if (finDelSonido) {marca = millis();}
      if (!haySonido ) {let ahora = millis();
        if (ahora > marca + tiempoLimitereiniciar) {estado = "fondo";
          marca = millis();}}*/
    //-------------------------------------// 
  } 
  
  
  
  
  
  
  
  //---MONITOREAR ESTADOS---:
  console.log(estado);
  /*if(monitorear) {
    gestorAmp.dibujar(100, 100);
    gestorPitch.dibujar(100, 200);}*/
  //console.log("inicio del sonido: "+inicioElSonido);
  //console.log("fin del sonido: "+finDelSonido);
  //console.log("Antes habia sonido: "+antesHabiaSonido);
  //console.log("TIEMPO: "+round((millis())/1000)+"s");
  //------------------------
  
  antesHabiaSonido = haySonido; 
}



//*------------------------------------PITCH---------------------------------------*//
function startPitch() {
  pitch = ml5.pitchDetection(model_url, audioContext , mic.stream, modelLoaded);
}

function modelLoaded() {
  getPitch();
}

function getPitch() {
  pitch.getPitch(function(err, frequency) {
    if (frequency) {
      gestorPitch.actualizar (frequency);
     // console.log("frec: "+frequency);  //Para ver FREC
    }
    getPitch();
  })
}
