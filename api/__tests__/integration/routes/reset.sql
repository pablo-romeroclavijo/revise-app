TRUNCATE users RESTART IDENTITY CASCADE;
TRUNCATE events RESTART IDENTITY CASCADE;
TRUNCATE share_links RESTART IDENTITY CASCADE;
TRUNCATE token RESTART IDENTITY CASCADE;

INSERT INTO users 
    (email, username, school_level)
VALUES 
    ('user1@example.com', 'user1', 'High School'),
    ('user2@example.com', 'user2', 'High School');

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