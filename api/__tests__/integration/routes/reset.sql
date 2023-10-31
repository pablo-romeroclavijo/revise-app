DROP TABLE IF EXISTS "users" CASCADE;
DROP TABLE IF EXISTS "events" CASCADE;
DROP TABLE IF EXISTS "share_links" CASCADE;
DROP TABLE IF EXISTS "token" CASCADE;

CREATE TABLE "users"(
    "user_id" INTEGER GENERATED ALWAYS AS IDENTITY,
    "email" VARCHAR(50) NOT NULL,
    "username" VARCHAR(25) UNIQUE NOT NULL,
    "school_level" VARCHAR(25),
    "password" CHAR(60),

    PRIMARY KEY (user_id)
  
);

CREATE TABLE "share_links"(
    "link_id" INTEGER GENERATED ALWAYS AS IDENTITY,
    "url" VARCHAR(150),
    "user_id" INTEGER,

    PRIMARY KEY (link_id),
    FOREIGN KEY (user_id) REFERENCES users("user_id")
);

CREATE TABLE "events"(
    "event_id" INTEGER GENERATED ALWAYS AS IDENTITY,
    "user_id" INTEGER,
    "start_date" TIMESTAMP NOT NULL,
    "end_date" TIMESTAMP NOT NULL,
    "title" VARCHAR(60) NOT NULL,
    "description" VARCHAR(350) NULL,
    "location" VARCHAR(50) NULL,
    "subject" VARCHAR(20) NOT NULL,
    "priority" CHAR(1) NULL,

    PRIMARY KEY (event_id), 
    FOREIGN KEY (user_id) REFERENCES users("user_id")

);

CREATE TABLE token (
    token_id INT GENERATED ALWAYS AS IDENTITY,
    user_id INT NOT NULL,
    token CHAR(36) UNIQUE,
    PRIMARY KEY (token_id),
    FOREIGN KEY (user_id) REFERENCES users("user_id")
);




-- Populate the "users" table
INSERT INTO users 
    (email, username, school_level)
VALUES 
    ('user1@example.com', 'user1', 'High School'),
    ('user2@example.com', 'user2', 'High School');



-- Populate the "events" table
INSERT INTO events 
    (user_id, start_date, end_date, title, description, location, subject, priority)
VALUES 
    (1, '2023-11-06 10:30:00', '2023-11-06 11:00:00', 'Meeting', 'Discuss project progress', 'Meeting Room 1', 'Poject', 'H'),
    (2, '2023-11-07 12:00:00', '2023-11-07 12:30:00', 'Lecture', 'Introduction to History', 'Room 101', 'History', 'M');

INSERT INTO share_links
    (user_id, url)
VALUES
    (1, 'sdfsfafsfasdf'),
    (2, 'sdfsfafsfasdf');

INSERT INTO token
    (user_id, token)
VALUES
    (1, 'sdfsfafsfasdf'),
    (2, 'sdfsfafsfassdf');