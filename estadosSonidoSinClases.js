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
let tiempoLimitefondo = 5000; //3secs (despues de hacer ruido)
let tiempoLimitebarra = 10000; //3secs (despues de hacer ruido o si no hago ruido)
let tiempoLimiteplumas = 10000; //3secs (despues de hacer ruido o si no hago ruido)
let tiempoLimitereiniciar = 5000; //5secs (despues de hacer ruido o si no hago ruido)

const model_url = 'https://cdn.jsdelivr.net/gh/ml5js/ml5-data-and-models/models/pitch-detection/crepe/';
//canvas tamaños random
let windowsX;
let windowsY;

//---VARIABLES DE LAS MANCHAS---------------------------------------------------------------------//
let img;
let manchasB = [];
let imagesOnScreen = [];
let cantidadMancha = 4; // Número de imágenes de manchas
//---VARIABLES DE LA BARRA---------------------------------------------------------------------//
let barra;
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

function preload() {
  img = loadImage('data/fondo.png');
  for (let i = 0; i < cantidadMancha; i++) {
    let nombre = "data/mancha" + nf(i, 2) + ".png";
    manchasB[i] = loadImage(nombre);
  }
  
  //--Manchas--/
  //fondo = loadImage("data/fondo_tecno.png");
  imagenes[0] = loadImage("data/obj1.png");
  imagenes[1] = loadImage("data/obj2.png");
  imagenes[2] = loadImage("data/obj3.png");
  
  /*imagenesGrupo1.push(loadImage('data/m1_1.png'));
  imagenesGrupo1.push(loadImage('data/m1_2.png'));
  imagenesGrupo1.push(loadImage('data/m1_3.png'));
  imagenesGrupo1.push(loadImage('data/m1_4.png'));

  imagenesGrupo2.push(loadImage('data/m2_1.png'));
  imagenesGrupo2.push(loadImage('data/m2_2.png'));
  imagenesGrupo2.push(loadImage('data/m2_3.png'));
  imagenesGrupo2.push(loadImage('data/m2_4.png'));

  imagenesGrupo3.push(loadImage('data/m3_1.png'));
  imagenesGrupo3.push(loadImage('data/m3_2.png'));
  imagenesGrupo3.push(loadImage('data/m3_3.png'));
  imagenesGrupo3.push(loadImage('data/m3_4.png'));*/

  
}

function setup() {
  windowsX = random(600, 700);
  windowsY = random(400, 500);
  createCanvas(windowsX, windowsY);
  //background(207,193,166);
  
  barra = new Barra();
  
  audioContext = getAudioContext();
  mic = new p5.AudioIn();
  mic.start(startPitch);  
  userStartAudio();
  
  gestorAmp = new GestorSenial(AMP_MIN, AMP_MAX);
  gestorPitch = new GestorSenial(FREC_MIN, FREC_MAX);  
  antesHabiaSonido = false;
  
  //--Manchas--//
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
}


function draw() {
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
    //
    text("ESTAMOS EN EL ESTADO: "+estado,10, 20);
    //
    
              // Dibuja la imagen de fondo
            //background(200); // Fondo gris claro
            image(img, 0, 0, width, height);
          
          
            //*** Dibujar las imágenes de manchas
            for (let i = 0; i < imagesOnScreen.length; i++) {
              let currentImage = imagesOnScreen[i];
          
              push();
              translate(currentImage.x, currentImage.y); // Mover el origen al punto donde quieres dibujar la imagen
              rotate(currentImage.rotation); // Aplicar la rotación
              tint(currentImage.tint); // Aplicar el tinte
              imageMode(CENTER); // Dibujar la imagen desde su centro
              image(currentImage.img, 0, 0, currentImage.width, currentImage.height); // Dibujar la imagen
              pop();
            }

    
    //CONTADOR(cambio de estado)-----------//
      if (finDelSonido) {marca = millis();}
      if (!haySonido ) {let ahora = millis();
        if (ahora > marca + tiempoLimitefondo) {estado = "barra";
          marca = millis();}}
    //-------------------------------------//
  } else if (estado === "barra") {
    //
    text("ESTAMOS EN EL ESTADO:  "+estado,10, 20);
    //
    
    barra.dibujar();

    //CONTADOR(cambio de estado)-----------//
      if (finDelSonido) {marca = millis();}
      if (!haySonido ) {let ahora = millis();
        if (ahora > marca + tiempoLimitebarra) {estado = "plumas";
          marca = millis();}}
    //-------------------------------------//
  }else if (estado === "plumas") {
    //
    text("ESTAMOS EN EL ESTADO: "+estado,10, 20);
    //
    
    //---Manchas---//
     for (let i = 0; i < imagenes.length; i++) {
    push();
    translate(posicionesX[i], PosY);
    rotate(angulos[i]);

    imageMode(CENTER);
    image(imagenes[i], 0, 0, 80, 350);

    pop();

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
  if (amp > AMP_MIN && amp <= AMP_MAX) {
    aparecerManchas(imagenesGrupo1, posicionesXGrupo1, posicionesYGrupo1);
  } else if (amp >AMP_MIN && amp <= AMP_MAX) {
    aparecerManchas(imagenesGrupo2, posicionesXGrupo2, posicionesYGrupo2);
  } else if (amp > AMP_MAX) {
    aparecerManchas(imagenesGrupo3, posicionesXGrupo3, posicionesYGrupo3);
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
function keyPressed() {
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
