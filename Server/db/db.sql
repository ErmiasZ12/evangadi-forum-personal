

-- 1️ USERS TABLE
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);


-- 2️ QUESTIONS TABLE
CREATE TABLE questions (
    question_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    tags VARCHAR(255),   -- example: "nodejs,mysql,backend"
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
        ON DELETE CASCADE
);


-- 3️ ANSWERS TABLE
CREATE TABLE answers (
    answer_id INT AUTO_INCREMENT PRIMARY KEY,
    question_id INT NOT NULL,
    user_id INT NOT NULL,
    answer TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (question_id) REFERENCES questions(question_id)
        ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
        ON DELETE CASCADE
);


-- -- 4️ TAGS TABLE
-- CREATE TABLE tags (
--     tag_id INT AUTO_INCREMENT PRIMARY KEY,
--     tag_name VARCHAR(50) NOT NULL UNIQUE
-- );

-- -- 5️ QUESTION_TAGS TABLE (junction table)
-- CREATE TABLE question_tags (
--     question_id INT NOT NULL,
--     tag_id INT NOT NULL,
--     PRIMARY KEY (question_id, tag_id),
--     FOREIGN KEY (question_id) REFERENCES questions(question_id)
--         ON DELETE CASCADE,
--     FOREIGN KEY (tag_id) REFERENCES tags(tag_id)
--         ON DELETE CASCADE
-- );
