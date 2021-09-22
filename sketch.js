var path,mainCyclist;
var player1,player2,player3;
var pathImg,mainRacerImg1,mainRacerImg2;

var oppPink1Img,oppPink2Img;
var oppYellow1Img,oppYellow2Img;
var oppRed1Img,oppRed2Img;
var gameOverImg,cycleBell;

var pinkCG, yellowCG,redCG; 

var END =0;
var PLAY =1;
var gameState = PLAY;

var distance=0;
var gameOver, restart;

function preload(){
  
  //Carga todas las imagenes y sonidos
  
  pathImg = loadImage("images/Road.png");
  mainRacerImg1 = loadAnimation("images/mainPlayer1.png","images/mainPlayer2.png");
  mainRacerImg2= loadAnimation("images/mainPlayer3.png");
  
  oppPink1Img = loadAnimation("images/opponent1.png","images/opponent2.png");
  oppPink2Img = loadAnimation("images/opponent3.png");
  
  oppYellow1Img = loadAnimation("images/opponent4.png","images/opponent5.png");
  oppYellow2Img = loadAnimation("images/opponent6.png");
  
  oppRed1Img = loadAnimation("images/opponent7.png","images/opponent8.png");
  oppRed2Img = loadAnimation("images/opponent9.png");
  
  cycleBell = loadSound("sound/bell.mp3");
  gameOverImg = loadImage("images/gameOver.png");
}

function setup(){
  
createCanvas(1200,300);
// Fondo en movimiento
path=createSprite(100,150);
path.addImage(pathImg);
path.velocityX = -5;

//Crea el niño que corre
mainCyclist  = createSprite(70,150);
mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
mainCyclist.scale=0.07;
  
//Establece el colisionador para el mainCyclist
mainCyclist.setCollider("rectangle",0,0,40,40);
  
  
//Crea el sprite para el Game Over  
gameOver = createSprite(600,150);
gameOver.addImage(gameOverImg);
gameOver.scale = 0.8;
gameOver.visible = false; 
  
//Crea los grupos para los ciclistas  
pinkCG = new Group();
yellowCG = new Group();
redCG = new Group();
  
}

function draw() {
  
  //Establece un fondo
  background(0);
  
  //Dibuja los sprites
  drawSprites();
  
  //Despliega en pantalla la distancia recorrida
  textSize(20);
  fill(255);
  text("Distancia: "+ distance,1050,30);
  
  
  //Dentro de este IF declaramos todo lo que pasa cuando el estatus del juego es PLAY
  if(gameState===PLAY){
    
    
    //Definimos las condiciones para que aumente el marcador
   distance = distance + Math.round(getFrameRate()/50);
    
    //Definimos la velocidad del path (simulación de movimiento)
   path.velocityX = -(6 + 2*distance/150);
    
    
  //Definimos el movimiento del ciclista con el mouse
   mainCyclist.y = World.mouseY;
  
   //Creamos los bordes y le decimos que le ciclista colisione con ellos 
   edges= createEdgeSprites();
   mainCyclist .collide(edges);
  
  //Código para reiniciar el fondo
  if(path.x < 0 ){
    path.x = width/2;
  }
  
    //Código para reproducir el sonido de la campana del ciclista
  if(keyDown("space")) {
    cycleBell.play();
  }
  
  //Crear jugadores oponentes de forma continua
  var select_oppPlayer = Math.round(random(1,3));
  
  if (World.frameCount % 150 == 0) {
    if (select_oppPlayer == 1) {
      pinkCyclists();
    } else if (select_oppPlayer == 2) {
      yellowCyclists();
    } else {
      redCyclists();
    }
  }
    
    //Definimos las condiciones cuando el ciclista principal toca a alguno de los otros ciclistas 
  
   if(pinkCG.isTouching(mainCyclist)){
     gameState = END;
     player1.velocityY = 0;
     player1.addAnimation("opponentPlayer1",oppPink2Img);
    }
    
    if(yellowCG.isTouching(mainCyclist)){
      gameState = END;
      player2.velocityY = 0;
      player2.addAnimation("opponentPlayer2",oppYellow2Img);
    }
    
    if(redCG.isTouching(mainCyclist)){
      gameState = END;
      player3.velocityY = 0;
      player3.addAnimation("opponentPlayer3",oppRed2Img);
    }
 //Declaramos lo que sucede cuando el estatus del juego es END   
}else if (gameState === END) {
  
  //Mostramos el Game Over
    gameOver.visible = true;
  //Mostramos la instrucción para reiniciar el juego
    textSize(20);
    fill(255);
    text("¡Presiona la tecla de Flecha hacia Arriba para reiniciar el juego!", 320,200);
  
  //Quitamos velocidad para dejar de simular movimiento
    path.velocityX = 0;
    mainCyclist.velocityY = 0;
  //Definimos animacion, quitamos velocidad y destruimos cuando el ciclista colisiona
  mainCyclist.addAnimation("SahilRunning",mainRacerImg2);
  
    pinkCG.setVelocityXEach(0);
    pinkCG.setLifetimeEach(-1);
  
    yellowCG.setVelocityXEach(0);
    yellowCG.setLifetimeEach(-1);
  
    redCG.setVelocityXEach(0);
    redCG.setLifetimeEach(-1);
  
//Llamamos a la funcion reset     
    if(keyDown("UP_ARROW")) {
      reset();
    }
}
}

function pinkCyclists(){
  //Define las funciones para crear ciclistas, su velocidad y sus animaciones
        player1 =createSprite(1100,Math.round(random(50, 250)));
        player1.scale =0.06;
        player1.velocityX = -(6 + 2*distance/150);
        player1.addAnimation("opponentPlayer1",oppPink1Img);
        player1.setLifetime=170;
        pinkCG.add(player1);
}

function yellowCyclists(){
  //Define las funciones para crear ciclistas, su velocidad y sus animaciones  
        player2 =createSprite(1100,Math.round(random(50, 250)));
        player2.scale =0.06;
        player2.velocityX = -(6 + 2*distance/150);
        player2.addAnimation("opponentPlayer2",oppYellow1Img);
        player2.setLifetime=170;
        yellowCG.add(player2);
}

function redCyclists(){
    //Define las funciones para crear ciclistas, su velocidad y sus animaciones
        player3 =createSprite(1100,Math.round(random(50, 250)));
        player3.scale =0.06;
        player3.velocityX = -(6 + 2*distance/150);
        player3.addAnimation("opponentPlayer3",oppRed1Img);
        player3.setLifetime=170;
        redCG.add(player3);
}

function reset(){
  //Define lo que va a suceder al llamar a la función RESET
  gameState = PLAY;
  gameOver.visible = false;
  mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
  
  pinkCG.destroyEach();
  yellowCG.destroyEach();
  redCG.destroyEach();
  
  distance = 0;
}