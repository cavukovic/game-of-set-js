class Game{
	constructor(){
    }
 
    start(){
        // make the deck
        let myCards = makeCards();

        // shuffle the deck
        myCards.sort(() => Math.random() - 0.5);

        // display player scoreboard 
        let players = create_players(); 
        
        //creating initial 12 cards in deal.
        let currDeck = [myCards.pop(), myCards.pop(), myCards.pop(), myCards.pop(), myCards.pop(), myCards.pop(), myCards.pop(), myCards.pop(), myCards.pop(), myCards.pop(), myCards.pop(), myCards.pop()];

        // display the cards & running game loop
        let play = true;
        let count = 0;

        while (play){
            currDeck = display_cards(currDeck, myCards, players);
            play = document.getElementById('end-button').onclick = function() { the_end(players) };
            count ++;
            if (count = 100) play = false; //adding temp end game state? iddk if this is doing anything
            //add condition to set game to end and run end of game sequence?? (play = false)
        }
    }
}

// Alert for when game ends
// Doesn't end the game at the moment
function the_end(players){
    winner = [];
    best_score = 0;
    for (let i = 0; i < players.length; i++){
        if (players[i].score > best_score){
            winner = [players[i]];
            best_score = [players[i].score];
        } else if (players[i].score == best_score) {
            winner.push(players[i]);
        }
    }
    if (winner.length == 1){
        if (
          confirm(`${winner[0].name} wins with ${winner[0].score} sets found!`)
        ) {
          window.location.reload();
        }
    } else { // If people tie
        alert_str = winner[0].name;
        for (let i = 1; i < winner.length; i++){
            alert_str += ` and ${winner[i].name}`;
        }

        if(confirm(alert_str + ` tie with ${best_score} sets found!`)){
            window.location.reload();
        }
    }
}