DROP TABLE IF EXISTS "users" CASCADE;
DROP TABLE IF EXISTS "events" CASCADE;
DROP TABLE IF EXISTS "share_links" CASCADE;


CREATE TABLE "users"(
    "user_id" INTEGER GENERATED ALWAYS AS IDENTITY,
    "email" VARCHAR(50) NOT NULL,
    "username" VARCHAR(25) NOT NULL,
    "school_level" VARCHAR(25) NOT NULL
);
ALTER TABLE
    "users" ADD PRIMARY KEY("user_id");

CREATE TABLE "share_links"(
    "link_id" INTEGER GENERATED ALWAYS AS IDENTITY,
    "url" VARCHAR(150),
    "user_id" INTEGER
);

CREATE TABLE "events"(
    "event_id" INTEGER GENERATED ALWAYS AS IDENTITY,
    "user_id" INTEGER,
    "start_date" TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    "end_date" TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    "title" VARCHAR(60) NOT NULL,
    "description" VARCHAR(350) NULL,
    "location" VARCHAR(50) NULL,
    "subject" VARCHAR(20) NOT NULL,
    "priority" CHAR(1) NULL
);


ALTER TABLE
    "events" ADD PRIMARY KEY("event_id");
ALTER TABLE
    "share_links" ADD PRIMARY KEY("link_id");
ALTER TABLE
    "share_links" ADD CONSTRAINT "share_links_user_id_foreign" FOREIGN KEY("user_id") REFERENCES "users"("user_id");
ALTER TABLE
    "events" ADD CONSTRAINT "events_user_id_foreign" FOREIGN KEY("user_id") REFERENCES "users"("user_id");



-- Populate the "users" table
INSERT INTO users 
    (email, username, school_level)
VALUES 
    ('user1@example.com', 'user1', 'High School'),
    ('user2@example.com', 'user2', 'College'),
    ('user3@example.com', 'user3', 'Elementary School');


-- -- Populate the "events" table
-- INSERT INTO events 
--     (user_id, start_date, end_date, title, description, location, subject, priority)
-- VALUES 
--     (1, '2023-11-06 10:30:00', '2023-11-06 11-00-00', 'Meeting', 'Discuss project progress', 'Meeting Room 1', 'Poject', 'H'),
--     (1, '2023-11-07 12:00:00', '2023-11-07 12:30:00', 'Lecture', 'Introduction to History', 'Room 101', 'History', 'M'),
--     (1, '2023-11-08 13:30:00', '2023-11-08 14:00:00', 'Workshop', 'Hands-on coding workshop', 'Lab 3', 'Computer Science', 'L'),
--     (2, '2023-11-07 12:00:00' ,'2023-11-07 12:30:00', 'Meeting', 'Discuss project progress', 'Meeting Room 1', 'Poject', 'H'),
--     (2, '2023-11-08 13:00:00', '2023-11-08 13:00:00', 'Lecture', 'Introduction to History', 'Room 101', 'History', 'M'),
--     (2, '2023-11-09 14:00:00', '2023-11-09 14:00:00', 'Workshop', 'Hands-on coding workshop', 'Lab 3', 'Computer Science', 'L');                                                                                                                                                                                                                                               