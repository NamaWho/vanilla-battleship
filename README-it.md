# La battaglia della Meloria
## Introduzione

Rivisitazione in chiave storica della classica Battaglia Navale. Le regole sono state stabilite prendendo ispirazione da questo [sito web](https://www.giochi-da-tavolo.it/battaglia-navale/). <br>

Il seguente gioco è stato presentato come Progetto pratico del corso di ***Progettazione Web*** del CdL in Ingegneria Informatica [L-8], A.A. 2021/2022, presso l'Università di Pisa, tenuto dal Prof. Alessio Vecchio, valutato in sede d'esame con voto **30/30**.

Il progetto, date le tempistiche strette e lo sviluppo dello stesso solamente a scopi didattici, potrebbe presentare ridondanze, parti non commentate o poco chiare. Sarebbe necessario un refactoring ( *le pull request sono ben accette :)* ).

---

## Funzionalità
- Login e Registrazione sulla Piattaforma
- Gioco Single-Player contro un bot
- Dashboard utente, Statistiche e Snapshot dei match giocati.

---

## Setup
Per questo progetto ho utilizzato XAMPP per impostare tutto in maniera veloce ed efficiente.

1. Modifica il file ***php/key/sql-credentials.json*** con le credenziali per la connessione al MySQL server.
2. Apri una connessione con il db server (se stai utilizzando XAMPP ti basterà aprire phpmyadmin sul browser digitando ***localhost/phpmyadmin***) ed esegui il dump del database che puoi trovare [qua](https://github.com/NamaWho/vanilla-battleship/blob/main/sql/pweb_battleship_latest.sql).
3. Se stai utilizzando XAMPP, sposta la cartella del progetto in ***C:/XAMPP/htdocs***. (Dipende da dove è stato installato XAMPP, questo è il path di installazione di default).
4. Digita _localhost_ sul broser e clicca sul nome della cartella del progetto.
5. Goditi il gioco! :)