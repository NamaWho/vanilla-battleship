DROP DATABASE IF EXISTS pweb_battleship;
CREATE DATABASE pweb_battleship;
USE pweb_battleship;

DROP TABLE IF EXISTS player;
CREATE TABLE player (
    _username       VARCHAR(20)     NOT NULL,
    password        VARCHAR(256)    NOT NULL, -- BCRYPT ENCODING FORMAT        
    team            TINYINT         NOT NULL,
    CONSTRAINT player_pk
        PRIMARY KEY (_username)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS player_stats;
CREATE TABLE player_stats (
    _idplayer     VARCHAR(20)             NOT NULL,
    totalgame   INT         DEFAULT 0   NOT NULL,   
    wongame     INT         DEFAULT 0   NOT NULL,
    CONSTRAINT player_stats_pk
        PRIMARY KEY (_idplayer),
    CONSTRAINT player_stats_player__username_fk
        FOREIGN KEY (_idplayer) REFERENCES pweb_battleship.player (_username)
            ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS game;
CREATE TABLE game (
    _id         INT AUTO_INCREMENT                              NOT NULL,
    win         TINYINT                                         NOT NULL,
    snapshot    TEXT                                            NOT NULL,
    played_at   DATETIME            DEFAULT CURRENT_TIMESTAMP   NOT NULL,
    idplayer    VARCHAR(20)                                     NOT NULL,
    CONSTRAINT game_pk
        PRIMARY KEY (_id),
    CONSTRAINT game_player__username_fk
        FOREIGN KEY (idplayer) REFERENCES pweb_battleship.player (_username)
            ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;