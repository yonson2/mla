--------------------------------------------------------------------------------
-- Up
--------------------------------------------------------------------------------

CREATE TABLE Leagues (
  id INTEGER PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  created_at INTEGER NOT NULL,
  password TEXT NOT NULL,
  email TEXT
);

CREATE TABLE Users (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  dci INTEGER NOT NULL,
  league INTEGER NOT NULL,
  password TEXT NOT NULL,
  CONSTRAINT fk_league FOREIGN KEY(league) REFERENCES Leagues(id)
);

CREATE INDEX User_ix_DCI ON Users(dci);

CREATE TABLE Matches (
  id INTEGER PRIMARY KEY,
  user INTEGER NOT NULL,
  against INTEGER NOT NULL,
  win INTEGER,
  TIE INTEGER NOT NULL,
  CONSTRAINT fk_user FOREIGN KEY(user) REFERENCES Users(id),
  CONSTRAINT fk_against FOREIGN KEY(against) REFERENCES Users(id),
  CONSTRAINT win_ck_isInRange CHECK (win IN (0, 1)),
  CONSTRAINT tie_ck_isInRange CHECK (tie IN (0, 1))
);

--------------------------------------------------------------------------------
-- Down
--------------------------------------------------------------------------------

DROP INDEX User_ix_DCI;
DROP TABLE Leagues;
DROP TABLE Users;
DROP TABLE Matches;
