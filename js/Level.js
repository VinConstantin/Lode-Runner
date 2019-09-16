class Level {
    constructor(context,sprites,background) {
        this.context = context;
        this.background=background;
        this.sprites=sprites;
        this.audioRainbow = new Audio("sound/self/rainbow.mp3");

        this.tabLevel = [
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

    this.graph = new Graph([
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0],
        [0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0],
        [1,1,1,1,1,1,1,1,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],
        [0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],
        [0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          ]);
        this.tabSpawnable=[];
        this.rainbow = null;
        this.intColor = 1;
        this.audioFill = new Audio("sound/self/fill.mp3");
    }
    getSpawnable(){
	    for(var y = 0; y<this.tabLevel.length;y++) {
		    for (var x = 0; x < this.tabLevel[0].length; x++) {
				if(this.tabLevel[y][x]==0 && this.tabLevel[y+1][x]==1 && y != 15){
					this.tabSpawnable.push([y,x]);
				}
		    }
	    }
	    return this.tabSpawnable;
    }
    getGraph(){
        return this.graph;
    }

    drawMap(){
        context.drawImage(this.background,0,0,640,480,0,0,448,288);
        for(var y = 0; y<this.tabLevel.length;y++){
            for(var x = 0;x<this.tabLevel[0].length;x++){
                switch (this.tabLevel[y][x]){
                    case -2:
                        this.sprites.drawTile('noir', context, x,y);
                        break;
                    case -1:
                        this.sprites.drawTile('noir', context, x,y);
                        break;
                    case 0:
                        this.sprites.drawTile('noir', context, x,y);
                        break;
                    case 1:
                        this.sprites.drawTile('ground', context, x,y);
                        break;
                    case 2:
                        this.sprites.drawTile('ladder', context, x,y);
                        break;
                    case 3:
                        this.sprites.drawTile('ramp', context, x,y);
                        break;
                    case 4:
                        this.sprites.drawTile('gold', context, x,y);
                        break;

                    case 5:
                        this.sprites.drawTile('break1', context, x,y);
                        break;
                    case 6:
                        this.sprites.drawTile('break2', context, x,y);
                        break;
                    case 7:
                        this.sprites.drawTile('break3', context, x,y);
                        break;
                    case 8:
                        this.sprites.drawTile('break4', context, x,y);
                        break;
                    case 9:
                        this.sprites.drawTile('obsidian',context,x,y);
                }
            }
        }
    }
    startRainbow(){
        this.audioRainbow.play();
       this.rainbow = setInterval(function () {
            this.sprites.define('obsidian',1,this.intColor);
            this.sprites.define('ground',0,this.intColor);
            this.sprites.define('break1',6,this.intColor);
            this.sprites.define('break2',7,this.intColor);
            this.sprites.define('break3',8,this.intColor);
            this.sprites.define('break4',9,this.intColor);
            this.intColor++;
            if(intColor == 11)
                this.intColor=1
        },160)

    }
    stopRainbow(){
        this.audioRainbow.pause();
        this.audioRainbow.currentTime = 0;
        clearInterval(this.rainbow);
    }
    upOneBlock(guard){
        setTimeout(function () {
            guard.y-=16;
	        guard.setBinStuck(false)
        },4000);

    }


    blockRegen(x,y,binRight){
        hero.binCanBreak = false
        hero.heroAnim.state=binRight?'breakRight':'breakLeft';
        setTimeout(function () {
            hero.binCanBreak = true;
            hero.heroAnim.state=binRight?'walkRight':'walkLeft';
            this.level.tabLevel[y][x]=-1;
                setTimeout(function() {
                var i = 5;
                var intervalRegen = setInterval(function () {
                    if (i != 8)
                        this.level.tabLevel[y][x] = i;
                    else
                        this.level.tabLevel[y][x] = 1;
                    i++;
                    if (i == 9) {
                        clearInterval(intervalRegen);
                    }
                }, 300);
                    this.level.audioFill.play();
            },7000);
        },500)

    }
    clear(){
        this.context.clearRect(0, 0, 640, 480);

    }
    spawnEchelle(){
    	for(var y = 0;y<2;y++) {
    		this.tabLevel[y][11]=2;
	    }
    }
    changeVolume(fltVolume){
        this.audioRainbow.volume = fltVolume;
        this.audioFill.volume = fltVolume;
    }
}
