class Card{
	constructor(number,color,shape,shade,cardId){
    	this.number = number;
        this.color = color;
        this.shape = shape;
        this.shade = shade;
        this.cardId = cardId;
    }
  	
}

function makeCards(){
        let numbers = [1, 2, 3]
        let colors = ["red", "green", "blue"]
        let shapes = ["oval", "rombus", "squiggle"]
        let shadings = ["empty", "solid", "stripped"]
        let cards = []
        let count = 0 //card ID

        //creating the deck
        numbers.forEach((num)=> {
            colors.forEach((col) => {
                shapes.forEach((shape) => {
                    shadings.forEach((shade)=> {
                        let card = new Card(num,col,shape,shade,count);
                        cards.push(card);
                        count = count+1;
                    });
                });
            });
        });

        return cards
}

//add cards to the current deal
function replace_cards(currDeck, fullDeck){
    if (fullDeck.length > 0){ //make sure there are cards left to deal
        currDeck.push(fullDeck.pop());
        currDeck.push(fullDeck.pop());
        currDeck.push(fullDeck.pop());
    }
    return currDeck;
}

function remove_cards(currDeck, c1, c2, c3){
    let cIdx = []
    console.log(currDeck)
    cIdx.push(currDeck.findIndex(card => card.cardId == c1))
    cIdx.push(currDeck.findIndex(card => card.cardId == c2))
    cIdx.push(currDeck.findIndex(card => card.cardId == c3))

    cIdx.sort(function(a,b){return b-a});

    cIdx.forEach(i => {
        currDeck.splice(i, 1);
    })

    return currDeck;
}

function add_extra_cards(images, fullDeck, cards, players){
    // adding 3 cards to display
    if(fullDeck.length > 0){
        let len = images.length;
        for(let j = 0; j< 3; j++){
            let img = document.createElement("img");
            images.push(img);
        } 
        // adding three cards to the deal
        cards.push(fullDeck.pop());
        cards.push(fullDeck.pop());
        cards.push(fullDeck.pop());

        card_clicks(cards,images,fullDeck,players);
    }
}

function display_cards(cards,fullDeck, players){  
    let images = [];
    let box = document.getElementById("box");
    //displaying initial cards
    for(let j = 0; j< cards.length; j++){
        let img = document.createElement("img");
        images.push(img);
    } 
    card_clicks(cards,images,fullDeck,players);
}

function card_clicks(cards, images, fullDeck, players,){
    //setting initial set to display
    for(let i = 0; i < cards.length; i++){
        tempCard = cards[i];
        images[i].src = `cards/card${tempCard.cardId}.png`;
        images[i].setAttribute('class','img-element');
        images[i].setAttribute('cardId',tempCard.cardId);
        images[i].setAttribute('id',`img#${tempCard.cardId}`); // Every image has an id of 'img#' + the cardId

        images[i].onclick = function() {
            cards = add_to_hand(images[i].getAttribute('cardId'), fullDeck,cards, players, images);
            images.splice(cards.length, images.length);
            for (const child of box.children) {
                box.removeChild(child)
            }
            // Remove cards from display
            while (box.firstChild) {
                box.removeChild(box.firstChild);
            }
            // Add cards to the display
            for(let k = 0; k < cards.length; k++){
                tempCard = cards[k];
                images[k].src = `cards/card${tempCard.cardId}.png`;
                images[k].setAttribute('class','img-element');
                images[k].setAttribute('cardId',tempCard.cardId);
                images[k].setAttribute('id',`img#${tempCard.cardId}`)
                box.appendChild(images[k])
            }
        }
        // Updates the draw button function
        document.getElementById('draw-button').onclick = function() { add_extra_cards(images,fullDeck,cards, players); }
        box.appendChild(images[i]);
    }
}