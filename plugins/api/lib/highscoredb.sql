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
INSERT INTO games(gameName, gameDescription, gameOwner) VALUES('Rangy Dribs', 'Throw dribs at the enemy gips!', 'NoUBisoft');
INSERT INTO games(gameName, gameDescription, gameOwner) VALUES('Skippy Though!', 'This is a complicated game with a description that probably does break the CSS positioning', 'Bad stuff');
INSERT INTO games(gameName, gameDescription, gameOwner) VALUES('Say what?', 'What a great game this is.. Like really <b>LOL</b>', 'Lol though');
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