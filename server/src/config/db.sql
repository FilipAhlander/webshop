CREATE TABLE product (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50)
);

CREATE TABLE category (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50)
);

CREATE TABLE product_category (
  product_id INT,
  category_id INT,
  PRIMARY KEY (product_id, category_id),
  CONSTRAINT fk_product FOREIGN KEY(product_id) REFERENCES product(id),
  CONSTRAINT fk_category FOREIGN KEY(category_id) REFERENCES category(id)
);

INSERT INTO product(name) VALUES ('Playstation') -- id 1
INSERT INTO category(name) VALUES ('Konsoler') -- id 1
INSERT INTO product_category (product_id, category_id) VALUES (1, 1)

-- kategorier: id 2 Datorer id 1 konsoler id 7 kampanjer


select product_id, category_id, c.name, p.name from category c
join product_category pc on c.id = pc.category_id
join product p on p.id = pc.product_id
where p.id = 1

select * from product p
join product_category pc on p.id = pc.product_id
join category c on c.id = pc.category_id
where p.id = 1