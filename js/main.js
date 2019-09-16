var canvas = null;
var context = null;
var objCycleAnimation = null;

var sprites = null;
var level = null;
var hero = null;
var guards = [];
var controller = null;
var intNbBot = 0;
var intColor = 6;
var intDiff =3;
var audioGameOver = new Audio("sound/self/gameover.mp3")
var tabSpawnable = null;
var binPaused = false;
const intSize = 16;

window.onload = function initPage(){
    canvas = document.getElementById('screen');
    context = canvas.getContext('2d');



    context.fillRect(0,0,640,480);

    //definir les types de block
    loadImage('img/tiles.png').then(image => {
        loadImage('img/mountain.jpg').then(background => {
            sprites = new SpriteSheet(image,intSize,intSize);
            sprites.define('ground',0,intColor);
            this.sprites.define('obsidian',1,intColor);
            sprites.define('ladder',0,0);
            sprites.define('ramp',2,0);
            sprites.define('gold',3,0);
            sprites.define('noir',9,0);

            sprites.define('break1',6,intColor);
            sprites.define('break2',7,intColor);
            sprites.define('break3',8,intColor);
            sprites.define('break4',9,intColor);

            //Creer le score
            score = new Score();
            score.initScore();

            //creer le character
            hero = new Hero(13*16,13*16,context, score);
            hero.drawInit(hero.heroAnim);

            //creer le level
            level = new Level(context,sprites,background,hero);
            level.drawMap();
            tabSpawnable = level.getSpawnable();

            //creer le controller
            controller = new Controller(hero, level);

            score.partirChrono();

            spawnGuard();

            animer();
        });
    });
};
function togglePause()
{
    if (!binPaused)
    {
        if(!hero.IsDead&& !hero.won){

            pause();
        }
        binPaused = true;
    } else if (binPaused)
    {
        binPaused= false;
    }

}

function pause(){
    context.save();
    context.beginPath();
    context.globalAlpha=0.72;
    context.fillStyle = 'grey';
    context.rect(0,0,canvas.width-200,canvas.height);
    context.fill();
    context.restore();

    context.beginPath();
    context.globalAlpha=1;
    context.fillStyle = 'black';
    context.rect(canvas.width/2.65,canvas.height/2-60,40,120);
    context.rect(canvas.width/3.35,canvas.height/2-60,40,120);
    context.fill();
    context.restore();
}
function animer() {
    // Requête pour le prochain cycle
    objCycleAnimation = requestAnimationFrame(animer);
    if(!binPaused){
        // Le cycle d'animation
        level.clear();
        level.drawMap();


        hero.upDatePos(hero.heroAnim);
        hero.updateAnimHero(hero.heroAnim);
        hero.checkState();

        //pos du hero
        var end = level.getGraph().grid[hero.getYBlock()][hero.getXBlock()];


        guards.forEach(function(guard){
            guard.upDatePos(guard.guardAnim);
            guard.updateAnimGuard(guard.guardAnim);
            var start  = level.getGraph().grid[guard.getYBlock()][guard.getXBlock()];
            var result = astar.search(level.getGraph(), start, end);
            guard.setPath(result[1]);

        });


        score.drawScore(hero);

        score.miseAJourTimer();

        //Level Complete?
        hero.won ? level.spawnEchelle() : "";
    }
}
function arreterAnimation() {
    if (objCycleAnimation != null)
        cancelAnimationFrame(objCycleAnimation);
    objCycleAnimation = null;
}
function addGuard(xPos,yPos){
    intNbBot++;
    guard = new Guard(xPos*16,yPos*16,context, intNbBot);
    guards.push(guard);
}
function respawnGuard(guard){
	var intIndex2 = Math.floor(Math.random()*(1+tabSpawnable.length));
	var tabCord2 = tabSpawnable[intIndex2];

    guard.respawn(tabCord2[1],tabCord2[0]);

	setTimeout(function () {
		guard.state = 'walkRight';
		guard.binStuck = false;
		guard.binRespawn = false;
	},2000);
}
function loadImage(url) {
    return new Promise(resolve => {
        var image = new Image();
        image.addEventListener('load', () => {
            resolve(image);
        });
        image.src = url;
    });
}


function youWon(){
    context.font = "25px Comic Sans MS";
    context.fillStyle = "red";
    context.textAlign = "center";
    context.fillText("NIVEAU: " + (intDiff-2).toString() + " PASSÉ", (canvas.width-200)/2, canvas.height/2);
    context.font = "25px Comic Sans MS";
    context.fillText("'P' Pour Commencer Le Niveau", (canvas.width-200)/2, canvas.height/2 + 30);
    intDiff <= 14 ? intDiff++ : "";
    togglePause();
    
}

function gameOver(){
    audioGameOver.play();
    context.font = "50 Comic Sans MS";
    context.fillStyle = "black bold";
    context.textAlign = "center";
    context.fillText("GAME OVER", (canvas.width- 200)/2, canvas.height/2);
    arreterAnimation();
}


function resetGame(){


    //Personnage
    hero.resetHero(13*16,13*16);
    guards = [];
    intNbBot = 0;
    spawnGuard();
    hero.intGold=0;
    hero.won = false;
    level.tabLevel = [
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [1,1,1,1,1,1,1,2,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,2,3,3,3,3,3,3,3,3,3,3,0,0,0,0,0,4,0,0,0,0],
        [0,0,0,0,0,0,0,2,0,0,0,0,1,1,2,0,0,0,1,1,1,1,1,1,1,2,1,1],
        [0,0,0,0,0,0,0,2,0,0,0,0,1,1,2,0,0,0,0,0,0,0,0,0,0,2,0,0],
        [0,0,0,0,0,0,0,2,0,0,0,0,1,1,2,0,0,0,0,0,0,0,4,0,0,2,0,0],
        [1,1,2,1,1,1,1,1,0,0,0,0,1,1,1,1,1,1,1,1,2,1,1,1,1,1,1,1],
        [0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0],
        [0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0],
        [1,1,1,1,1,1,1,1,1,2,1,1,1,1,1,1,1,1,1,1,2,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,4,0,2,3,3,3,3,3,3,3,3,3,3,2,0,0,0,4,0,0,0],
        [0,0,0,0,2,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,2],
        [0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
        [0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,2],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9]
    ];

    
}

function spawnGuard(){
    var tabIndex = new Array();
    for(var i=1; i<=intDiff; i++){
        var intI;
        do{
            intI = randomIndex();
        }
        while(checkDuplicate(tabIndex,intI))

        tabIndex.push(intI);
	    var tabCord = tabSpawnable[intI];
	    addGuard(tabCord[1],tabCord[0]);
    }
}
function checkDuplicate(tabIndex,intI){
    varBinDuplicate = false;
    tabIndex.forEach(function (value) {
        if(value == intI)
            varBinDuplicate =  true;
    })
    return varBinDuplicate;
}
function randomIndex() {
    var intIndex = Math.floor(Math.random()*(1+tabSpawnable.length));
    return intIndex;
}
function changeVolume(){
    fltVolume = document.getElementById('volume').value;
    console.log(fltVolume)

    hero.changeVolume(fltVolume);
    level.changeVolume(fltVolume);
    guards.forEach(function(guard){
        guard.changeVolume(fltVolume);
    });
    document.getElementById('volume').blur();
    document.getElementById('screen').focus();
}


