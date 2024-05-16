let x = 1;


function setup() {
  createCanvas(400, 400)
}

function draw() {
  background(220)

  //quiero hacer que mientras el mouseY este mas cerca del 0 la
  //barra aumente, pero que lo haga a la par.


  if(mouseY< height){
    push()
    fill(0,0,0)
   rect(10, height/2, mouseY, 20)}else{
     rect (10, height/2, 380, 20)
     pop()
   }

  if(mouseX <200){
    push()
    fill(255,255,255)
  } else if (mouseX >200) {
    fill(mouseX-200,0,0)
  }

  triangle(89-mouseY/6, 177-mouseY/6, 167+mouseY/8, 196-mouseY/6, 99, 311+mouseY/8)

  triangle(220-mouseY/6, 169-mouseY/6, 333, 178-mouseY/6, 215, 331+mouseY/6)
  pop()


}
  function mouseClicked(){

ellipse(random(10,300),random(10,300),30,30);
  } //no funciona :(