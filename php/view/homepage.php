<?php
    if (!isset($_SESSION))
        session_start();

    if (isset($_SESSION['player']))
        $isAuthenticated = true;
    else $isAuthenticated = false;
?>
<div class="main">

    <div class="docs_div" id="docs_div">
        <a href="./docs.html">
            <button class="docs_btn" id="docs_btn">
                    <img src="./images/icons/question-solid.svg" alt="">
            </button>
        </a>
    </div>

    <section class="section">
        <figure class="image_container image_container_first">
            <img src="./images/background1.jpg" alt="">
        </figure>
        <h1 class="title">
            La Battaglia della Meloria
        </h1>
        <div class="scroll_down" id="scroll_down"> 
            <a href="#story_section">
                <img src="./images/icons/scrolldown.svg" alt="scroll-down">
            </a>
        </div>
    </section>
    <section class="section" id="story_section">
        <figure class="image_container">
            <img src="./images/background2.png" alt="">
        </figure>
        <article class="content">
            <h3>ESTATE 1284</h3>
            <p>Nel braccio di mare alle Secche della Meloria, le due repubbliche marinare di Pisa e Genova si contendono l’egemonia sul Mediterraneo. La sera del 6 agosto 1284 il mar Tirreno era rosso di sangue e ingombro di cadaveri che galleggiavano tra remi spezzati, vele strappate, scialuppe rovesciate. La potenza della Repubblica Marinara di Pisa era tramontata, schiacciata da Genova. Le due città erano in lotta perchè i loro interessi commerciali si sovrapponevano sia nel Tirreno (entrambe aspiravano al controllo di Sardegna e Corsica) sia nel resto del Mediterraneo.</p>
            <h3>IL MOMENTO DELLA VERITÀ</h3>
            <p>La flotta genovese schierò in prima linea solo 63 galee: le altre vennero tenute in retroguardia e “mascherate” facendo abbattere gli alberi che sostenevano le grandi vele, in modo da essere scambiate per navi disarmate. I pisani videro avanzare questa flotta verso di loro e, sicuri di essere più numerosi, decisero di accettare la sfida e farla finita una volta per tutte. I reperti dicono che la flotta genovese fu avvistata all’altezza delle secche della Meloria, ad appena 6 km dalla costa. I pisani risalirono l’Arno e presero il mare rapidamente, schierandosi in una linea di fronte molto lunga (almeno 2,5 km). Solo quando si avvicinarono, s’accorsero delle galee genovesi e capirono di essere in trappola.</p>
            <h3>BATTAGLIA SIA!</h3>
            <div class="scroll_down" id="scroll_down"> 
                <a href="#login" style="text-decoration: none; color: inherit;" >
                    <img src="./images/icons/scrolldown.svg" alt="scroll-down">
                </a>
            </div>
        </article>
    </section>
    <?php
        require("./php/view/auth.php");
    ?>

    <script src="./js/homepage.js"></script>
</div>




