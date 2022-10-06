<?php

require_once __DIR__ . "/../utils/response.php";
require_once __DIR__ . "/../models/Database.php";
$conn = ((new Database())->getPDO());

function storeGame($player)
{    
    global $conn;
    
    $datainput = json_decode(file_get_contents('php://input'));

    $win = $datainput->win;
    $data = $datainput->data;

    if (!isset($win) || !isset($data) || !isset($player)){
        error("Dati della partita incompleti.");
    }
    
    if (!in_array($win, [0,1]))
        error("Il campo win è un valore booleano");
    
    // if ($data.count() != 2 || $data[0].count() != 100 || $data[1].count() != 100)
    //     error("Comunicare i dati della partita con il formato richiesto.");
    
    $data = json_encode($data);
    $stmt = $conn->prepare("    INSERT INTO game (win, snapshot, idplayer)
                                VALUES (:win, :data, :player)");
    $stmt->bindParam(":win", $win);
    $stmt->bindParam(":data", $data);
    $stmt->bindParam(":player", $player);
    
    try {
        $stmt->execute();
    } catch (PDOException $th) {
        echo $th->getMessage();
    }

    success("Nuova partita inserita con successo.");
}

function getGame($id, $player) {
    global $conn;

    if (!isset($id))
        error("Specificare l'id della partita da visualizzare.");
    
    $stmt = $conn->prepare("    SELECT snapshot 
                                FROM game 
                                WHERE _id = :id AND idplayer = :player");
    $stmt->bindParam(":id", $id);
    $stmt->bindParam(":player", $player);
    $stmt->execute();
    $res = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $snapshot = $res[0]['snapshot'];

    if (!$snapshot)
        error("Non è presente alcuna partita con l'id specificato");
    
    echo $snapshot;
}

function getGames($player) {
    global $conn;

    $stmt = $conn->prepare("    SELECT _id, win, played_at 
                                FROM game 
                                WHERE idplayer = :player
                                ORDER BY played_at DESC");
    $stmt->bindParam(":player", $player);
    $stmt->execute();
    $res = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($res);
}

function getRanking() {
    global $conn;

    $stmt = $conn->prepare("    WITH
                                totalwins AS (  SELECT g.idplayer, COUNT(*) AS totalwin
                                                FROM game g
                                                WHERE g.win = 1
                                                GROUP BY g.idplayer)
                                SELECT g1.idplayer, p.team, COUNT(*) AS total, tw.totalwin
                                FROM game g1
                                LEFT JOIN totalwins tw ON tw.idplayer = g1.idplayer
                                INNER JOIN player p ON p._username = g1.idplayer
                                GROUP BY idplayer
                                ORDER BY tw.totalwin DESC, (tw.totalwin / COUNT(*)) DESC");
    $stmt->execute();
    $res = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($res);
}

function getTeam($player){
    global $conn;

    $stmt = $conn->prepare("    SELECT team 
                                FROM player 
                                WHERE _username = :player");
    $stmt->bindParam(":player", $player);                  
    $stmt->execute();
    $res = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($res);
}

function getEnemyConfiguration(){
    global $conn;

    $stmt = $conn->prepare("    SELECT body
                                FROM board_configuration
                                ORDER BY RAND()
                                LIMIT 1");

    $stmt->execute();
    $res = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo $res[0]['body'];
}