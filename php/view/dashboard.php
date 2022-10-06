<?php
    if (!isset($_SESSION))
        session_start();

    $player = $_SESSION['player'];
?>

<div class="logout" id="logout">
    <button class="logout_btn" id="logout_btn" onclick="logout()">
        <img src="./images/icons/arrow-right-from-bracket-solid.svg" alt="">
        <!-- <ion-icon name="log-out-outline" size="large"></ion-icon>     -->
    </button>
</div>
<header id="header">
    <div>
        <h2>Benvenuto ⎡ <span class="username"><?php echo $player; ?></span> ⎦</h2>
    </div>
</header>
<section class="section play" id="play_section">
    <button id="play_btn">Gioca Ora</button>
</section>
<section class="section game_list" id="gamelist_section">
    <h1>Partite giocate</h1>
    <div id="game_container"></div>
    <div class="nogames hidden" style="margin: 2vh 3vh;">Non hai ancora giocato nessuna partita...!</div>
    <div class="overlay hidden">
        <div class="gamereview_modal">
            <img src="./images/icons/closebtn.svg" class="gamereview_close_btn" onclick="toggleGameReview()">
            <div class="gamereview_player_div">
                <table class="grid gamereview_player"></table>
            </div>
            <div class="gamereview_enemy_div">
                <table class="grid gamereview_enemy"></table>
            </div>
        </div>
    </div>
</section>
<section class="section ranking_list" id="ranking_section">
    <h1>Classifica Generale</h1>
    <table id="ranking_table">
        <thead>
            <th>°</th>
            <th>Giocatore</th>
            <th>Città</th>
            <th>Vittorie</th>
            <th>Partite</th>
            <th>Win Ratio</th>
        </thead>
        <tbody>
        </tbody>
    </table>

</section>

<script src="./js/lib/utils.js"></script>
<script src="./js/dashboard.js"></script>
<?php
    require("./php/view/game.php");
?>