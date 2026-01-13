-- 1. USERS TABLE
CREATE TABLE users (
  user_id int(11) NOT NULL AUTO_INCREMENT,
  username varchar(50) NOT NULL UNIQUE,
  first_name varchar(50) NOT NULL,
  last_name varchar(50) NOT NULL,
  email varchar(100) NOT NULL UNIQUE,
  password varchar(255) NOT NULL,
  created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 2. QUESTIONS TABLE
CREATE TABLE questions (
  question_id int(11) NOT NULL AUTO_INCREMENT,
  user_id int(11) NOT NULL,
  title varchar(255) NOT NULL,
  description text NOT NULL,
  tags varchar(255) DEFAULT NULL,
  created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (question_id),
  FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 3. ANSWERS TABLE
CREATE TABLE answers (
  answer_id int(11) NOT NULL AUTO_INCREMENT,
  question_id int(11) NOT NULL,
  user_id int(11) NOT NULL,
  answer text NOT NULL,
  created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (answer_id),
  FOREIGN KEY (question_id) REFERENCES questions (question_id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ==========================================
-- DATA INSERTION (ALL RECORDS FROM YOUR LOG)
-- ==========================================

-- INSERTING ALL USERS
INSERT INTO users (user_id, username, first_name, last_name, email, password) VALUES
(1, 'gashaw01', 'Gashaw', 'Getaneh', 'gashaw@gmail.com', '$2b$10$rSC1hfZgYXuKCs4IMsiHIuhXjZTDPHeCcmNB4KAR5g17Gs8K8Zzrm'),
(2, 'selom01', 'selomei', 'lamesgin', 'selom@example.com', '$2b$10$/rp9T/FS/LeCbC5h39H7lOze1AzXkeK1f4yOJfLDzXUzbA90IAddC'),
(3, 'john', 'John', 'Doe', 'john@gmail.com', '$2b$10$GxuIGRVVWKEPeJj7YAjZjuuFmcWZsimC8HYRiQ2Lg67g6imLROewi'),
(4, 'hani01', 'hanna', 'shiferaw', 'hanna@example.com', '$2b$10$2FNzJj9JkGmSc5WaWSiVb.9AbjS4KN6F9gR7Wpo6P1Z2ezWerIckG'),
(5, 'fen01', 'fenet', 'ahmed', 'fenet@example.com', '$2b$10$qTgbveRpYBeh59aRpdGJzOXXFQr58UOA9fnwee1hhjmeVoIQixeRO'),
(6, 'ermi01', 'ermiyas', 'wordofa', 'ermi@example.com', '$2b$10$5ZPgd.2Q8dOyUs/L2lNCd.ulT00hFDOkPC/67gmzwCfOK0pLmu5Vu');

-- INSERTING ALL QUESTIONS
INSERT INTO questions (question_id, user_id, title, description, tags) VALUES
(1, 5, 'What is JWT?', 'Can someone explain JWT clearly?', 'authentication,nodejs'),
(2, 5, 'What is Reactjs?', 'Can someone explain JWT clearly?', 'authentication,nodejs'),
(3, 5, 'What is Reactjs?', 'Can someone explain JWT clearly?', 'authentication,nodejs'),
(4, 5, 'What is Bootstrap?', 'Can someone explain JWT clearly?', 'authentication,nodejs'),
(5, 6, 'What is Nodejs ?', 'Can someone explain node clearly?', 'authentication,nodejs');

-- INSERTING ALL ANSWERS
INSERT INTO answers (answer_id, question_id, user_id, answer) VALUES
(1, 1, 5, 'JWT is a signed token...'),
(2, 1, 5, 'JWT is a signed token...'),
(3, 5, 5, 'node js is javascript framework to ru..');