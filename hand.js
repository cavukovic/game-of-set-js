// Cards currently selected
const hand = [];

// Add card to hand
function add_to_hand(cardID, fullDeck, currDeck, players, images) {
    if (hand.length < 3 && !hand.includes(cardID)) { // Add card if less than 3 cards in hand
        hand.push(cardID);
    }
    if (hand.length == 3) { // If 3 cards check if set
        const is_it = is_set(hand, currDeck);
        if (is_it) {
            alert("Set found!");
            // Remove cards in set
            currDeck = remove_cards(currDeck, hand[0], hand[1], hand[2]);
            // Replace cards if there will be less than 12 cards in play
            if (currDeck.length <= 9) {
                currDeck = replace_cards(currDeck, fullDeck);
            }
            player_found_set(players);
        } else {
            alert("Not a set.");
        }
        hand.splice(0,hand.length); // Clear hand
    }
    return currDeck;
}

function is_set(hand, currDeck) { // Check if set
    let card1 = new Card();
    let card2 = new Card();
    let card3 = new Card();
    for(let i = 0; i< currDeck.length; i++){
        let check = currDeck[i].cardId;
        if(check == hand[0]){
           card1.color = currDeck[i].color;    
           card1.number = currDeck[i].number;  
           card1.shape = currDeck[i].shape; 
           card1.shade = currDeck[i].shade;   
        }
        if(check == hand[1]){
            card2.color = currDeck[i].color;    
            card2.number = currDeck[i].number;  
            card2.shape = currDeck[i].shape; 
            card2.shade = currDeck[i].shade;      
        }
        if(check == hand[2]){
            card3.color = currDeck[i].color;    
            card3.number = currDeck[i].number;  
            card3.shape = currDeck[i].shape; 
            card3.shade = currDeck[i].shade;    
        }
    }
    return(test_features(card1, card2, card3));
    
}

function test_features(c1, c2, c3){
    let colorCheck = ((c1.color ==c2.color) && (c3.color == c1.color) || ((c1.color !=c2.color) && (c3.color != c1.color) && c2.color != c3.color));
    let numberCheck = ((c1.number ==c2.number) && (c3.number == c1.number) || ((c1.number !=c2.number) && (c3.number != c1.number) && c2.number != c3.number));
    let shapeCheck = ((c1.shape ==c2.shape) && (c3.shape == c1.shape) || ((c1.shape !=c2.shape) && (c3.shape != c1.shape) && c2.shape != c3.shape));
    let shadeCheck = ((c1.shade ==c2.shade) && (c3.shade == c1.shade) || ((c1.shade !=c2.shade) && (c3.shade != c1.shade) && c2.shade != c3.shade));
    return (colorCheck && numberCheck && shapeCheck && shadeCheck);
}
    