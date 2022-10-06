<?php
session_start();

require_once __DIR__ . "/lib/bootstrap.php";
require_once __DIR__ . "/lib/auth.php";

switch ($method) {
    case "POST":
        switch ($_POST["action"]) {
            case "login":
                login($_POST['username'], $_POST['password']);
                break;
            case "register":
                register($_POST['username'], $_POST['password'], $_POST['team']);
                break;
            case "logout":
                logout();
                break;
            case "validateusername":
                validateUsername($_POST['username']);
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