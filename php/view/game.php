
<section class="gridsetter_section hidden">
    <div class="container_setships">
        <div class="gridsetter_grid_div">
            <table class="grid gridsetter_grid" id="grid"></table>
        </div>
        <div>
            <div class="ships_container"></div>
            <div class="btn_container">
                <button class="btn_setship b_s_rotateship" onclick="rotateSelectedShip()">Ruota</button>
                <button class="btn_setship b_s_play" onclick="startGame()">Gioca</button>
            </div>
        </div>
    </div>
    <div class="gotodashboard_div">
        <button class="gotodashboard_btn" onclick="resetGameSection(1)">
            <img src="./images/icons/house-solid.svg" alt="">
        </button>
    </div>
    <div class="gridsetterinfo_div">
        <button class="gridsetterinfo_btn pulse" onclick="toggleGridSetterInfo()">
            <img src="./images/icons/info-solid.svg" alt="">
        </button>
    </div>
    <div class="overlay hidden">
        <div class="gridsetter_modal">
            <img src="./images/icons/closebtn.svg" class="gridsetter_close_btn" onclick="toggleGridSetterInfo()">
            <h4>Posizionamento</h4>
            <p>Posiziona le tue barche (sulla destra) cliccando sopra la barca che desideri posizionare. Una volta selezionata, sposta il cursore sulla griglia da gioco e posiziona la barca cliccando sulla cella desiderata. Se desideri cambiare nave da posizionare, ti basterà selezionarne un'altra!</p>
            <img src="./images/posizionamento.png" alt="">
            <h4>Rotazione</h4>
            <p>Prima di posizionare una barca, nota che è possibile ruotare l'orientamento della tua nave attraverso il bottone apposito!</p>
            <img src="./images/rotazione.png" alt="">
            <h4>Spostamento</h4>
            <p>Cosa faccio se voglio spostare una barca già posizionata? Non ti preoccupare, potrai cliccare sulla barca da spostare e procedere nuovamente con la fase di posizionamento!</p>
            <img src="./images/spostamento.png" alt="">
        </div>
    </div>
</section>
<section class="game_section hidden">
    <div class="container_game">
        <div class="game_section_div">
            <div>
                <div style="margin-bottom: 3vh;">
                    <img src="" id="game_logo_player" class="game_logo"></img>
                    <p class="game_team_player"></p>
                </div>
                <div class="player_board">
                    <table class="grid player"></table>
                </div>
            </div>
            <div>
                <div style="margin-bottom: 3vh;">
                    <img src="" id="game_logo_enemy" class="game_logo"></img>
                    <p class="game_team_enemy"></p>
                </div>
                <div class="enemy_board">
                    <table class="grid enemy"></table>
                </div>
            </div>
            <div>
                <div style="margin-bottom: 13em;"></div>
                <div class="remaining_ships"></div>
            </div>
        </div>
    </div>
    <div class="gotodashboard_div">
        <button class="gotodashboard_btn"onclick="resetGameSection(1)">
            <img src="./images/icons/house-solid.svg" alt=""> 
        </button>
    </div>
</section>
<div class="overlay hidden">
    <div class="endgame_modal">
        <h3 class="endgame_message"></h3>
        <div class="endgame_btngroup">
            <button class="endgame_newgame" onclick="resetGameSection(0)">Rigioca</button>
            <button class="endgame_dashboard" onclick="resetGameSection(1)">Dashboard</button>
        </div>
    </div>
</div>


<script src="./js/game/Ship.js"></script>
<script src="./js/game/Cell.js"></script>
<script src="./js/game/Player.js"></script>
<script src="./js/bot.js"></script>
<script src="./js/game.js"></script>