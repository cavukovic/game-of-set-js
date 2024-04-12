

class Player{ 
    constructor(name){
        this.name = name; 
        this.score = 0; 
    }

    append_score(){
        this.score = this.score + 1
    }

    get_name(){
        return this.name; 
    }

}


function create_players(){
    
    // get the number of players 
    let numPlayers = get_num_players();

    // get the player names 
    let playerNames = get_player_names(numPlayers); 

    // create an array of player objects 
    let players = [];
    for (let i = 0; i < numPlayers; i++){
        let player = new Player(playerNames[i]);
        players.push(player)
    }

    // display the score table 
    display_table(numPlayers, players);

    return players;
    
}

// displays score table with initial scores as 0 
function display_table(numPlayers, players){

    const table = document.getElementById("score-table")

    const head_row = document.createElement("tr"); 
    const data_row = document.createElement("tr"); 

    table.appendChild(head_row);
    table.appendChild(data_row);

    // Add table contents for each player
    for (let i = 0; i < numPlayers; i++) {
        let head = document.createElement("th")
        head.appendChild(document.createTextNode(players[i].get_name()))
        head.setAttribute('class','score-table-head');
        let player = document.createElement("td");
        player.id = `scorepl${i+1}`;
        player.setAttribute('class','score-table-element');
        player.innerText = 0;
        head_row.appendChild(head);
        data_row.appendChild(player);
    }

    document.body.appendChild(table);

}

// gets the number of players from the user 
function get_num_players(){
    let playerNum = -1; 
    // could do more players but this usually limits overlap between screen elements
    while(playerNum < 1 || playerNum > 4 ){
    
        let num = prompt("Please enter the number of players (1 - 4)", "0");

        playerNum = Number.parseInt(num);
    
        if(playerNum < 1 || playerNum > 4){
           alert("Not a correct value for number of players")
        }
    }
    return playerNum; 

}

// gets player names 
function get_player_names(numPlayers){

    let playerNames = []

    for (let i = 0; i < numPlayers; i++){
        let name = prompt(`Enter player ${i+1} name`, `Player ${i+1}`);
        playerNames.push(name)
    }

    return playerNames; 
}

// Updates score when player finds a set
function player_found_set(players) {
    let name = prompt("Who found the set?");
    let player_exists = false;
    while(!player_exists) {
        for (let i = 0; i < players.length; i++) {
            if (players[i].get_name().toLowerCase() == name.toLowerCase()){
                players[i].append_score();
                document.getElementById(`scorepl${i+1}`).innerHTML = players[i].score;
                player_exists = true;
                return;
            }
        }
        name = prompt("Please enter the name of the player who found the set");
    }
}