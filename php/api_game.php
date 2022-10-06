<?php
session_start();

require_once __DIR__ . "/lib/bootstrap.php";
require_once __DIR__ . "/lib/game.php";

// user must be logged before
if (!isset($_SESSION['player']))
    http_response_code(403);

switch ($method) {
    case "POST":
        storeGame($_SESSION['player']);
        break;
    case "GET":
        switch ($_GET['action']) {
            case "game":
                getGame($_GET["id"], $_SESSION['player']);
                break;
            case "games":
                getGames($_SESSION['player']);
                break;
            case "ranking":
                getRanking();
                break;
            case "team":
                getTeam($_SESSION['player']);
                break;
            case "config":
                getEnemyConfiguration();
                break;
            default:
                http_response_code(400);
                break;
            }
        break;
    default:
        http_response_code(400);
        break;
}