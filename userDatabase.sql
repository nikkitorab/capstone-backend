CREATE DATABASE user_database;

--\c into user db 
CREATE TABLE user_data(
    user_id SERIAL PRIMARY KEY,
    diagnosis VARCHAR,
    CONSTRAINT fk_symptoms_list
        FOREIGN KEY (symptoms_list_id)
            REFERENCES symptoms_list(symptoms_list_id),
    CONSTRAINT fk_striggers_list
        FOREIGN KEY (triggers_list_id)
            REFERENCES triggers_list(triggers_list_id)
);

CREATE TABLE symptoms_list(
    symptoms_list_id SERIAL PRIMARY KEY
);

CREATE TABLE triggers_list(
    triggers_list_id SERIAL PRIMARY KEY
);


-- new stuff ?
-- -- CREATE TABLE dates ( 
--    -- id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
--    -- -- date TIMESTAMP
-- );
CREATE TABLE dates ( -- like genres
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    date TIMESTAMP
);

 -- like books
CREATE TABLE symptoms (
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(100),
    rating_type VARCHAR(4) -- int or bool
);

CREATE TABLE triggers ( -- like books
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(100),
    rating_type VARCHAR(4) -- int or bool
);

CREATE TABLE symptom_entries (
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    rating INT, -- change this to depend on symptom type later (like y/n for food)
    entry_time TIMESTAMP,
    symptom_id INT,
    FOREIGN KEY (symptom_id) REFERENCES symptoms(id)
);
-- CREATE TABLE symptom_entries ( -- like book genres JOIN TABLE
--     symptom_id INT,
--     FOREIGN KEY (symptom_id) REFERENCES symptoms(id),
--     date_id INT,
--     FOREIGN KEY (date_id) REFERENCES dates(id),
--     PRIMARY KEY(symptom_id, date_id)
--     rating INT, -- change this to depend on symptom type later (like y/n for food)
-- );


    -- id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    -- rating INT, -- change this to depend on symptom type later (like y/n for food)
    -- FOREIGN KEY (date_id) REFERENCES dates(id)
    -- FOREIGN KEY (symptom_id) REFERENCES symptoms(id)

-- CREATE TABLE trigger_entries ( -- like book genres JOIN TABLE
--     trigger_id INT,
--     FOREIGN KEY (trigger_id) REFERENCES triggers(id),
--     date_id INT,
--     FOREIGN KEY (date_id) REFERENCES dates(id),
--     PRIMARY KEY(trigger_id, date_id)
--     occured BOOLEAN, -- change this to depend on trigger type later (like hrs of sleep #)
-- );
CREATE TABLE trigger_entries (
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    occurred BOOLEAN, -- change this to depend on trigger type later (like hrs of sleep #)
    entry_time TIMESTAMP,
    trigger_id INT,
    FOREIGN KEY (trigger_id) REFERENCES triggers(id)
);

-- CREATE TABLE symptom_entries (
--     id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
--     rating INT, -- change this to depend on symptom type later (like y/n for food)
--     entry_time TIMESTAMP,
--     symptom_id INT,
--     FOREIGN KEY (symptom_id) REFERENCES symptoms(id)
-- );


CREATE TABLE users (
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    email VARCHAR(320),
    password VARCHAR(36) 
);