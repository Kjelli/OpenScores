use highscoredb;

explain games;
explain highscores;

CREATE TABLE IF NOT EXISTS games(
	gameId INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    gameName TEXT,
    gameDescription TEXT,
    gameOwner TEXT,
    created TIMESTAMP default NOW()
);

INSERT INTO games(gameName, gameDescription, gameOwner) VALUES('Tett Ris', 'Play Tett Ris with your friends!', 'Tenelevendo (TM)');
INSERT INTO games(gameName, gameDescription, gameOwner) VALUES('Rangy Dribs', 'Throw dribs at the enemy gips!', 'NoUBisoft');
INSERT INTO games(gameName, gameDescription, gameOwner) VALUES('Skippy Though!', 'This is a complicated game with a description that probably does break the CSS positioning', 'Bad stuff');
INSERT INTO games(gameName, gameDescription, gameOwner) VALUES('Say what?', 'What a great game this is.. Like really <b>LOL</b>', 'Lol though');
INSERT INTO games(gameName, gameDescription, gameOwner, created) VALUES('Old game', 'This is the oldest game', 'LooneyTunes', '2015-02-26 14:30:00');
SELECT * FROM games;
ALTER TABLE games AUTO_INCREMENT = 1;
DELETE FROM games WHERE gameId > 0;

DROP TABLE IF EXISTS games;

# TODO

CREATE TABLE IF NOT EXISTS boards(
    boardId INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	gameId INT NOT NULL,
    boardName VARCHAR(64) NOT NULL,
    boardDescription TEXT,
    created TIMESTAMP default NOW(),
    
    foreign key(gameId) references games(gameId)
    on delete cascade
);

INSERT INTO boards(gameId, boardName, boardDescription) VALUES(1, 'Ladder','Official Ladder for the game');

SELECT * FROM boards;
ALTER TABLE boards AUTO_INCREMENT = 1;
DELETE FROM boards WHERE boardId > 0;

DROP TABLE boards;

# TODO
CREATE TABLE IF NOT EXISTS entries(
	entryId INT NOT NULL AUTO_INCREMENT,
    boardId INT NOT NULL,
    userId INT NOT NULL,
    score	INT NOT NULL,
    primary key(entryId, gameId),
    foreign key(boardId) references boards(boardId)
    on delete cascade
);







DROP TABLE IF EXISTS highscores;