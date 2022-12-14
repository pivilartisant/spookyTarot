/*======================
Creating my DOM elements
========================*/

  const btn = document.getElementById('spread');


const cardName = document.getElementById('cardName');


const cardArcana = document.getElementById('cardArcana');


const cardFortune = document.getElementById('cardFortune');


const cardKeywords = document.getElementById('cardKeywords');


const cardMeaning = document.getElementById('cardMeaning');


const cardImg = document.getElementById('cardImg')


/*===========================
Declaring my global variables
============================*/

let data;
let request;
let response;
//cards will hold my json data

//My request URL
const requestCardURL = 'data/cardInfo.json';

getCards(requestCardURL);

//getCards assigns my data to a global variable
  async function getCards(url){
  request = new Request(url)
  response = await fetch(request)
  data = await response.json()

  btn.addEventListener('click', () => {
    assignCards(randomCard());
    // btn.remove()
  });  
}

/*========================
Defining my Card object
==========================*/

//Creating objects 
async function assignCards(num){

    class Deck {
      constructor(data){
        this.card = data.cards[num];
      }
    }
    
  
    class Card  {
      constructor(name, arcana, fortune, keywords, meaning, img ){

        this.name = name;

        this.arcana = arcana;

        this.fortune = `${fortune[randomInArray(fortune)]}`;

        this.keywordsArr = [];
        this.keywords = `${keywords[formatData(keywords, this.keywordsArr)]}`;

        this.position = `${cardMeaningRotation(meaning)}`

        this.meaningArr = this.position.split(",")
        this.meaning = this.meaningArr[randomInArray(this.meaningArr)];

        this.img =  `./data/cardImg/${img}`;
      }
      clearData(elem1, elem2, elem3, elem4, elem5){
        cardImg.src ="";
        elem1.textContent = "";
        elem2.textContent = "";
        elem3.textContent = "";
        elem4.textContent = "";
        elem5.textContent = "";
      }
      renderData(elem, str, cardData){
        elem.textContent = str + cardData
        }
      renderImg (imgSrc){
        cardImg.src = imgSrc
        // audio.play()
      }
    }

/*========================
Creating my card object
==========================*/

    //this returns all my cards 
    const deck = new Deck (data)

    const card = new Card(deck.card.name, deck.card.arcana, deck.card.fortune_telling, deck.card.keywords, deck.card.meanings, deck.card.img )
    

/*==========================
Rendering my card
============================*/
    card.clearData(cardName,cardArcana,cardFortune,cardKeywords,cardMeaning)
    
    card.renderImg(card.img)
    card.renderData(cardName, "Name : ",card.name)
    card.renderData(cardArcana,  "Arcana : ",card.arcana)
    card.renderData(cardFortune,  "Fortune : ",card.fortune)
    card.renderData(cardKeywords, "Keywords : ",card.keywordsArr)
    card.renderData(cardMeaning, "Meaning : ",card.meaning)
}

/*==========================
Functions used in my program
============================*/
  
//generating random number between 0 and 78
  function randomCard() {
    return Math.floor(Math.random() * (78-0)+0);
  }

//Getting random information in my array based on the array index 
  function randomInArray(myArr){
    return ( Math.floor(Math.random() * myArr.length));
  }


 //This function formats my array data so it is capitalized and seperated with a space
function formatData(myArr, destination){
  for (let info of myArr){ 
    //for every element in my array, push this element to the keywordsArr s well and seperating with a space and capitalizing the first letter of each element 
    destination.push(" " + info.charAt(0).toUpperCase() + info.slice(1));
  }
}

//function that help me get either an upright or reversed card
function cardMeaningRotation(data){
  let math = Math.round(Math.random())
  if(!math){
    cardImg.setAttribute('class','upright__card')
    return `${data.light}`;
  } else { 

    cardImg.setAttribute('class','reversed__card')
    return`${data.shadow}`;
  }
}

  


 




