const head            = document.getElementById("head");
const body            = document.querySelector("body");
const colorsContainer = document.querySelector(".colors");
const colorSquare     = document.getElementsByClassName("square");
const easy            = document.querySelector(".easy");
const normal          = document.querySelector(".normal");
const veteran         = document.querySelector(".veteran");
const resetButton     = document.querySelector(".reset");
const navButton       = document.getElementsByClassName("navButton");
const score           = document.querySelector(".score");
const time            = document.querySelector(".time");
const timeScore       = document.getElementById("time-score");
let   rgbHeader       = document.querySelector(".rgb");
let   playScore       = 0;
let   gameStarted     = false;

const selected = (elem) => {
    for(let i = 0; i < navButton.length; i++){
        navButton[i].classList.remove("selected");
    }
    elem.classList.add("selected");
}

const addSquares = (num) => {
    for(let i = 0; i < num; i++){
        colorsContainer.insertAdjacentHTML("beforeend", `<div class="square"></div>`)
    }
}

const randomRgb = () => {
    let rand = () => {
        return Math.floor(Math.random() * 256);
    }
    return `rgb(${rand()}, ${rand()}, ${rand()})`;
}

const colorSetter = (arr) => {
    for(let i = 0; i < arr.length; i++){
        arr[i].style.backgroundColor = randomRgb();
    }
    rgbHeader.innerHTML = `<h2>${arr[Math.floor(Math.random() * arr.length)].style.backgroundColor}</h2>`
}

const loadNormalRgb = () => {
    selected(normal)
    colorsContainer.innerHTML = "";
    addSquares(6);
    colorSetter(colorSquare);
    winner(colorSquare);
}

const loadEasyRgb = () => {
    selected(easy)
    colorsContainer.innerHTML = "";
    addSquares(3);
    colorSetter(colorSquare);
    winner(colorSquare);
}

const loadVeteranRgb = () => {
    selected(veteran)
    colorsContainer.innerHTML = "";
    addSquares(15);
    colorSetter(colorSquare);
    winner(colorSquare);
}

const winner = (arr) => {
    const winningPhrase = [
        "Nice!", "Spot On!", "*Plankton Voice*: Correct!", "Let's get it!!!", "Woooooooo!", "That's right!", "Swaaaag!", "Okay! I see you!"
    ]
    for(let square = 0; square < arr.length; square++){
        arr[square].addEventListener("click", ()=>{
            if(arr[square].style.backgroundColor === rgbHeader.innerText.toLowerCase()){
                for(let squares = 0; squares < arr.length; squares++){
                    arr[squares].style.backgroundColor = arr[square].style.backgroundColor;
                    arr[squares].style.boxShadow = "0px 15px 19px 2px rgb(120, 120, 120)";
                    arr[squares].addEventListener("mouseover", (event)=>{
                        event.target.style.boxShadow = "none";
                    })
                    arr[squares].addEventListener("mouseleave", (event)=>{
                        event.target.style.boxShadow = "0px 15px 19px 2px rgb(120, 120, 120)";
                    })
                    arr[squares].addEventListener("click", ()=>{
                        reset();
                        playScore += 1;
                        score.innerText = `${playScore}`;
                    });
                }
                rgbHeader.innerHTML = `<h2>${winningPhrase[Math.floor(Math.random() * winningPhrase.length)]}</h2>`;
                playScore += arr.length;
                score.innerText = `${playScore}`;
            } else {
                if(arr[square].style.boxShadow !== "rgb(0, 0, 0) 0px 0px 0px 0px"){
                    arr[square].style.backgroundColor = "rgb(0, 0, 0)";
                    arr[square].style.boxShadow = "0px 0px 0px 0px rgb(0, 0, 0)";
                    playScore -= 1;
                    score.innerText = `${playScore}`;
                }
            }
        })
    };
}

const reset = () => {
    if(colorSquare.length === 6){
        loadNormalRgb();
    } else if(colorSquare.length === 15){
        loadVeteranRgb();
    } else {
        loadEasyRgb();
    }
}

const buttonListeners = () => {
    easy.addEventListener("click", loadEasyRgb);
    normal.addEventListener("click", loadNormalRgb);
    veteran.addEventListener("click", loadVeteranRgb);
    resetButton.addEventListener("click", reset);
}

buttonListeners();
loadNormalRgb();