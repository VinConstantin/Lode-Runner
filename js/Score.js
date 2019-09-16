class Score{
    constructor(){
        this.time = 0
        this.score = 0;

        this.date2 = null;
        this.dateAJD = null;
        this.strDate = null;
        this.strHeure = null;
        this.intSeconde = 0;
        this.intMinute = 0;
        this.intHeure = 0;
        this.intMilliseconde = 0;
        this.Chrono = false;
        this.intMilliEcoule = 0;
        this.intMilliEcouleCumul = 0;
        this.pause = false;

    }
    drawControles(){
            console.log('rip')

        context.save();

            //carree
            context.beginPath();
            context.rect(canvas.width,canvas.height/15 * 5,-200,canvas.height - (canvas.height/15 * 5));
            context.fillStyle = "#80210e";
            context.fill();
            context.stroke();
            //titre

            context.font = "15px Comic Sans MS";
            context.fillStyle = "white";
            context.textAlign = "center";
            context.fillText("CONTRÔLES", canvas.width / 100 * 87 + 7, canvas.height / 15 * 6+2);

            //rainbow

            context.font = "10px Comic Sans MS";
            context.fillStyle = "white";
            context.textAlign = "left";
            context.fillText("rainbow : ", canvas.width / 100 * 77, canvas.height / 15 * 7);

            context.font = "14px Lucida Sans Unicode";
            context.fillStyle = "#777777";
            context.fillText("R ", canvas.width / 100 * 77+95, canvas.height / 15 * 7);

            //up

            context.font = "10px Comic Sans MS";
            context.fillStyle = "white";
            context.textAlign = "left";
            context.fillText("haut : ", canvas.width / 100 * 77, canvas.height / 15 * 8);

            context.font = "14px Lucida Sans Unicode";
            context.fillStyle = "#777777";
            context.fillText("haut", canvas.width / 100 * 77+95, canvas.height / 15 * 8);

            //down

            context.font = "10px Comic Sans MS";
            context.fillStyle = "white";
            context.textAlign = "left";
            context.fillText("bas : ", canvas.width / 100 * 77, canvas.height / 15 * 9);

            context.font = "14px Lucida Sans Unicode";
            context.fillStyle = "#777777";
            context.fillText("bas ", canvas.width / 100 * 77+95, canvas.height / 15 * 9);

            //right

            context.font = "10px Comic Sans MS";
            context.fillStyle = "white";
            context.textAlign = "left";
            context.fillText("droite : ", canvas.width / 100 * 77, canvas.height / 15 * 10);

            context.font = "14px Lucida Sans Unicode";
            context.fillStyle = "#777777";
            context.fillText("droite", canvas.width / 100 * 77+95, canvas.height / 15 * 10);

            //left

            context.font = "10px Comic Sans MS";
            context.fillStyle = "white";
            context.textAlign = "left";
            context.fillText("gauche : ", canvas.width / 100 * 77, canvas.height / 15 * 11);

            context.font = "14px Lucida Sans Unicode";
            context.fillStyle = "#777777";
            context.fillText("gauche ", canvas.width / 100 * 77+95, canvas.height / 15 * 11);

            //pause

            context.font = "10px Comic Sans MS";
            context.fillStyle = "white";
            context.textAlign = "left";
            context.fillText("pause : ", canvas.width / 100 * 77, canvas.height / 15 * 12);

            context.font = "14px Lucida Sans Unicode";
            context.fillStyle = "#777777";
            context.fillText("P ", canvas.width / 100 * 77+95, canvas.height / 15 * 12);

            //volume

            context.font = "10px Comic Sans MS";
            context.fillStyle = "white";
            context.textAlign = "center";
            context.fillText("VOLUME", canvas.width / 100 * 87 + 7, canvas.height / 15 * 13);

            context.restore();
    }
    drawArrow(img,x,y,fltAngle){
        context.save();
        context.translate(x, y);
        context.rotate(fltAngle);
        context.drawImage(img, 0, 0,14,14);
        context.restore();
        
    }

    drawScore(hero){
        context.clearRect(canvas.width,0,-200,canvas.height/15 *5);
        this.initScore();
        context.font = "15px Comic Sans MS";
        context.fillStyle = "black";
        context.textAlign = "left";
        context.fillText("Score: " + this.score, canvas.width/100 * 77, canvas.height/15 );


        //timer
        context.font = "15px Comic Sans MS";
        context.fillStyle = "black";
        context.textAlign = "left";
        context.fillText("Temps: " + this.strHeure, canvas.width/100 * 77, canvas.height/15 * 2 );

        //Life
        context.font = "15px Comic Sans MS";
        context.fillStyle = "black";
        context.textAlign = "left";
        context.fillText("Vies: " + hero.life, canvas.width/100 * 77, canvas.height/15 * 3 );
        //Life
        context.font = "15px Comic Sans MS";
        context.fillStyle = "black";
        context.textAlign = "left";
        context.fillText("Niveau: " + (intDiff - 2), canvas.width/100 * 77, canvas.height/15 * 4 );


    }

    initScore(){

        context.beginPath();
        context.rect(canvas.width,0,-200,canvas.height/15 * 5);
        context.fillStyle = "#3e682e";

        context.fill();
        context.stroke();
        this.drawControles();

    }

    addScore(intPoint){
        this.score += intPoint;
    }



    //Chrono
    partirChrono(){
        this.Chrono = (this.Chrono == true ? false : true) ;
        this.dateInitial = (this.Chrono == true ? new Date() : this.dateInitial);
    }

    recommencerChrono(){
        this.intMilliEcouleCumul = 0;
    }



    miseAJourTimer()
    {
        if(this.Chrono){
            this.date2 = new Date();
            this.intMilliEcoule = this.date2 - this.dateInitial;
            this.dateInitial = this.date2;
            this.intMilliEcouleCumul += this.intMilliEcoule;

        }
        this.strHeure = this.msToTime(this.intMilliEcouleCumul);
    }

    msToTime(duration) {
        this.intMilliseconde = parseInt((duration%100))
            , this.intSeconde = parseInt((duration/1000)%60)
            , this.intMinute = parseInt((duration/(1000*60))%60)
            , this.intHeure = parseInt((duration/(1000*60*60))%24);

        this.intHeure = (this.intHeure < 10) ? "0" + this.intHeure : this.intHeure;
        this.intMinute = (this.intMinute < 10) ? "0" + this.intMinute : this.intMinute;
        this.intSeconde = (this.intSeconde < 10) ? "0" + this.intSeconde : this.intSeconde;

        return this.intMinute + ":" + this.intSeconde ;
    }


}