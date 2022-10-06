
document.addEventListener("DOMContentLoaded", function(event) { 
    populateGames();
    populateRanking();
    setTeam(true);

    buildGrid("gamereview_player");
    buildGrid("gamereview_enemy");
});

// Popola la dashboard con le partite precedentemente giocate, reperite tramite richiesta asincrona verso il backend
let populateGames = () => {
    fetch('./php/api_game.php?' + new URLSearchParams({
        action: "games"
    }),{method: 'GET'})
    .then(res => res.json())
    .then(data => {
        document.getElementById("game_container").innerHTML = "";

        if (data.length){
            
            data.forEach(game => {
                document.getElementsByClassName("nogames")[0].classList.add("hidden");

                let left = "<span>Partita del " + game.played_at + "</span>";
                let right = "<span class=\"" + ((game.win) ? "win" : "defeat") + "\" style=\"margin-right: 1vw\">" + ((game.win) ? "VITTORIA" : "SCONFITTA") + "</span><button class=\"view_btn\" id=\"viewbtn_game_" + game._id + "\" onclick=\"toggleGameReview(" + game._id + ")\"><ion-icon name=\"eye-outline\"></ion-icon></button>";

                let gameItem = "<div class=\"game_item\" id=\"game_"+ game._id +"\">" + left + right + "</div>";

                document.getElementById("game_container").innerHTML += gameItem;
            });
        } else {
            document.getElementsByClassName("nogames")[0].classList.remove("hidden");
        }
    });
}

// Popola la dashboard con il ranking generale, reperito tramite richiesta asincrona verso il backend
let populateRanking = () => {

    // let action = "action=ranking";

    fetch('./php/api_game.php?' + new URLSearchParams({
        action: "ranking"
    }),{method: 'GET'})
    .then(res => res.json())
    .then(data => {

        if (data.length){
            let table = document.getElementById("ranking_table");
            let tbody = table.getElementsByTagName("tbody")[0];
            tbody.innerHTML = "";

            let i = 1;
            let tr, td, team = "team_";
            data.forEach(player => {
                tr = tbody.insertRow();
                td = tr.insertCell();
                td.innerText = i++ + "°";
                td = tr.insertCell();
                td.innerText = player.idplayer;
                td = tr.insertCell();
                td.innerHTML = "<img class=\"logo_ranking\" src=\"./images/" + team + player.team + ".png\" ></img>";
                td = tr.insertCell();
                td.innerText = (player.totalwin) ? player.totalwin : 0;
                td = tr.insertCell()
                td.innerText = player.total;
                td = tr.insertCell()
                td.innerText = Math.floor((player.totalwin*100)/player.total) + "%";
            });
        }

    });
}

// Gestisce la disconessione dell'utente loggato, effettuando un redirect con conseguente ricarica della pagina principale
let logout = () => {

    let formData = new FormData();
    formData.append('action', 'logout');

    fetch('./php/api_auth.php', {method: 'POST', body: formData})
	.then(res => res.json())
	.then(data => {
        if (!data.error) { 
            location.href = "./";         
        }
    }
	);
} 

// Mostra/Nasconde a video il pannello di revisione di una partita precedentemente giocata
let toggleGameReview = (id = null) => {

    if (id){
        (document.getElementsByClassName("overlay")[0]).classList.remove("hidden");
        
        fetch('./php/api_game.php?' + new URLSearchParams({
            action: "game",
            id: id
        }),{method: 'GET'})
        .then(res => res.json())
        .then(data => {
    
            let grids = [];
            let cells;
            let classesArr;
            grids.push(document.getElementsByClassName("gamereview_player")[0]);
            grids.push(document.getElementsByClassName("gamereview_enemy")[0]);
            
            for (let i = 0; i < grids.length; i++) {
                cells = (grids[i]).getElementsByClassName("cell");
                cellsToCopy = data[i];
    
                for (let j = 0; j < cellsToCopy.length; j++) {

                    cells[j].classList.remove("game_ship");
                    cells[j].classList.remove("hit");
                    cells[j].classList.remove("sunk");
                    cells[j].classList.remove("miss");

                    classesArr = (cellsToCopy[j]).split(" ");
                    classesArr.pop();

                    classesArr.forEach(classname => {
                        cells[j].classList.add(classname);
                    });
                }
            }
        }
        );
    } else {
        (document.getElementsByClassName("overlay")[0]).classList.add("hidden");
    }
}