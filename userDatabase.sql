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