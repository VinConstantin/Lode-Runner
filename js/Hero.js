class Hero extends Character {
    constructor(x, y, context, score) {
        super(x, y, context);
        this.heroAnim = new Animation(this);
        this.heroAnim.binMoving = false;
        this.binBot = false;
        this.intVitesse=2;

        this.audioFall = new Audio('sound/self/fall.mp3');

        this.audioEnding = new Audio('sound/self/win.mp3');
        this.audioBreak = new Audio('sound/self/break.mp3');
        this.audioDead = new Audio('sound/self/lostlife.mp3');
        this.audioLadder = new Audio("sound/self/ladder.mp3");
        this.audioLife = new Audio("sound/self/lostlife.mp3");
        this.intGold = 0;

        this.score = score;
        this.life = 5;
        this.IsDead = false;
    }
    checkState(){
        this.dead();
    }
    falling(){
        if(level.tabLevel[this.yBlockBas+1][this.xBlockDroit]==1 || level.tabLevel[this.yBlockBas+1][this.xBlockGauche]==1 || level.tabLevel[this.yBlockBas+1][this.xBlockDroit]==9 || level.tabLevel[this.yBlockBas+1][this.xBlockGauche]==9){
            this.binFalling = false;
            this.audioFall.pause();
            this.audioFall.currentTime = 0;
        }
        else if(this.onRamp()&& level.tabLevel[this.yBlockBas+1][this.xBlock]!=3){
            this.binFalling = false;
            this.audioFall.pause();
            this.audioFall.currentTime = 0;
        }
        else if(this.onLadder() && level.tabLevel[this.yBlockBas+1][this.xBlock] !=0    ){
            this.binFalling = false;
            this.audioFall.pause();
            this.audioFall.currentTime = 0;
        }
        else if(level.tabLevel[this.yBlock+1][this.xBlock] == -2 || level.tabLevel[this.yBlock][this.xBlock] == -2 ){
            this.binFalling = false;
            this.audioFall.pause();
            this.audioFall.currentTime = 0;
        }
        else {
            this.y += this.intGravite;
            this.binFalling = true;
        }

    }
    updateAnimHero(){
        if(this.binCanBreak) {
            if (this.yTemp != this.y || this.xTemp != this.x)
                this.heroAnim.binMoving = true;
            else {
                this.heroAnim.binMoving = false;
                this.audioLadder.pause();
                this.audioLadder.currentTime = 0;
            }
            if(this.binFalling){
                this.heroAnim.state=('fall');
                this.audioFall.play();
            }else if (this.binMoveRight || this.binMoveLeft) {
                
                if (this.onRamp()) {
                    if (this.binMoveRight)
                        this.heroAnim.state = ('rampRight');
                    else
                        this.heroAnim.state = ('rampLeft');
                }
                else if (this.onLadder()) {
                    this.heroAnim.state = 'ladder'
                    this.heroAnim.binMoving ? this.audioLadder.play() : "";
                }else if (this.binMoveRight)
                    this.heroAnim.state = ('walkRight');
                else
                    this.heroAnim.state = ('walkLeft');
            } else if (this.onLadder()) {
                this.heroAnim.state = ('ladder');
                this.heroAnim.binMoving ? this.audioLadder.play() : "";
            }
            this.heroAnim.updateFrame();
            this.yTemp = this.y;
            this.xTemp = this.x;
        }
    }
    breakBlockRight(){
        if(level.tabLevel[this.yBlock+1][this.xBlock+1]==1 && this.binCanBreak) {
            level.blockRegen(this.xBlock + 1, this.yBlock + 1, true);
            this.audioBreak.play();
        }
    }
    breakBlockLeft(){
        if(level.tabLevel[this.yBlock+1][this.xBlock-1]==1 && this.binCanBreak) {
            level.blockRegen(this.xBlock - 1, this.yBlock + 1, false);
            this.audioBreak.play();
        }
    }
    dead(){
        if((level.tabLevel[this.yBlock][this.xBlock]==1)){
            this.IsDead = true;
            if(hero.life > 1){
                context.font = "25px Comic Sans MS";
                context.fillStyle = "red";
                context.textAlign = "center";
                context.fillText("Vous Êtes Mort", (canvas.width-200)/2, canvas.height/2);
                context.font = "25px Comic Sans MS";
                context.fillText("'P' Pour Continuer Le Niveau", (canvas.width-200)/2, canvas.height/2 + 30);
                togglePause();
            }
            this.life > 1 ? this.life-- : gameOver();
            this.heroAnim.state=('dead');
            this.audioDead.play();
            this.score.resetGame();
            resetGame();

        }else{
            this.IsDead = false;
        }
    }
    resetHero(x,y){
        this.x = x;
        this.y = y;
    }
    changeVolume(fltVolume){
        this.audioGold.volume = fltVolume;
        this.audioFall.volume = fltVolume;
        this.audioEnding.volume = fltVolume;
        this.audioBreak.volume = fltVolume;
        this.audioDead.volume = fltVolume;
        this.audioLadder.volume = fltVolume;
        this.audioLife.volume = fltVolume;
    }




}