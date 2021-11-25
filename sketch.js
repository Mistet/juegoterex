//variavles glovales significa que puede usarse en cualquier parte del programa
var trex, trex_running, trex_collided; 
var ground, invisibleGround, groundImage;
var nube,inude;
var obstaculo,ovs1,ovs2,ovs3,ovs4,ovs5,ovs6;
var alatori;
var GameOver,imageGameOver,Reset,imageReset
var score;

var Fataliti, Jupman, Contri;

var GO, Fin, Estado;
var nubegrup, Spikgrup;
var puntos;
GO=1;
Fin=0;
puntos=0
Estado=GO;


function preload(){
  //loadAnimation se usa para simular movimieto de una imgen
  trex_running = loadAnimation("trex1.png","trex2.png","trex3.png");
  
  //loadImage se usa para una imagen sin movimiento
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  inude=loadImage("cloud.png")
  ovs1=loadImage("obstacle1.png");
  ovs2=loadImage("obstacle2.png");
  ovs3=loadImage("obstacle3.png");
  ovs4=loadImage("obstacle4.png");
  ovs5=loadImage("obstacle5.png");
  ovs6=loadImage("obstacle6.png");
  imageGameOver=loadImage("gameOver.png");
  imageReset=loadImage("restart.png");
  
  Fataliti= loadSound("die.mp3");
  Jupman= loadSound("jump.mp3");
  Countri= loadSound("checkPoint.mp3");
  
}

function setup() {

  createCanvas(600,200)
  
  //crea el sprite del Trex
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("Colision",trex_collided );
  trex.scale = 0.5;
  
  trex.debug=false
  trex.setCollider ("circle", 0, 0,40)
  
  //crea el sprite del suelo
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  //crear el esprite de reinisio y gameover
  GameOver=createSprite(300,100)
  GameOver.addImage(imageGameOver)
  Reset=createSprite(300,160,50,50)
  Reset.addImage(imageReset)
  GameOver.scale=2
  Reset.scale=0.5
    
  //crea el suelo invisible
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  //genera números al azar
  nubegrup=new Group ();
  Spikgrup=new Group ();
}

function draw() {
  //establece el color del fondo
  background("white");
  
  //se imprime un marcador
  text("Marcador: "+puntos,500,20)
  if(Estado===GO)
    {
          GameOver.visible=false
          Reset.visible=false
          ground.velocityX=-(4+3*puntos/100)
        //aumenta los puntos en el marcador
          puntos=puntos+Math.round(getFrameRate()/60)
         if (puntos>0&&puntos%100===0)
           {
           Countri.play();
           }
         if (ground.x < 0)
           {
             ground.x = ground.width/2;
           }
          //salta cuando se presiona la barra espaciadora
        if(keyDown("space")&& trex.y >= 150) 
          {
            trex.velocityY = -10;
            Jupman.play();
          }

        trex.velocityY = trex.velocityY + 0.8
        spawnnudes()
        Enemi()
      if(Spikgrup.isTouching(trex))
          {
          //trex.velocityY=-10;
          //Jupman.play();
          Estado=Fin
          Fataliti.play();
        }
    }
  if (Estado===Fin )
      {
      GameOver.visible=true
      Reset.visible=true
      ground.velocityX = 0;
      trex.changeAnimation("Colision",trex_collided)
      Spikgrup.setLifetimeEach(-1)
      nubegrup.setLifetimeEach(-1)
      Spikgrup.setVelocityXEach(0);
      nubegrup.setVelocityXEach(0);
      //funciona para detectar un clic sore una imagen
      if(mousePressedOver(Reset))
        {
          Ruffus();
        }
     }

  //evita que el Trex caiga
  trex.collide(invisibleGround);
  
  //aparece las nubes
  
  drawSprites();
}

//función para aprecer las nubes
function spawnnudes(){
 //escribe tu código aquí 
 if (frameCount%70 ===0)
   {
     nube=createSprite(550,100,10,10)
     nube.addImage(inude)
     nube.y=Math.round(random(10,60))
     nube.velocityX=-3;
     nube.lifetime=200;
     //camdiar la profundidad de las nubes
     nube.depth=trex.depth
     trex.depth=trex.depth+1;
     nubegrup.add(nube)
   }
}
function Enemi(){
if (frameCount%70 ===0)
   {
obstaculo=createSprite(550,160,10,40)
obstaculo.velocityX=-(5+puntos/100); 
alatori=Math.round(random(1,6))
switch(alatori)
{
case 1: obstaculo.addImage(ovs1)
                    break;
case 2: obstaculo.addImage(ovs2)
                    break;
case 3: obstaculo.addImage(ovs3)
                    break;
case 4: obstaculo.addImage(ovs4)
                    break;
case 5: obstaculo.addImage(ovs5)
                    break;                                   
case 6: obstaculo.addImage(ovs6)
                    break;                                    
}
obstaculo.scale=0.5
  obstaculo.lifetime=300
Spikgrup.add (obstaculo)
}
}
function Ruffus()
{
    Estado=GO
    GameOver.visible=false
    Reset.visible=false
    trex.changeAnimation("running", trex_running);
    nubegrup.destroyEach();
    Spikgrup.destroyEach();
    puntos=0
}