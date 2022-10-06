<?php

require_once __DIR__ . "/../models/Database.php";

// Checks if an username already exists in the db
function assertUsernameAvailability($username)
{
    $pdo = (new Database())->getPDO();

    try {
        $stmt = $pdo->prepare("     SELECT  p._username
                                    FROM    player p
                                    WHERE   p._username = :username");
        $stmt->bindParam(":username", $username);
        $stmt->execute();
        $res = $stmt->fetchAll(PDO::FETCH_ASSOC);

        if (isset($res[0]["_username"]))
            return false;
        return true;
    } catch (PDOException $e) {
        return false;
    }

}


