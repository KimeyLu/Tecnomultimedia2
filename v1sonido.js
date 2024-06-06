let manchas
let barra
var mic

function setup() {
  createCanvas(400, 400)
  /*mic = new p5.AudioIn()*/
  /*mic.start()*/
  manchas = new Manchas()
  barra = new Barra()
}

function draw() {
  background(220)

  barra.dibujar()

  triangle(89-mouseY/6, 177-mouseY/6, 167+mouseY/8, 196-mouseY/6, 99, 311+mouseY/8)

  triangle(220-mouseY/6, 169-mouseY/6, 333, 178-mouseY/6, 215, 331+mouseY/6)

}

function mouseClicked(){
  manchas.dibujar()
} 
