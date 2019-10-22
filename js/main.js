var topLeft = document.getElementById("topleft");
var topRight = document.getElementById("topright");
var botLeft = document.getElementById("botleft");
var botRight = document.getElementById("botright")
var gameArray = [];
var guessNumber = 0;
var gameBtns = document.getElementsByClassName("gamebtn");
var roundNum = 0;

function activateBtns () {
    topLeft.onclick = function () {
        clickTile(1);
    };
    topRight.onclick = function () {
        clickTile(2);
    }
    botLeft.onclick = function () {
        clickTile(3);
    }
    botRight.onclick = function () {
        clickTile(4);
    }
}

window.onload = startScreen();

function startScreen(){
    let newGameBtn = document.createElement("button");
    let message = document.getElementById("message");
    newGameBtn.appendChild(document.createTextNode("Starta spel"));
    newGameBtn.addEventListener("click", restart, false);
    newGameBtn.setAttribute("id", "rst");
    message.appendChild(newGameBtn);
    for (let i = 0; i < gameBtns.length; i++){
        gameBtns[i].style.visibility = "hidden";
    }
}

function generatePattern() {
    var tileNum = Math.floor(Math.random() * 4 + 1);
    gameArray.push(tileNum);
    guessNumber = 0;
    var tileNum = 0;
    var clock = setInterval(function(){   
        lightUpTile(gameArray[tileNum]);
        tileNum++;
        topLeft.onclick = null;
        topRight.onclick = null;
        botLeft.onclick = null;
        botRight.onclick = null;
        if (tileNum == gameArray.length){
            clearInterval(clock);
            tileNum = 0;
            activateBtns();
        }
    }, 700);
}

function lightUpTile(j){
        switch(j) {
            case 1:
                    topLeft.style.backgroundColor = "#478847";
                    setTimeout(function(){
                        topLeft.style.backgroundColor = "green";
                    }, 500);
            break;
            case 2:
                    topRight.style.backgroundColor = "#b15656";
                    setTimeout(function(){
                        topRight.style.backgroundColor = "red";
                    }, 500);
            break;
            case 3:
                    botLeft.style.backgroundColor = "#2424a1";
                    setTimeout(function(){
                        botLeft.style.backgroundColor = "blue";
                    }, 500);
            break;
            case 4:
                    botRight.style.backgroundColor = "#99993c";
                    setTimeout(function(){
                        botRight.style.backgroundColor = "yellow";
                    }, 500);
            break;
        }
}

function clickTile(k){
    switch(k) {
        case 1:
                topLeft.style.backgroundColor = "#478847";
                setTimeout(function(){
                    topLeft.style.backgroundColor = "green";
                }, 300);
        break;
        case 2:
                topRight.style.backgroundColor = "#b15656";
                setTimeout(function(){
                    topRight.style.backgroundColor = "red";
                }, 300);
        break;
        case 3:
                botLeft.style.backgroundColor = "#2424a1";
                setTimeout(function(){
                    botLeft.style.backgroundColor = "blue";
                }, 300);
        break;
        case 4:
                botRight.style.backgroundColor = "#99993c";
                setTimeout(function(){
                    botRight.style.backgroundColor = "yellow";
                }, 300);
        break;
    }

    valueCheck(k);
    if (guessNumber == gameArray.length){
        generatePattern();
    }
}

function restart (){
    gameArray = [];
    guessNumber = 0;
    generatePattern()
    var rst = document.getElementById("rst");
    rst.remove();
    document.getElementById("loss").innerHTML = "";
    for (let i = 0; i < gameBtns.length; i++){
        gameBtns[i].style.visibility = "visible";
        roundNum = 0;
    }
}

function valueCheck(lue){
    var correctAnswer = gameArray[guessNumber];
    if (lue == correctAnswer){
        guessNumber++;
    } else {
        let newGameBtn = document.createElement("button");
        let message = document.getElementById("message");
        let gameRound = gameArray.length - 1;
        if (localStorage.getItem("record") < gameRound){
        localStorage.setItem("record", gameRound);
        }
        let kraf = document.createTextNode("Du klarade " + gameRound + " rundor!" + " Ditt rekord är: " + localStorage.getItem("record"));
        let loss = document.getElementById("loss");
        loss.appendChild(kraf);
        newGameBtn.appendChild(document.createTextNode("Spela igen"));
        newGameBtn.addEventListener("click", restart, false);
        newGameBtn.setAttribute("id", "rst");
        message.appendChild(newGameBtn);
        for (let i = 0; i < gameBtns.length; i++){
            gameBtns[i].style.visibility = "hidden";
        }
    }
}