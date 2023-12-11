const state = {
    score:{
        playerScore: 0,
        computerScore:0,
        scoreBox: document.getElementById("score_points"),

    },
    cardSprites:{
        avatar: document.getElementById("card-image"),
        name: document.getElementById("card-name"),
        type: document.getElementById("card-type"),
    },
    fieldCards: {
        player: document.getElementById("player-field-card"),
        computer: document.getElementById("computer-field-card"),
    },

    playerSides: {
        player1: "player-cards",
        player1BOX:document.querySelector("#player-cards"),
        computer: "computer-cards",
        computerBOX: document.querySelector("#computer-cards"), 
    },

   actions:{
    button:document.getElementById("next-duel")
    },

};



const playerSides = {
    player1: "player-cards",
    computer: "computer-cards",
};



const pathImages = "./src/assets/icons/";

const cardData =[
    {
        id: 0,
        name: "Blue Eyes White Dragon",
        type: "Paper",
        img: `${pathImages}dragon.png`,
        WinOf:[1],
        LoseOf:[2],
        },
    {
        id: 1,
        name: "Dark Magician",
        type: "Rock",
        img: `${pathImages}magician.png`,
        WinOf:[2],
        LoseOf:[0],
         },
    {
        id: 2,
        name: "Exodia",
        type: "Scissors",
        img: `${pathImages}exodia.png`,
        WinOf:[0],
        LoseOf:[1],
        },     
            
];


async function getRandomCardId(){
    const ramdomIndex =Math.floor(Math.random() * cardData.length);
    return cardData[ramdomIndex].id;
}

async function createCardimage(IdCard,fieldSide) {
    const cardImage = document.createElement("img");
    cardImage.setAttribute("height","100px");
    cardImage.setAttribute("src", "./src/assets/icons/card-back.png");
    cardImage.setAttribute("data-id", IdCard);
    cardImage.classList.add("card");

    if(fieldSide === playerSides.player1) { 
        cardImage.addEventListener("click", () => {
setCardfield(cardImage.getAttribute("data-id"));
        });
        
cardImage.addEventListener("mouseover", () => {
    drawSelectCard(IdCard);
});
}

return cardImage;
}

async function setCardfield(cardId) {

await removeAllCardsImages();
 let computerCardId = await getRandomCardId();

await ShowHiddenCardsFieldsImages(true);

await hiddenCardDetails();

await drawCardsInField(cardId,computerCardId);

 let duelResults = await checkDuelResults(cardId, computerCardId);

 await updateScore();   
await drawButton(duelResults);

}

async function drawCardsInField(cardId,computerCardId){


    state.fieldCards.player.src = cardData[cardId].img;
    state.fieldCards.computer.src = cardData[computerCardId].img;
   

}

async function ShowHiddenCardsFieldsImages(value) {

if (value === true) {
state.fieldCards.player.style.display = "block";
 state.fieldCards.computer.style.display = "block";
    }

    
if (value === false) {
    state.fieldCards.player.style.display = "none";
    state.fieldCards.computer.style.display = "none";
        }
}

async function hiddenCardDetails(){
    
    state.cardSprites.avatar.src = "";
    state.cardSprites.name.innerText= "";
    state.cardSprites.type.innerText = "";

}

async function drawButton(text){
    state.actions.button.innerText = text.toUpperCase();
    state.actions.button.style.display = "block";

}

async function updateScore(){
    state.score.scoreBox.innerText = 'Win:${state.score.playerScore} | lose:${state.score.computerScore}';
}



  async function checkDuelResults(playerCardId, computerCardId){
    
    let duelResults = "Draw";
    let playerCard = cardData[playerCardId];


    if (playerCard.WinOf.includes(computerCardId)) {
        duelResults = "win";
         playAudio = (duelResults);
        state.score.playerScore++;
    }

    if(playerCard.LoseOf.includes(computerCardId)) {
        duelResults = "lose";
        playAudio = (duelResults);
        state.score.computerScore++;
 }

    return duelResults;

}



async function removeAllCardsImages() {

    let cards = state.playerSides.computerBOX
    let imgElements = cards.querySelectorAll("img");
    imgElements.forEach((img) => img.remove());

    cards = state.playerSides.player1BOX
    imgElements = cards.querySelectorAll("img");
    imgElements.forEach((img) => img.remove());
}


async function drawCards(cardNumbers, fieldSide) {
    for ( let i = 0; i < cardNumbers; i++ ) {
    const randomIdCard = await getRandomCardId();
    const cardImage = await createCardimage(randomIdCard,fieldSide);
    
    document.getElementById(fieldSide).appendChild(cardImage);
}
}

async function resetDuel(){
    state.cardSprites.avatar.src = "";
    state.actions.button.style.display = "none";

    state.fieldCards.player.style.display = "none";
    state.fieldCards.computer.style.display = "none";


    iniit();

}

async function playAudio(status){
    const audio = new Audio('./src/asset/audios/${status}.wav');
    
    try{
    audio.play();
    } catch {}
}

function iniit() {

ShowHiddenCardsFieldsImages(False)

drawCards(5, playerSides.player1);
drawCards(5,  playerSides.computer);

const bgm = document.getElementById("bgm");
bgm.play();

}
iniit();
