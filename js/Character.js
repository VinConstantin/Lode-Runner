class Character{
    constructor(x,y,context, score) {
        this.context=context;
        this.x=x;
        this.y=y;
        this.xBlock = null
        this.xBlockGauche = null
        this.xBlockDroit = null
        this.yBlock = null
        this.intVitesse=2;
        this.intGravite = 2;

        this.intGauche = this.x;
        this.intDroit = this.x+16;

        this.binFalling = false;

        this.binMoveRight = false;
        this.binMoveLeft = false;
        this.binMoveUp = false;
        this.binMoveDown = false;

        this.won = false;
        this.intGold = 0;

        this.audioGold = new Audio('sound/self/gold.mp3');

        this.binCanBreak = true;

        this.score = score;
        this.intNiveau = 0;


    }
    drawInit(anim){
        anim.draw(this.x,this.y, this.context);
    }
    getYBlock(){
        return this.yBlockHaut;
    }
    getXBlock(){
        return this.xBlockDroit;
    }
    upDatePos(anim){
        //voir si il y a un bloc en dessous, si oui, il tombe
        if(!this.binFalling && this.binCanBreak) {
            if (this.binMoveLeft) {
                if (this.checkMoveGauche()) {
                    if (this.onRamp()) {
                        this.stickRamp();
                    }

                    this.x -= this.intVitesse;
                }
            }

            if (this.binMoveRight) {
                if (this.checkMoveDroit()) {
                    if (this.onRamp()) {
                        this.stickRamp();
                    }
                    this.x += this.intVitesse;
                }

            }
            if(this.binMoveUp){
                //Verrifie si victoire
                if(this.y - this.intVitesse<=0){
                    this.score.addScore(1750);
                    this.audioEnding.play();
                    this.won = true;
                    youWon();
                    resetGame();
                    
                }
                if (this.checkMoveHaut()) {
                    this.y-=this.intVitesse;
                    this.stickLadder();
                }
            }
            if(this.binMoveDown){
                if (this.checkMoveBas()) {
                    if(this.onRamp()){
                        this.y+=this.intVitesse;
                        this.stickRamp();
                    }
                    this.y+=this.intVitesse;
                    this.stickLadder();
                }
            }
        }

        this.xBlock = Math.round(this.x/16);
        this.xBlockGauche = Math.ceil(this.x/16);
        this.xBlockDroit = Math.floor(this.x/16);

        this.yBlockHaut = Math.ceil(this.y/16);
        this.yBlockBas = Math.floor(this.y/16);
        this.yBlock = Math.floor(this.y/16);

        this.intGauche = this.x;
        this.intDroit = this.x+16;


        this.falling();

        anim.draw(this.x,this.y, this.context);
        this.gatherGold();

    }
    checkMoveGauche(){
        let binPossibleOut = !(this.intGauche-1 <=0);
        let binPossibleBloc  = (level.tabLevel[this.yBlockHaut][this.xBlockGauche-1] != 1) && (level.tabLevel[this.yBlockBas][this.xBlockGauche-1] != 1)

        let binPossible = binPossibleOut && binPossibleBloc;
        return binPossible;
    }
    checkMoveDroit(){
        let binPossibleOut = !(this.intDroit >= 448)
        let binPossibleBloc  = (level.tabLevel[this.yBlockHaut][this.xBlockDroit+1] != 1) && (level.tabLevel[this.yBlockBas][this.xBlockDroit+1] != 1)


        let binPossible = binPossibleOut && binPossibleBloc;
        return binPossible;
    }
    checkMoveHaut(){
        return ((level.tabLevel[this.yBlock][this.xBlock]==2 || level.tabLevel[this.yBlock+1][this.xBlock]==2) && level.tabLevel[this.yBlockHaut-1][this.xBlock]!=1 && this.y>0 );
    }
    checkMoveBas(){
        return ((level.tabLevel[this.yBlock][this.xBlock]==3 || level.tabLevel[this.yBlock][this.xBlock]==2 || level.tabLevel[this.yBlock+1][this.xBlock]==2) && level.tabLevel[this.yBlock+1][this.xBlock]!=1);
    }
    onRamp(){
        return (level.tabLevel[this.yBlockHaut][this.xBlock] ==3)
    }
    onLadder(){
        return (level.tabLevel[this.yBlockHaut][this.xBlock] ==2 || level.tabLevel[this.yBlockHaut+1][this.xBlock] ==2)
    }
    falling(){
        if(level.tabLevel[this.yBlockBas+1][this.xBlockDroit]==1 || level.tabLevel[this.yBlockBas+1][this.xBlockGauche]==1 || level.tabLevel[this.yBlockBas+1][this.xBlockDroit]==9 || level.tabLevel[this.yBlockBas+1][this.xBlockGauche]==9){
            this.binFalling = false;
        }
        else if(this.onRamp()&& level.tabLevel[this.yBlockBas+1][this.xBlock]!=3){
            this.binFalling = false;
        }
        else if(this.onLadder() && level.tabLevel[this.yBlockBas+1][this.xBlock] !=0    ){
            this.binFalling = false;
        }
        else if(level.tabLevel[this.yBlock+1][this.xBlock] == -2 || level.tabLevel[this.yBlock][this.xBlock] == -2 ){
            this.binFalling = false;
        }
        else {
            this.y += this.intGravite;
            this.binFalling = true;
        }

    }
    stickLadder(){
        if(level.tabLevel[this.yBlock][this.xBlockGauche]==2)
            this.x=this.xBlockGauche*16;
        if(level.tabLevel[this.yBlock][this.xBlockDroit]==2)
            this.x=this.xBlockDroit*16;
    }
    stickRamp(){
        if (level.tabLevel[this.yBlockHaut][this.xBlock] == 3)
            this.y = this.yBlockHaut * 16;
        else if (level.tabLevel[this.yBlockBas][this.xBlock] == 3)
            this.y = this.yBlockBas * 16;

    }
    gatherGold(){
        if(level.tabLevel[this.yBlock][this.xBlock]==4) {
            this.intGold++;
            level.tabLevel[this.yBlock][this.xBlock] = 0;
            this.score.addScore(250);
            this.audioGold.play();
            this.intGold == 6 ? this.won = true : "";

        }

    }
    changeVolume(fltVolume){
        this.audioGold.volume = fltVolume;
    }


}
