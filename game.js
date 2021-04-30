let pen;
let canvas;
let w;
let h;
let x,y;
let enemy_image,player_img,gem_img;
 
function reload_image(){
    enemy_image=new Image;
    enemy_image.src="virus.jpg";
    player_img=new Image;
    player_img.src="warrior.jpg";
    gem_img =new Image;
    gem_img.src="diamond.jpg";

}
function init(){
canvas=document.getElementById("mycanvas");

 W=700;
H=400;
canvas.width=W;
canvas.height=H;
game_over=false;
if(canvas!=null)
 pen =  canvas.getContext('2d');
 console.log(pen);
 e1={
     x :150,
     y :50,
     w :40,
     h :40,
     speed:10
 };
 e2={
    x :350,
    y :150,
    w :40,
    h :40,
    speed:10
};
e3={
    x :550,
    y :250,
    w :40,
    h :40,
    speed:10
};
enemy=[e1,e2,e3];
player={
    x :20,
    y :H/2,
    w :60,
    h :60,
    speed :15,
    moving :false,
    health:20
};
gem={
    x :W-100,
    y :H/2,
    w :40,
    h :40
};
 
canvas.addEventListener('mouseup',function(){
    console.log("key is pressed");
player.moving=true;
});
 
canvas.addEventListener('mousedown',function(){
    console.log("mouse release");
    player.moving=false;

});
var keyUp=function(e){
    player.moving=true;
}
var keyDown=function(e)
{
    player.moving=false;
}
window.addEventListener('keyup', keyUp);
window.addEventListener('keydown',keyDown);


}
function isoverlap(rect1,rect2){
    if(rect1.x<rect2.x+rect1.w && rect2.x<rect1.x+rect1.w && rect1.y<rect2.y+rect1.h &&
        rect2.y<rect1.y+rect1.h){
            return true;
        }
        return false;
    

}
function draw(){
     pen.clearRect(0,0,W,H);
     pen.fillStyle="red";
     pen.drawImage(player_img,player.x,player.y,player.w,player.h);
     pen.drawImage(gem_img,gem.x,gem.y,gem.w,gem.h);
for(let i=0;i<enemy.length;i++){
pen.drawImage(enemy_image,enemy[i].x,enemy[i].y,enemy[i].w,enemy[i].h);
}
pen.fillStyle="red";
pen.fillText=("score"+pen.health,10,10);
 
 
}

function update(){
    if(player.moving==true){
        player.x+=player.speed;
    }
    for(let i=0;i<enemy.length;i++){
        if(isoverlap(enemy[i],player)){
            player.health-=50;
            if(player.health<0){
                game_over=true;
                alert("you loss the game"+player.health);
            }
            
        }
    }
    if(isoverlap(player,gem)){
        console.log("you won");
        player.health+=100;
        alert("yo win the game");
        game_over=true;
        return;
    }
    for(let i=0;i<enemy.length;i++){
        enemy[i].y+=enemy[i].speed;
if(enemy[i].y>=H-enemy[i].h || enemy[i].y<0){
    enemy[i].speed*=-1;
}
    }
 
    
}
//init();
function gameloop(){
    if(game_over==true){
        clearInterval(f);
    }
draw();
update();
console.log("in game loop");
}
reload_image();
init();
 var f=setInterval(gameloop,100);
