<?php

require_once __DIR__ . "/../utils/response.php";
require_once __DIR__ . "/../utils/usernameHelper.php";
require_once __DIR__ . "/../models/Database.php";
$conn = ((new Database())->getPDO());

function login($username, $password)
{    
    global $conn;

    if (!isset($username) || !isset($password)){
        error("Credenziali non inserite correttamente");
    }
    
    $stmt = $conn->prepare("    SELECT  p.password as password
                                FROM    player p
                                WHERE   p._username = :username");
    $stmt->bindParam(":username", $username);
    $stmt->execute();
    $res = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if (password_verify($password, $res[0]['password'])) {
        $_SESSION["player"] = $username;
        success();
    }
    
    error("Le credenziali fornite non corrispondono ai dati presenti nel database");
}

function register($username, $password, $team){

    global $conn;

    if (!isset($username) || !isset($password) || !isset($team)){
        error("Dati non inseriti correttamente.");
    }

    $team = intval($team);
    // player can choose just between 2 teams [Pisani, Genovesi]
    if (!in_array($team, [1, 2])){
        error("La Battaglia della Meloria si combatté unicamente tra Pisani e Genovesi!");
    }
 
    validateUsername($username, true);
    validatePassword($password);
    
    $passwordHash = password_hash($password, PASSWORD_BCRYPT);

    $stmt = $conn->prepare("    INSERT INTO `player` (`_username`, `password`, `team`)
                                VALUES (:username, :password, :team)");
    $stmt->bindParam(":username", $username);
    $stmt->bindParam(":password", $passwordHash);
    $stmt->bindParam(":team", $team);
    $stmt->execute();
    success();
}

function logout(){
    session_unset();
    session_destroy();
    success();
}

function validateUsername($username, $internal = false)
{
    // if the function is not called internally, check parameters
    if (!$internal && !isset($_POST['username']))
        error();

    // only alphanumeric characters and _
    $pattern = '/^[a-z\d_]{4,20}$/i';

    if (!assertUsernameAvailability($username))
        error("L'username è già registrato nel database.");

    if (!preg_match($pattern, $username))
        error("Inserire 4-20 caratteri (A-Z, a-z, 0-9, _)");

    // if the function is called internally, do not terminate the script, otherwise return
    if (!$internal)
        success();
}

function validatePassword($password){
    
    // at least one number -> (?=.*\d)
    // at least one letter -> (?=.*[A-Za-z])
    // each digit has to be a number, a letter or one of the following: !@#$% -> [0-9A-Za-z!@#$%]
    // there have to be 8-12 characters -> {8,12}
    $pattern = '/^(?=.*\d)(?=.*[A-Za-z])[0-9A-Za-z!@#$%]{8,12}$/';
    
    if (!preg_match($pattern, $password))
        error("Inserire 8-12 caratteri (A-Z, a-z, 0-9, !@#$%). Almeno una lettera, almeno un numero.");
}


