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
let fondo;
// colocar un falce y un true por tiempo para la rotacion timelaps o colocar si hay mucho ruido se activa la rotacion
//hasta que deje de haber sonido
let rotacionActivada = false;
let gradosRotacion = 0;
let anguloObjetivo = 190;
// cambiar mejor el sonido
let AMP_MIN = 0.1;
let AMP_MAX = 0.2;
let AMP_MED = 0.3;
let mic;
let amp;
let haySonido = false;
let MuchoSonido = false;
let PosY = 178;
let fondoPosX = 0;
let fondoPosY = 0;
//carga de imagen
function preload() {
  fondo = loadImage('Fotos/fondo.png');
  imagenes[0] = loadImage('Fotos/obj1.png');
  imagenes[1] = loadImage('Fotos/obj2.png');
  imagenes[2] = loadImage('Fotos/obj3.png');
  
  imagenesGrupo1.push(loadImage('Fotos/m1_1.png'));
  imagenesGrupo1.push(loadImage('Fotos/m1_2.png'));
  imagenesGrupo1.push(loadImage('Fotos/m1_3.png'));
  imagenesGrupo1.push(loadImage('Fotos/m1_4.png'));

  imagenesGrupo2.push(loadImage('Fotos/m2_1.png'));
  imagenesGrupo2.push(loadImage('Fotos/m2_2.png'));
  imagenesGrupo2.push(loadImage('Fotos/m2_3.png'));
  imagenesGrupo2.push(loadImage('Fotos/m2_4.png'));

  imagenesGrupo3.push(loadImage('Fotos/m3_1.png'));
  imagenesGrupo3.push(loadImage('Fotos/m3_2.png'));
  imagenesGrupo3.push(loadImage('Fotos/m3_3.png'));
  imagenesGrupo3.push(loadImage('Fotos/m3_4.png'));

  
}

function setup() {
  createCanvas(450, 450);

  fondo.resize(width, height);

  mic = new p5.AudioIn();
  mic.start();
  userStartAudio();

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

  background(fondo);
  
  fondoPosX = map(amp, 0, AMP_MIN,0, 10); 
  fondoPosY = map(amp, 0, AMP_MIN,0, 10); 

  image(fondo, fondoPosX, fondoPosY);

  

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

    if (haySonido && !MuchoSonido) {
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

  haySonido = amp > AMP_MIN;

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
}

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

