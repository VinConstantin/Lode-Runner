class Controller{
    constructor(char,level){
        document.onkeydown = checkKey;
        document.onkeyup = stopKey;
        var binRanbow = false;
        function checkKey(e) {

            e = e || window.event;
            //si il est sur une plateforme
            if(!char.binFalling){
                //haut
                if (e.keyCode == '38') {
                    char.binMoveUp = true;
                }
                //bas
                else if (e.keyCode == '40') {
                    char.binMoveDown = true;
                }
                //gauche
                else if (e.keyCode == '37') {
                    char.binMoveLeft = true;
                }
                //droite
                else if (e.keyCode == '39') {
                    char.binMoveRight = true;
                }
                //x (creuser droit)
                else if (e.keyCode == '88'){
                    if(char.checkMoveDroit()){
                        char.breakBlockRight();
                    }

                }
                //z (creuser gauche)
                else if (e.keyCode == '90'){
                    if(char.checkMoveGauche()){
                        char.breakBlockLeft();
                    }
                }
            }
            //si il tombe
            else{
                char.updateAnimHero('fall');
            }
        }
        function stopKey(e) {

            e = e || window.event;

            //haut
            if (e.keyCode == '38') {
                char.binMoveUp = false;
            }
            //bas
            else if (e.keyCode == '40') {
                char.binMoveDown = false;
            }
            //gauche
            else if (e.keyCode == '37') {
                char.binMoveLeft = false;
            }
            //droite
            else if (e.keyCode == '39') {
                char.binMoveRight = false;

            }
            //rainbowcolor
            else if(e.keyCode == '82'){
                if(!binPaused) {
                    if (!binRanbow) {
                        level.startRainbow();
                        binRanbow = true;
                    }
                    else {
                        level.stopRainbow();
                        binRanbow = false;
                    }
                }
            }
            else if (e.keyCode === 80)// p key
            {
                score.partirChrono();
                togglePause();
            }
        }
    }
}