CREATE TABLE IF NOT EXISTS permissions(
   id serial PRIMARY KEY,
   name VARCHAR (50) NOT NULL,
   displayname VARCHAR (50),
   status VARCHAR (50),
   description VARCHAR (100)
);