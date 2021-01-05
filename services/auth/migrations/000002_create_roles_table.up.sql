CREATE TABLE IF NOT EXISTS roles(
   id serial PRIMARY KEY,
   name VARCHAR (50) NOT NULL,
   status VARCHAR (50),
   description VARCHAR (100)
);