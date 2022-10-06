<?php
    if (!isset($_SESSION))
        session_start();

    if (isset($_SESSION['player']))
        $isAuthenticated = true;
    else $isAuthenticated = false;
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Battaglia Della Meloria</title>

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

    <link rel="stylesheet" type="text/css" href="./css/style.css">
    <?php if ($isAuthenticated) : ?>
        <link rel="stylesheet" href="./css/dashboard.css">
        <link rel="stylesheet" href="./css/game.css">
    <?php else : ?>
        <link rel="stylesheet" href="./css/homepage.css">
    <?php endif; ?>
</head>

<body>
    <?php
        if ($isAuthenticated)
            require("./php/view/dashboard.php");
        else {
            require("./php/view/homepage.php");
        }
    ?>

    <audio autoplay muted loop id="soundtrack">
        <source src="./audio/soundtrack.mp3" type="audio/mpeg">
    </audio>
    <div class="toggleAudio_div" id="toggleAudio_div">
        <button class="toggleAudio_btn" id="toggleAudio_btn" onclick="toggleAudio()">
            <img src="./images/icons/volume-high-solid.svg" alt="">
        </button>
    </div>

    <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
    <script nomodule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script>
    <script src="./js/audio.js"></script>
</body>

</html>