let monitorear = false;

//ml5
let mic;
let pitch;
let audioContext;

//gestor
let gestorAmp;
let gestorPitch;
let umbral_sonido = 0.1;
//------------FREC Y AMP (Calibrable)----------------
let FREC_MIN = 49;
let FREC_MAX = 250;
let AMP_MIN = 0.0000001;
let AMP_MAX = 0.06;
//---------------------------------------------------
//eventos
let haySonido;
let antesHabiaSonido;
//barra
let pitchValue = 0
let tamañoMaxRec = 500;

//estados
let estado = "fondo";
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
//fondo
let tamañoImagen = 300; // Tamaño deseado para las imágenes en píxeles

let imgIzquierda;
let imgDerecha;

// Posiciones de las imágenes en las esquinas
let posXIzquierdaSuperior, posYIzquierdaSuperior;
let posXDerechaSuperior, posYDerechaSuperior;
let posXIzquierdaInferior, posYIzquierdaInferior;
let posXDerechaInferior, posYDerechaInferior;

// Estados para mostrar las imágenes en las esquinas
let mostrarIzquierdaSuperior = false;
let mostrarDerechaSuperior = false;
let mostrarIzquierdaInferior = false;
let mostrarDerechaInferior = false;

function preload() {
  imgIzquierda = loadImage('data/M0.png');
  imgDerecha = loadImage('data/M1.png');
}

function setup() {
  windowsX = random(600, 700);
  windowsY = random(400, 500);
  createCanvas(windowsX, windowsY);

  //clases
  plumas = new Plumas();
  //audio
  audioContext = getAudioContext();
  mic = new p5.AudioIn();
  mic.start(startPitch);  
  userStartAudio();
  
  gestorAmp = new GestorSenial(AMP_MIN, AMP_MAX);
  gestorPitch = new GestorSenial(FREC_MIN, FREC_MAX);  
  antesHabiaSonido = false;
  // Tamaño inicial de las imágenes
  imgIzquierda.resize(tamañoImagen, 0); // El segundo argumento 0 mantiene la proporción original
  imgDerecha.resize(tamañoImagen, 0);

  // Inicializa las posiciones de las imágenes en las esquinas
  posXIzquierdaSuperior = width - tamañoImagen;
  posYIzquierdaSuperior = 0;
  posXDerechaSuperior = 0;
  posYDerechaSuperior = 0;
  posXIzquierdaInferior = 0;
  posYIzquierdaInferior = height - tamañoImagen;
  posXDerechaInferior = width - tamañoImagen;
  posYDerechaInferior = height - tamañoImagen;
}


function startPitch() {
  // Inicializa el modelo de detección de tono
  pitch = ml5.pitchDetection(pitchModelUrl, audioContext, mic.stream, modelLoaded);
}

function modelLoaded() {
  console.log('Model Loaded!');
  getPitch();
}

function getPitch() {
  pitch.getPitch(function(err, frequency) {
    if (frequency) {
      pitchValue = frequency; // Asignación de pitchValue cuando se obtiene el valor de frecuencia
      gestorPitch.actualizar(frequency); // Ejemplo de uso de pitchValue
    }
    getPitch();
  });
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
  console.log(pitchValue); 

  
  //**************ESTADOS****************
  if (estado === "fondo") {
    
    //text("ESTAMOS EN EL ESTADO: "+estado,10, 20);
    
  if (mic) {
    ampCruda = mic.getLevel(); // Obtener el nivel de amplitud crudo del micrófono
    gestorAmp.actualizar(ampCruda); // Actualizar el gestor con la amplitud cruda
    amp = gestorAmp.filtrada; // Obtener la amplitud filtrada
  }
  
  // Determinar si hay sonido
  let haySonido = amp > umbral_sonido;

  // Cambiar el estado de la imagen según la detección de sonido
  if (haySonido && !antesHabiaSonido) {
    // Alternar el estado de mostrar las imágenes
    if (!mostrarDerechaSuperior && !mostrarIzquierdaSuperior && !mostrarIzquierdaInferior && !mostrarDerechaInferior) {
      mostrarDerechaSuperior = true;
    } else if (mostrarDerechaSuperior && !mostrarIzquierdaSuperior) {
      mostrarIzquierdaSuperior = true;
    } else if (mostrarIzquierdaSuperior && !mostrarIzquierdaInferior) {
      mostrarIzquierdaInferior = true;
    } else if (mostrarIzquierdaInferior && !mostrarDerechaInferior) {
      mostrarDerechaInferior = true;
    }
  }

  // Mostrar las imágenes en las esquinas si el estado correspondiente está activo
  if (mostrarIzquierdaSuperior) {
    image(imgIzquierda, posXIzquierdaSuperior, posYIzquierdaSuperior);
  }
  if (mostrarDerechaSuperior) {
    image(imgDerecha, posXDerechaSuperior, posYDerechaSuperior);
  }
  if (mostrarIzquierdaInferior) {
    image(imgIzquierda, posXIzquierdaInferior, posYIzquierdaInferior);
  }
  if (mostrarDerechaInferior) {
    image(imgDerecha, posXDerechaInferior, posYDerechaInferior);
  }

  // Actualizar el estado anterior de detección de sonido
  antesHabiaSonido = haySonido;
    
    //CONTADOR(cambio de estado)-----------//
      if (finDelSonido) {marca = millis();}
      if (!haySonido ) {let ahora = millis();
        if (ahora > marca + tiempoLimitefondo) {estado = "barra";
          marca = millis();}}
    //-------------------------------------//
  } else if (estado === "barra") {
    ampCruda = mic.getLevel(); // Obtener el nivel de amplitud crudo del micrófono
    gestorAmp.actualizar(ampCruda); // Actualizar el gestor con la amplitud cruda
    amp = gestorAmp.filtrada; // Obtener la amplitud filtrada
  
    // Asegurarse de que la barra negra siempre esté al menos un 70% llena
    let tamañoMinimoBarra = 0.6 * tamañoMaxRec;
    let tamañoBarra = map(amp, 0, 1, tamañoMinimoBarra, tamañoMaxRec); // Mapear la amplitud filtrada al tamaño de la barra
    tamañoBarra = min(tamañoBarra, tamañoMaxRec); // Limitar el tamaño de la barra dinámica al tamaño máximo de la barra estática
  
    // Definir rangos de pitch para graves y agudos
    let pitchGravesMin = 50;
    let pitchGravesMax = 200;
    let pitchAgudosMin = 201;
    let pitchAgudosMax = 500;
  
    // Determinar el color de la barra estática según pitchValue
    let colorBarraEstatica;
    if (pitchValue >= pitchGravesMin && pitchValue <= pitchGravesMax) {
      // Color para graves (rojo a amarillo)
      colorBarraEstatica = lerpColor(color(255, 0, 0), color(255, 255, 0), map(pitchValue, pitchGravesMin, pitchGravesMax, 0, 1));
    } else if (pitchValue >= pitchAgudosMin && pitchValue <= pitchAgudosMax) {
      // Color para agudos (amarillo a blanco)
      colorBarraEstatica = lerpColor(color(255, 255, 0), color(255), map(pitchValue, pitchAgudosMin, pitchAgudosMax, 0, 1));
    } else {
      // Color por defecto si no está en ningún rango (rojo)
      colorBarraEstatica = color(255, 0, 0);
    }
  
    // Dibujar la barra estática detrás
    push();
    fill(colorBarraEstatica); // Color de la barra estática según pitch
    rect(50, height/2 - 25, tamañoMaxRec, 50); // Dibujar la barra estática
    pop();
  
    // Dibujar la barra dinámica delante (negra)
    push();
    fill(0, 0, 0); // Color de la barra dinámica (negro)
    rect(50, height/2 - 25, tamañoBarra, 50); // Dibujar la barra dinámica
    pop();
  
    text("ESTAMOS EN EL ESTADO: "+estado,10, 20);
  
    //CONTADOR(cambio de estado)-----------//
    if (finDelSonido) {marca = millis();}
    if (!haySonido ) {
      let ahora = millis();
      if (ahora > marca + tiempoLimitebarra) {
        estado = "plumas";
        marca = millis();
    
  }
}
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
  } 
  if (estado === "reiniciar") { 
    text("ESTAMOS EN EL ESTADO: "+estado, 10, 20);
    if (!haySonido) { // Verifica si no hay sonido para volver a "fondo"
      estado = "fondo";
      antesHabiaSonido = false;
    mostrarIzquierdaSuperior = false;
    mostrarDerechaSuperior = false;
    mostrarIzquierdaInferior = false;
    mostrarDerechaInferior = false;
    }
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
