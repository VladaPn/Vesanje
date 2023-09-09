const hangmanImage = document.querySelector('.hangman-box img');
const keyboard = document.querySelector('.keyboard');
let letterContainer = document.querySelector('.word-display');
let currentWord;
let numberOfGuesses=0;
let correctLetters = [];
const playAgainBtn = document.querySelector(".play-again");

const resetGame = (word)=>{
    correctLetters = [];
    numberOfGuesses=0;
    document.querySelector(".game-modal").classList.remove("displayed");
    letterContainer.innerHTML=word.split("").map(()=>`<li class="letter"></li>`).join("");
    document.querySelector(".guesses-text b").innerText=numberOfGuesses+" /6";
    hangmanImage.src=`images/hangman-${numberOfGuesses}.svg`;
    keyboard.querySelectorAll('button').forEach((button)=>{
        button.disabled=false;
    })
}

const getRandomWord = ()=>{
    const { word, hint } = wordList[Math.floor(Math.random()*wordList.length)]
    currentWord= word;
    document.querySelector('.hint-text b').innerText=hint;
    console.log(word);
    resetGame(word);
    //for(let i=0;i<word.length;i++){
    //const letterItem = document.createElement('li');
    //letterItem.classList.add('letter');
   // letterContainer.appendChild(letterItem);
   // }
}

const gameOver = (isVictory)=>{
   setTimeout(()=>{
    document.querySelector(".game-modal").classList.add("displayed");
    const modalText = isVictory? `You found the word `:`The correct word was`
    document.querySelector(".game-modal .content img").src=`images/${isVictory?"victory":"lost"}.gif`;
    document.querySelector(".game-modal h4").innerText=`${isVictory?"You won!":"Game Over!"}`;
    document.querySelector(".game-modal p").innerHTML=`${modalText} : <b>${currentWord}</b>`;
   },300)
}

const initGame = (button, clickedLetter) =>{
    if(numberOfGuesses<6){
    if(currentWord.includes(clickedLetter)){
        console.log(clickedLetter, 'exist in this word');
        [...currentWord].forEach((letter,index)=>{
            if(letter === clickedLetter){
                correctLetters.push(letter);
              letterContainer.querySelectorAll("li")[index].innerText=letter;
              letterContainer.querySelectorAll("li")[index].classList.add("guessed");
            }
            if(correctLetters.length === currentWord.length) return gameOver(true);
        })
    }else{
        console.log('it doesnt exist')
        numberOfGuesses++;
        document.querySelector(".guesses-text b").innerText=numberOfGuesses+" /6"
        hangmanImage.src=`images/hangman-${numberOfGuesses}.svg`
        button.disabled = true;
    }
}else{
    return gameOver(false);
    document.querySelector(".game-modal").classList.add("displayed");
    document.querySelector(".content p b").innerText=currentWord;
    numberOfGuesses=0;
    hangmanImage.src=`images/hangman-${numberOfGuesses}.svg`
    document.querySelector(".play-again").addEventListener("click",()=>{
    document.querySelector(".guesses-text b").innerText=numberOfGuesses+" /6"
    document.querySelector(".game-modal").classList.remove("displayed");
   
    getRandomWord();
})
}
}

//creating keyboard buttons
for (let i = 97; i < 123; i++) {
    //console.log(String.fromCharCode(i));
    const button = document.createElement('button');
    button.innerText=String.fromCharCode(i);
    //console.log(button);
    keyboard.appendChild(button);
    button.disabled = false;
    button.addEventListener('click', e=> initGame(e.target, String.fromCharCode(i)))
}
getRandomWord();
playAgainBtn.addEventListener("click",getRandomWord)

