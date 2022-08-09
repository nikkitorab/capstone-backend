CREATE DATABASE user_database;


CREATE TABLE symptoms (
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(100),
    rating_type VARCHAR(4),
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE triggers (
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(100),
    rating_type VARCHAR(4),
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id)
);


CREATE TABLE symptom_entries (
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    rating INT, -- change this to depend on symptom type later (like y/n for food)
    entry_time TIMESTAMP,
    symptom_id INT,
    FOREIGN KEY (symptom_id) REFERENCES symptoms(id)
);

CREATE TABLE trigger_entries (
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    occurred BOOLEAN, -- change this to depend on trigger type later (like hrs of sleep #)
    entry_time TIMESTAMP,
    trigger_id INT,
    FOREIGN KEY (trigger_id) REFERENCES triggers(id)
);



CREATE TABLE related_entries (
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    email VARCHAR(320),
    password VARCHAR(36) 
);


-- *************** DB JOINS: ***************
AUTHORS = USERS
BOOKS = SYMPTOMS/TRIGGERS

SELECT symptoms.title, authors.first_name, authors.last_name
FROM books
INNER JOIN authors
    ON books.author_id = authors.id;

AUTHORS = symptoms/triggers
BOOKS = symptom_entries/trigger_entries





-- *************** POPULATING THE TABLES: ***************

-- USERS: 
INSERT INTO users(email,password) Values('test1@email.com','password12345');
INSERT INTO users(email,password) Values('test2@email.com','12345password');

-- SYMPTOMS: 
INSERT INTO symptoms(name,rating_type,user_id) Values('nikki','num',1);
INSERT INTO symptoms(name,rating_type,user_id) Values('cough','num',1);
INSERT INTO symptoms(name,rating_type,user_id) Values('sneeze','num',1);
INSERT INTO symptoms(name,rating_type,user_id) Values('headache','num',1);
INSERT INTO symptoms(name,rating_type,user_id) Values('pain','num',1);

INSERT INTO symptoms(name,rating_type,user_id) Values('sadness','num',2);
INSERT INTO symptoms(name,rating_type,user_id) Values('rash','num',2);
INSERT INTO symptoms(name,rating_type,user_id) Values('nausea','num',2);
INSERT INTO symptoms(name,rating_type,user_id) Values('sweating','num',2);

-- TRIGGERS: 
INSERT INTO triggers(name,rating_type,user_id) Values('sleep','num',1);
INSERT INTO triggers(name,rating_type,user_id) Values('heat','num',1);
INSERT INTO triggers(name,rating_type,user_id) Values('coffee','bool',1);
INSERT INTO triggers(name,rating_type,user_id) Values('fish','bool',1);

INSERT INTO triggers(name,rating_type,user_id) Values('stress','num',2);
INSERT INTO triggers(name,rating_type,user_id) Values('period','bool',2);
INSERT INTO triggers(name,rating_type,user_id) Values('dehydration','num',2);
INSERT INTO triggers(name,rating_type,user_id) Values('gluten','bool',2);
INSERT INTO triggers(name,rating_type,user_id) Values('pollen','bool',2);












CREATE TABLE triggers (
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(100),
    rating_type VARCHAR(4),
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id)
);