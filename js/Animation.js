class Animation {
    constructor(character) {
        this.binBot = character.binBot;
        this.spriteWidth = 192;
        this.spriteHeight = 80;

        this.rows = 5;
        this.cols = 12;
        this.intFrame = 0;


        this.width = this.spriteWidth / this.cols;


        this.height = this.spriteHeight / this.rows;


        this.curFrame = 0;


        this.frameCount = 4;

        this.srcX = 0;
        this.state = 'walking';
        this.binMoving = false;

        this.character = new Image();
        this.character.src = character.binBot ? "img/animationGuard"+character.intBot+".png":"img/animations.png";

    }


    updateFrame() {
        if(this.intFrame%5==0 && this.binMoving) {
            //Updating the frame index
            this.curFrame = ++this.curFrame % this.frameCount;

            //Calculating the x coordinate for spritesheet
            this.srcX = this.curFrame * this.width;
            this.intFrame=0;
        }
        this.intFrame++;

        //if(this.char.binBot == true)

    }

    draw(x, y, context) {
        //Drawing the image
            switch (this.state) {

                case 'walkLeft':
                    this.srcX = this.srcX;
                    context.drawImage(this.character, this.srcX, this.height * 0, this.width, this.height, x, y, this.width, this.height);
                    break;
                case 'walkRight':
                    this.srcX = this.srcX;
                    context.save();
                    context.translate(x + 8, y + 8);
                    context.scale(-1, 1);
                    context.drawImage(this.character, this.srcX, this.height * 0, this.width, this.height, 0 - 8, 0 - 8, this.width, this.height);
                    context.restore();
                    break;
                case 'ladder':
                    this.srcX = this.srcX;
                    context.drawImage(this.character, this.srcX, this.height * 1, this.width, this.height, x, y, this.width, this.height);
                    break;
                case 'rampLeft':
                    this.srcXTemp = this.srcX + (4 * 16);
                    context.drawImage(this.character, this.srcXTemp, this.height * 1, this.width, this.height, x, y, this.width, this.height);
                    break;
                case 'rampRight':
                    this.srcXTemp = this.srcX + (4 * 16);
                    context.save();
                    context.translate(x + 8, y + 8);
                    context.scale(-1, 1);
                    context.drawImage(this.character, this.srcXTemp, this.height * 1, this.width, this.height, 0 - 8, 0 - 8, this.width, this.height);
                    context.restore();
                    break;
                case 'breakLeft':
                    this.srcX = this.srcX;
                    context.drawImage(this.character, this.srcX, this.height * 2, this.width, this.height, x, y, this.width, this.height);
                    break;
                case 'breakRight':
                    this.srcX = this.srcX;
                    context.save();
                    context.translate(x + 8, y + 8);
                    context.scale(-1, 1);
                    context.drawImage(this.character, this.srcX, this.height * 2, this.width, this.height, 0 - 8, 0 - 8, this.width, this.height);

                    context.restore();
                    break;
                case 'dead':
                    this.srcX = this.srcX;
                    context.drawImage(this.character, this.srcX, this.height * 2, this.width, this.height, x, y, this.width, this.height);
                    break;
                case 'fall':
                    this.srcXTemp = this.srcX + (4 * 16);
                    context.drawImage(this.character, this.srcXTemp, this.height * 0, this.width, this.height, x, y, this.width, this.height);
                    break;
                case 'respawn':
		            this.srcXTemp = this.srcX + (8 * 16);
		            context.drawImage(this.character, this.srcXTemp, this.height * 1, this.width, this.height, x, y, this.width, this.height);  
                    break;
                }

    }

}