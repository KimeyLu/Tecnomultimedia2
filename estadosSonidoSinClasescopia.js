let monitorear = false;

//otro canvas
//let otroCanvas;
let capaFrente;
let capaDelMedio;

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
//let estado = "fondo";

let marca;
let tiempoLimitefondo = 3000; //5secs (despues de hacer ruido)
let tiempoLimitebarra = 3000; //10secs (despues de hacer ruido o si no hago ruido)
let tiempoLimiteplumas = 3000; //10secs (despues de hacer ruido o si no hago ruido)
let tiempoLimitereiniciar = 1000; //5secs (despues de hacer ruido o si no hago ruido)

const model_url = 'https://cdn.jsdelivr.net/gh/ml5js/ml5-data-and-models/models/pitch-detection/crepe/';
//canvas tamaños random
let windowsX;
let windowsY;

//---VARIABLES DE LAS MANCHAS---------------------------------------------------------------------//
let manchas;
let img;
let manchasB = [];
//let imagesOnScreen = [];
let cantidadMancha = 4; // Número de imágenes de manchas
///nuevo
let xmanchas;
let ymanchas;
let x2manchas;
let y2manchas;

//---VARIABLES DE LA BARRA---------------------------------------------------------------------//
let barra;
///nuevo
let ampli;
let tamañoMaxRec = 500;
//---VARIABLES DE LAS PLUMAS---------------------------------------------------------------------//
let imagenes = [];
let posicionesX = [];
let direcciones = [];
let angulos = [];
let imagenesGrupo1 = [];
let imagenesGrupo2 = [];
let imagenesGrupo3 = [];
let posicionesXGrupo1 = [];
let posicionesYGrupo1 = [];
let posicionesXGrupo2 = [];
let posicionesYGrupo2 = [];
let posicionesXGrupo3 = [];
let posicionesYGrupo3 = [];
//let fondo;
// colocar un falce y un true por tiempo para la rotacion timelaps o colocar si hay mucho ruido se activa la rotacion
//hasta que deje de haber sonido
let rotacionActivada = false;
let gradosRotacion = 0;
let anguloObjetivo = 190;
// cambiar mejor el sonido
/*let AMP_MIN = 0.0000001;
let AMP_MAX = 0.06;*/
let AMP_MED = 0.3;
let amp;
let haySonidomanchas = false;
let MuchoSonido = false;
let PosY = 178;
let fondoPosX = 0;
let fondoPosY = 0;


let imgaen;

function preload() {
  img = loadImage('data/fondo.png');
  //-------------------Plumas-------------------------/
    for(let i = 0; i < cantidadMancha; i++) {
      let nombre = "data/mancha" + nf(i, 2) + ".png";
      manchasB[i] = loadImage(nombre);
    }

  //-------------------Plumas-------------------------/
  imagenes[0] = loadImage("data/obj1.png");
  imagenes[1] = loadImage("data/obj2.png");
  imagenes[2] = loadImage("data/obj3.png");
  
  //prueba
  imgaen = loadImage("data/fondo_tecno.png");
}

function setup() {
  windowsX = random(600, 700);
  windowsY = random(400, 500);
  createCanvas(windowsX, windowsY);
  background(207,193,166);
  otroCanvas = createGraphics(windowsX, windowsY);
  //otroCanvas = createImage(windowsX, windowsY);
  //capaDelMedio = createGraphics(windowsX, windowsY);
  //otroCanvas.clear();
    manchas = new Manchas();
 // barra = new Barra();
  
  audioContext = getAudioContext();
  mic = new p5.AudioIn();
  mic.start(startPitch);  
  userStartAudio();
  
  gestorAmp = new GestorSenial(AMP_MIN, AMP_MAX);
  gestorPitch = new GestorSenial(FREC_MIN, FREC_MAX);  
  antesHabiaSonido = false;
  
    //manchas
      let xmanchas = 0;
    let ymanchas = 0;
    let x2manchas = 0;
    let y2manchas = 0;
  
  //--plumas--//
  posicionesX[0] = 130;
  posicionesX[1] = 180;
  posicionesX[2] = 230;
  posicionesX[3] = 280;

  direcciones[0] = 1;
  direcciones[1] = 1;
  direcciones[2] = -1;
  direcciones[3] = -1;

  angulos[0] = 0;
  angulos[1] = 0;
  angulos[2] = 0;
  angulos[3] = 0;

  inicializarPosiciones(imagenesGrupo1, posicionesXGrupo1, posicionesYGrupo1);
  inicializarPosiciones(imagenesGrupo2, posicionesXGrupo2, posicionesYGrupo2);
  inicializarPosiciones(imagenesGrupo3, posicionesXGrupo3, posicionesYGrupo3);
  
  noStroke();
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
           
     if (inicioElSonido) { //EVENTO
     manchas.dibujar()
    } 
    if (haySonido) {
      manchas.dibujar()
    }    
    
    //CONTADOR(cambio de estado)-----------//
      if (finDelSonido) {marca = millis();}
      if (!haySonido ) {let ahora = millis();
        if (ahora > marca + tiempoLimitefondo) {estado = "barra";
          marca = millis();}}
    //-------------------------------------//
  } else if (estado === "barra") {   
   background(207,193,166);       

      manchas.dibujar(); 

    // Asegurarse de que la barra negra siempre esté al menos un 70% llena
    let tamañoMinimoBarra = 0.7 * tamañoMaxRec;
    let tamañoBarra = map(ampli, 0, 1, tamañoMinimoBarra, tamañoMaxRec); // Mapear la amplitud filtrada al tamaño de la barra
    tamañoBarra = min(tamañoBarra, tamañoMaxRec); // Limitar el tamaño de la barra dinámica al tamaño máximo de la barra estática

    // Mapear el valor del tono a un rango de colores de rojo a blanco            //gestorPitch.actualizar
    let colorBarraEstatica = lerpColor(color(255, 0, 0), color(255, 255, 255), map(pitchValue, 50, 500, 0, 1));

    // Dibujar la barra estática detrás
    push();
    fill(colorBarraEstatica); // Color de la barra estática (cambia de rojo a blanco según el tono)
    rect(20, height/2 - 25, tamañoMaxRec, 50); // Dibujar la barra estática
    pop();

    // Dibujar la barra dinámica delante (negra)
    push();
    fill(0, 0, 0); // Color de la barra dinámica (negro)
    rect(20, height/2 - 25, tamañoBarra, 50); // Dibujar la barra dinámica
    pop();


    //CONTADOR(cambio de estado)-----------//
      if (finDelSonido) {marca = millis();}
      if (!haySonido ) {let ahora = millis();
        if (ahora > marca + tiempoLimitebarra) {estado = "plumas";
          marca = millis();}}
    //-------------------------------------//
  } else if (estado === "plumas") {
    background(207,193,166);
                //manchas
manchas.dibujar();
      
    
        let tamañoMinimoBarra = 0.7 * tamañoMaxRec;
    let tamañoBarra = map(ampli, 0, 1, tamañoMinimoBarra, tamañoMaxRec); // Mapear la amplitud filtrada al tamaño de la barra
    tamañoBarra = min(tamañoBarra, tamañoMaxRec); // Limitar el tamaño de la barra dinámica al tamaño máximo de la barra estática

    // Mapear el valor del tono a un rango de colores de rojo a blanco            //gestorPitch.actualizar
    let colorBarraEstatica = lerpColor(color(255, 0, 0), color(255, 255, 255), map(pitchValue, 50, 500, 0, 1));

    // Dibujar la barra estática detrás
    push();
    fill(colorBarraEstatica); // Color de la barra estática (cambia de rojo a blanco según el tono)
    rect(20, height/2 - 25, tamañoMaxRec, 50); // Dibujar la barra estática
    pop();

    // Dibujar la barra dinámica delante (negra)
    push();
    fill(0, 0, 0); // Color de la barra dinámica (negro)
    rect(20, height/2 - 25, tamañoBarra, 50); // Dibujar la barra dinámica
    pop();

 
    //   
      otroCanvas.clear();
    
    //---Manchas---//   
    for (let i = 0; i < imagenes.length; i++) {
     otroCanvas.push(); //ESTO funciona (casi)
    //push(); 
    //otroCanvas.clear();
     otroCanvas.translate(posicionesX[i], PosY); //maneja el movimiento (de derecha a izquierda)
    
     otroCanvas.rotate(angulos[i]); //maneja la rotacion
    
     otroCanvas.imageMode(CENTER);      

     otroCanvas.image(imagenes[i], 0, 0, 80, 350);
    //pop();
     otroCanvas.pop(); //ESTO funciona (casi)
//otroCanvas.clear();
    
    if (rotacionActivada) {
      angulos[i] = radians(gradosRotacion);
    }

    if (haySonidomanchas && !MuchoSonido) {
      posicionesX[i] += 10 * direcciones[i];
//cambiar numeros
      if (posicionesX[i] >= 300 || posicionesX[i] <= 100) {
        direcciones[i] *= -1;
      }
    }
  }
  //otroCanvas.clear();
  //otroCanvas.image(imgaen, 0, 0, 80, 350);
  //barra.dibujar();
  image(otroCanvas, 0, 0); 

  amp = mic.getLevel();
  MuchoSonido = amp > AMP_MAX;
//rotaccion de angulo cambiar angulo de obj = rotacion
  if (MuchoSonido && !rotacionActivada) {
    rotacionActivada = true;
    if (gradosRotacion === 0) {
      anguloObjetivo = 70;
    } else {
      anguloObjetivo = 10;
    }
  }

  haySonidomanchas = amp > AMP_MIN;

  if (rotacionActivada) {
    if (gradosRotacion < anguloObjetivo) {
      gradosRotacion++;
    } else if (gradosRotacion > anguloObjetivo) {
      gradosRotacion--;
    } else {
      //si pones true se queda ahi no rota mas poner para que siga rotando
      rotacionActivada = false;
    }
  }

    //CONTADOR(cambio de estado)-----------//
      if (finDelSonido) {marca = millis();}
      if (!haySonido ) {let ahora = millis();
        if (ahora > marca + tiempoLimiteplumas) {estado = "reiniciar";
          marca = millis();}}
    //-------------------------------------//   

  } 
  if (estado === "reiniciar") {  
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

//---------------------------------funciones plumas-----//
function inicializarPosiciones(imagenes, posicionesX, posicionesY) {
  for (let i = 0; i < imagenes.length; i++) {
    posicionesX[i] = random(0,400);
    posicionesY[i] = random(0,400);
  }
}

function aparecerManchas(imagenes, posicionesX, posicionesY) {
  for (let i = 0; i < imagenes.length; i++) {
    image(imagenes[i], posicionesX[i], posicionesY[i]);


  }
}

//*----------------------------------Key Pressed-----------------------------------*//
/*function keyPressed() {
  if(estado == "fondo"){
    if (key === 'b') {
      for (let i = 0; i < cantidadMancha; i++) {
        let currentImage = {
          img: manchasB[i],
          x: random(width),
          y: random(height),
          width: 100, // Ajusta el tamaño de las manchas según tus necesidades
          height: 100, // Ajusta el tamaño de las manchas según tus necesidades
          rotation: 0,
          tint: color(255, 255, 255)
        };
        imagesOnScreen.push(currentImage);
      }
    }
  } else {}
}*/

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
      pitchValue = frequency;
     // console.log("frec: "+frequency);  //Para ver FREC
    }
    getPitch();
  })
}
