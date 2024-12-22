CREATE DATABASE IF NOT EXISTS pokemon_db;

USE pokemon_db;

CREATE TABLE IF NOT EXISTS pokemons (
    dexnum INT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    generation INT,
    type1 VARCHAR(50),
    type2 VARCHAR(50),
    ability1 VARCHAR(100),
    ability2 VARCHAR(100),
    ability3 VARCHAR(100),
    hp INT,
    atk INT,
    def_ INT,
    sp_atk INT,
    sp_def INT,
    spe INT,
    total INT,
);
