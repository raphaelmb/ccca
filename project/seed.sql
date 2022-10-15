CREATE DATABASE app;

CREATE TABLE item (
	id_item SERIAL PRIMARY KEY,
	category VARCHAR(200),
	description VARCHAR(200),
	price DECIMAL,
	width REAL,
	height REAL,
	length REAL,
	weight REAL
);

INSERT INTO item (category, description, price, width, height, length, weight) VALUES('Musical instruments', 'Guitar', 1000, 100, 30, 10, 3);
INSERT INTO item (category, description, price, width, height, length, weight) VALUES('Musical instruments', 'Amplifier', 5000, 100, 50, 50, 20);
INSERT INTO item (category, description, price, width, height, length, weight) VALUES('Acessory', 'Cable', 30, 10, 10, 10, 1);
