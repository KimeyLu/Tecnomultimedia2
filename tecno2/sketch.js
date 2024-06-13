let img;
let manchasB = [];
let imagesOnScreen = [];
let cantidadMancha = 4; // Número de imágenes de manchas

function preload() {
  img = loadImage('data/fondo.png');
  for (let i = 0; i < cantidadMancha; i++) {
    let nombre = "data/mancha" + nf(i, 2) + ".png";
    manchasB[i] = loadImage(nombre);
  }
}

function setup() {
  createCanvas(700, 500);
}

function draw() {
  // Dibuja la imagen de fondo
  background(200); // Fondo gris claro
  image(img, 0, 0, width, height);

  // Dibujar las imágenes de manchas
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
}

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
