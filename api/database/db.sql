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
    "url" VARCHAR(150) NOT NULL,
    "user_id" INTEGER
);

CREATE TABLE "events"(
    "event_id" INTEGER GENERATED ALWAYS AS IDENTITY,
    "user_id" INTEGER,
    "start_date" DATE NOT NULL,
    "end_date" DATE NOT NULL,
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