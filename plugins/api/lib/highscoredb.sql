use highscoredb;

explain games;
explain highscores;

CREATE TABLE IF NOT EXISTS games(
	gameId INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    gameName TEXT,
    gameDescription TEXT,
    gameOwner TEXT
);

INSERT INTO games(gameName, gameDescription, gameOwner) VALUES('Tetris With Friends', 'Play Tetris with your friends!', 'Nintendo (TM)');
SELECT * FROM games;
ALTER TABLE games AUTO_INCREMENT = 1;
DELETE FROM games WHERE gameId > 0;

DROP TABLE IF EXISTS games;

CREATE TABLE IF NOT EXISTS highscores(
	entryId INT NOT NULL AUTO_INCREMENT,
    gameId INT NOT NULL,
    userId INT NOT NULL,
    score	INT NOT NULL,
    primary key(entryId, gameId),
    foreign key(gameId) references games(gameId)
    on delete cascade
);

DROP TABLE IF EXISTS highscores;