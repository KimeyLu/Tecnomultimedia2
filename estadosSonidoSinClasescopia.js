//---ML5---//
let monitorear = false;
let pitchValue;
let mic;
let pitch;
let audioContext;
//gestor
let gestorAmp;
let gestorPitch;
//------------FREC Y AMP (Calibrable)----------------//
let FREC_MIN = 49;
let FREC_MAX = 250;
let AMP_MIN = 0.001;
let AMP_MAX = 0.06;
//---------------------------------------------------//

//eventos
let haySonido;
let antesHabiaSonido;
//estados
let estado = "fondo";
let marca;
let tiempoLimitefondo = 3000; //3secs 
let tiempoLimitebarra = 3000; //3secs 
let tiempoLimiteplumas = 3000; //3secs 
let tiempoLimitereiniciar = 1000; //1secs 
const model_url = 'https://cdn.jsdelivr.net/gh/ml5js/ml5-data-and-models/models/pitch-detection/crepe/';
//---CANVAS
let windowsX;
let windowsY;
//---VARIABLES DE LAS MANCHAS---//
let manchas;
//---VARIABLES DE LA BARRA---//
let ampli;
let tamañoMaxRec;
let primerColorGrad, segundoColorGrad;
let colorBarraEstatica;
let tamañoBarra;
let tamañoMinimoBarra;
let posRandomY;
//---VARIABLES DE LAS PLUMAS---//
let plumas;

function preload() {
}

function setup() {
  windowsX = random(600, 700);
  windowsY = random(400, 500);
  createCanvas(windowsX, windowsY);
  background(207,193,166);

  manchas = new Manchas();
  plumas = new Plumas();
  //--Barra--//
  tamañoMaxRec = windowsX-40;
  posRandomY = random(height/2, height/3);

  noStroke();
  
  audioContext = getAudioContext();
  mic = new p5.AudioIn();
  mic.start(startPitch);  
  userStartAudio();
  gestorAmp = new GestorSenial(AMP_MIN, AMP_MAX);
  gestorPitch = new GestorSenial(FREC_MIN, FREC_MAX);  
  antesHabiaSonido = false;
}

//------------------------------------PITCH---------------------------------------//
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
      pitchValue = frequency;
     // console.log("frec: "+frequency);  //Para ver FREC
    }
    getPitch();
  })
}



function draw() {
  ampli = gestorAmp.filtrada; 
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
     background(206,204,189);      
     if (inicioElSonido) { //EVENTO
     manchas.aparecer();
     manchas.dibujar();
    } 
    if (haySonido) {
      manchas.dibujar();
    }    
    
    //CONTADOR(cambio de estado)-----------//
      if (finDelSonido) {marca = millis();}
      if (!haySonido ) {
        manchas.dibujar();
        let ahora = millis();
        if (ahora > marca + tiempoLimitefondo) {estado = "barra";
          marca = millis();}}
    //-------------------------------------//
  } else if (estado === "barra") {   
   background(206,204,189);       
   manchas.dibujar(); 
    
    // Asegurarse de que la Barra negra siempre esté al menos un 70% llena
    tamañoMinimoBarra = 0.7 * tamañoMaxRec;
    tamañoBarra = map(ampli, 0, 1, tamañoMinimoBarra, tamañoMaxRec); // Mapear la amplitud filtrada al tamaño de la Barra
    tamañoBarra = min(tamañoBarra, tamañoMaxRec); // Limitar el tamaño de la barra dinámica al tamaño máximo de la barra estática

    // Mapear el valor del tono a un rango de colores de rojo a blanco            //gestorPitch.actualizar
    colorBarraEstatica = lerpColor(color(255, 0, 0), color(255, 255, 255), map(pitchValue, 50, 500, 0, 1));
    // Dibujar la Barra estática detrás
    push();
    fill(colorBarraEstatica); // Color de la Barra estática (cambia de rojo a blanco según el tono)
    rect(20, posRandomY - 25, tamañoMaxRec, 50); // Dibujar la Barra estática
    pop();
    // Dibujar la Barra dinámica delante (negra)
    push();
    fill(0, 0, 0); // Color de la Barra dinámica (negro)
    rect(20, posRandomY - 25, tamañoBarra, 50); // Dibujar la Barra dinámica
    pop();


    //CONTADOR(cambio de estado)-----------//
      if (finDelSonido) {marca = millis();}
      if (!haySonido ) {let ahora = millis();
        if (ahora > marca + tiempoLimitebarra) {estado = "plumas";
          marca = millis();}}
    //-------------------------------------//
  } else if (estado === "plumas") {
    background(206,204,189); 
    manchas.dibujar();
    
    posRandomY = posRandomY;  
    // Dibujar la Barra estática detrás
    push();
    fill(colorBarraEstatica); // Color de la barra estática (cambia de rojo a blanco según el tono)
    rect(20, posRandomY - 25, tamañoMaxRec, 50); // Dibujar la barra estática 
    pop();
    // Dibujar la Barra dinámica delante (negra)
    push();
    fill(0, 0, 0); // Color de la Barra dinámica (negro)
    rect(20, posRandomY - 25, tamañoBarra, 50); // Dibujar la Barra dinámica
    pop();
       
    if (inicioElSonido) { //EVENTO
      plumas.aparecer();
      plumas.dibujar();
    } 
    if (haySonido) {
      plumas.dibujar();
    }   
     
    //CONTADOR(cambio de estado)-----------//
      if (finDelSonido) {

      marca = millis();}
      if (!haySonido ) {
        plumas.dibujar();

        let ahora = millis();
        if (ahora > marca + tiempoLimiteplumas) {estado = "reiniciar";
          marca = millis();}}
    //-------------------------------------//  
  } 
  if (estado === "reiniciar") { 
    background(206,204,189);
    manchas.dibujar();
    
    posRandomY = posRandomY; 
    // Dibujar la Barra estática detrás
    push();
    fill(colorBarraEstatica); // Color de la barra estática (cambia de rojo a blanco según el tono)
    rect(20, posRandomY - 25, tamañoMaxRec, 50); // Dibujar la barra estática 
    pop();
    // Dibujar la Barra dinámica delante (negra)
    push();
    fill(0, 0, 0); // Color de la Barra dinámica (negro)
    rect(20, posRandomY - 25, tamañoBarra, 50); // Dibujar la Barra dinámica
    pop();
    
    plumas.dibujar();
    
    if (haySonido) {
      plumas.aparecerRotadas()
      plumas.cambiarAngulos();
    }
    
    if (finDelSonido) {
      plumas.cambiarAngulos();
    }
    if (!haySonido ) {
      plumas.cambiarAngulos();  
    }
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
