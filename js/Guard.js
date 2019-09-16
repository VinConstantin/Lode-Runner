class Guard extends Character {
    constructor(x, y, context, intNbBot) {
        super(x, y, context);
        this.intVitesse = 1;
        this.intGravite = 1;
        this.binEchelleTrouve = false;
        this.binBot = true;
        this.intBot = intNbBot;
        this.guardAnim = new Animation(this);
        this.binGrabGold = true;
        this.guardAnim.binMoving = false;
        this.binStuck = false;
        this.upDatePos(this.guardAnim);
        this.path = null;
	    this.intFrames = 0;
        this.binRespawn = false;
        this.audioTrou = new Audio("sound/self/gardeTrou.mp3");
        this.audioGuardDie = new Audio("sound/self/gardeDie.mp3")
    }

    updateAnimGuard() {
        if (this.yTemp != this.y || this.xTemp != this.x)
            this.guardAnim.binMoving = true;
        else
            this.guardAnim.binMoving = false;
        if(!this.binRespawn){
            if (this.binFalling) {
                this.guardAnim.state = ('fall');
            } else if (this.binMoveRight || this.binMoveLeft) {
                if (this.onRamp()) {
                    if (this.binMoveRight)
                        this.guardAnim.state = ('rampRight');
                    else
                        this.guardAnim.state = ('rampLeft');
                }
                else if (this.onLadder())
                    this.guardAnim.state = ('ladder');
                else if (this.binMoveRight)
                    this.guardAnim.state = ('walkRight');
                else
                    this.guardAnim.state = ('walkLeft');
            } else if (this.onLadder()) {
                this.guardAnim.state = ('ladder');
            }
        }
        this.guardAnim.updateFrame();
        this.yTemp = this.y;
        this.xTemp = this.x;


    }

    setPath(path) {
        this.path = path;
    }

    upDatePos(anim) {
        //voir si il y a un bloc en dessous, si oui, il tombe
        if (!this.binFalling) {
            if (this.binMoveLeft) {
                if (this.checkMoveGauche()) {
                    if (this.onRamp()) {
                        this.stickRamp();
                    }
                    this.x -= this.intVitesse;
                }
            }

            else if (this.binMoveRight) {
                if (this.checkMoveDroit()) {
                    if (this.onRamp()) {
                        this.stickRamp();
                    }
                    this.x += this.intVitesse;
                }

            }
            if (this.binMoveUp) {
                //next level
                if (this.checkMoveHaut()) {
                    this.y -= this.intVitesse;
                    this.stickLadder();
                }
            }
            else if (this.binMoveDown) {
                if (this.checkMoveBas()) {
                    if (this.onRamp()) {

                    }
                    this.y += this.intVitesse;
                    this.stickLadder();
                }
            }
        }
        this.xBlock = Math.round(this.x / 16);
        this.xBlockGauche = Math.ceil(this.x / 16);
        this.xBlockDroit = Math.floor(this.x / 16);

        this.yBlockHaut = Math.ceil(this.y / 16);
        this.yBlockBas = Math.floor(this.y / 16);
        this.yBlock = Math.floor(this.y / 16);

        this.intGauche = this.x;
        this.intDroit = this.x + 16;
        this.falling();
        this.stuckBrokenBlock();
        if(!this.binStuck && !this.binRespawn)
            this.pathFinding();
        else
            this.moveGuard(false,false,false,false);
        this.killHero();
        this.gatherGold();
        this.dropGold();
		this.dead();
        anim.draw(this.x, this.y, this.context);
        if(this.intGold==1){
        	context.save();
        	context.beginPath();
        	context.arc(this.x+4,this.y+4,2,0,2*Math.PI);
        	context.fillStyle = '#ffe92f';
	        context.fill();
	        context.restore();
        }

    }

    gatherGold() {
        if (level.tabLevel[this.yBlock][this.xBlock] == 4 && this.intGold < 1 && this.binGrabGold) {
            this.intGold++;
            level.tabLevel[this.yBlock][this.xBlock] = 0
        }
    }

    dropGold() {
        if (this.intGold == 1 && !this.binFalling && !this.onRamp() && !this.onLadder()) {
            var d = Math.random();
            //1% de chance a chaque game tic de drop le gold
            if (d < 0.003) {
                this.binGrabGold = false;
                console.log('dropGold')
	            level.tabLevel[this.yBlock][this.xBlock] = 4;
                this.intGold = 0;
                setTimeout(function () {
                    this.binGrabGold = true;
                }, 500);
            }
        }
    }

    stuckBrokenBlock() {
        if (level.tabLevel[this.yBlock][this.xBlock] == -1) {
            this.binFalling = false;
            level.tabLevel[this.yBlock][this.xBlock] = -2;
            if (this.intGold == 1) {
                level.tabLevel[this.yBlock - 1][this.xBlock] = 4;
                this.intGold = 0;
            }
            level.upOneBlock(this);
            this.binStuck = true;
            this.audioTrou.play();
            hero.score.addScore(75);
        }
    }
    dead(){
		if((level.tabLevel[this.yBlock][this.xBlock]==1)){
			this.guardAnim.state = 'respawn';
			this.binStuck = true;
			this.binRespawn = true;
			respawnGuard(this);
            this.audioGuardDie.play();
            hero.score.addScore(75);
		}
	}
	respawn(x,y){
    	this.x = x*16;
    	this.y = y*16;
	}

    setBinStuck(bin) {
        this.binStuck = bin;
    }

    falling() {
        if (level.tabLevel[this.yBlockBas + 1][this.xBlockDroit] == 1 || level.tabLevel[this.yBlockBas + 1][this.xBlockGauche] == 1 || level.tabLevel[this.yBlockBas + 1][this.xBlockDroit] == 9 || level.tabLevel[this.yBlockBas + 1][this.xBlockGauche] == 9) {
            this.binFalling = false;
        }
        else if ((this.onRamp() || this.onLadder()) && level.tabLevel[this.yBlockBas + 1][this.xBlock] != 3) {
            this.binFalling = false;
        }
        else if (level.tabLevel[this.yBlock + 1][this.xBlock] == -2 || level.tabLevel[this.yBlock][this.xBlock] == -1 || level.tabLevel[this.yBlock][this.xBlock] == -2) {
            this.binFalling = false;
            console.log('in')
        }
        else {
            this.y += this.intGravite;
            this.binFalling = true;
        }

    }

    //up down right left
    moveGuard(binUp, binDown, binRight, binLeft) {
        this.binMoveUp = binUp;
        this.binMoveDown = binDown;
        this.binMoveRight = binRight;
        this.binMoveLeft = binLeft;
    }
    killHero() {
        if(this.yBlock == hero.yBlock && this.xBlock == hero.xBlock){
            hero.IsDead = true;
            if(hero.life > 1){
                context.font = "50px Comic Sans MS";
                context.fillStyle = "red";
                context.textAlign = "center";
                context.fillText("Vous Êtes Mort", (canvas.width-200)/2, canvas.height/2);
                context.font = "25px Comic Sans MS";
                context.fillText("'P' Pour Continuer Le Niveau", (canvas.width-200)/2, canvas.height/2 + 30);
                togglePause();
            }
            hero.life > 1 ? hero.life-- : gameOver();
            hero.heroAnim.state=('dead');
            hero.audioDead.play();
            hero.score.partirChrono();
            hero.score.addScore(-hero.score.score);
            resetGame();



        }
    }

    pathFinding() {
        if (this.path != null) {
            if (this.xBlockDroit < this.path.y) {
                if (this.yBlockHaut > this.path.x) {
                    this.moveGuard(true, false, true, false);
                }
                else if (this.yBlockHaut < this.path.x) {
                    this.moveGuard(false, true, true, false);
                }
                else {
                    this.moveGuard(false, false, true, false);
                }
            }
            else if (this.xBlockGauche > this.path.y) {
                if (this.yBlockHaut > this.path.x) {
                    this.moveGuard(true, false, false, true);
                }
                else if (this.yBlockHaut < this.path.x) {
                    this.moveGuard(false, true, false, true);
                }
                else {
                    this.moveGuard(false, false, false, true);
                }
            }
            else {
                if (this.yBlockHaut > this.path.x) {
                    this.moveGuard(true, false, false, false);
                }
                else if (this.yBlockBas+1 < this.path.x) {
                    this.moveGuard(false, true, false, false);
                }
                else {
                    if(this.x<hero.x) {
                        if (this.y < hero.y)
                            this.moveGuard(true, true, true, false);
                        else
                            this.moveGuard(true, false, true, false);
                    }
                    else {
                        if (this.y < hero.y)
                            this.moveGuard(true, true, false, true);
                        else
                            this.moveGuard(true, false, false, true);
                    }
                }
            }
        }
        else{
            if(this.x<hero.x) {
                if (this.y < hero.y)
                    this.moveGuard(false, true, true, false);
                else if(this.y > hero.y)
                    this.moveGuard(true, false, true, false);
                else
                    this.moveGuard(false, false, true, false);
            }
            else {
                if (this.y < hero.y)
                    this.moveGuard(false, true, false, true);
                else if(this.y > hero.y)
                    this.moveGuard(true, false, true, false);
                else
                    this.moveGuard(false, false, false, true);
            }
        }
    }
    changeVolume(fltVolume){
        this.audioGold.volume = fltVolume;
        this.audioTrou.volume = fltVolume;
    }
}
