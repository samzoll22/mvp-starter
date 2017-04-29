DROP DATABASE IF EXISTS my_words;

CREATE DATABASE my_words;

USE my_words;

CREATE TABLE words (
  id int NOT NULL AUTO_INCREMENT,
  word varchar(255) NOT NULL,
  category varchar(255) NOT NULL,
  definition text NOT NULL,
  example text NOT NULL,
  PRIMARY KEY (ID)
);

CREATE TABLE users (
  id int NOT NULL AUTO_INCREMENT,
  username varchar(255) NOT NULL UNIQUE,
  PRIMARY KEY (ID)
);

CREATE TABLE users_words (
  user_id int NOT NULL,
  word_id int NOT NULL
);


insert into words (word, category, definition, example) values ('cup', 'noun', 'A container for storing liquids', 'A cup of tea.');
insert into words (word, category, definition, example) values ('think', 'verb', 'The practice of using one\'s mind towards something', 'I think about eating cake.');
insert into words (word, category, definition, example) values ('quick', 'adjective', 'An indication of high speed when describing an action or object', 'The quick brown fox jumps over the lazy dog.');
insert into words (word, category, definition, example) values ('kebab', 'noun', 'A food of meat or vegetables cooked on skewers.', 'John wants to eat a kebab today for lunch.');


insert into users (username) values ('Albert');
insert into users (username) values ('Bertie');
insert into users (username) values ('Colton');

insert into users_words (user_id, word_id) values (1, 1);
insert into users_words (user_id, word_id) values (2, 4);
insert into users_words (user_id, word_id) values (1, 2);
insert into users_words (user_id, word_id) values (1, 3);
insert into users_words (user_id, word_id) values (3, 3);

/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/
